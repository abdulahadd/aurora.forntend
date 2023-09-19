import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "../atoms/types/events/eventTypes";
import { useUserSelector } from "../../redux/redux-hooks/hooks";
import EventModal from "../molecules/modals/eventModal";
import { Add } from "@mui/icons-material";
import RightSidebar from "./RightSidebar";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { EVENT_API_PATHS } from "../atoms/paths/ApiPaths";
import { getRequest } from "../atoms/api/Apis";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const initialState: Event = {
  id:"",
  start: moment().toDate(),
  end: moment().toDate(),
  title: "Some title",
  resource: { id: "", users: [] },
};

export enum DialogAction {
  CREATE_EVENT = "Create Event",
  EDIT_EVENT = "Edit Event",
}

function Calender() {
  const location = useLocation();
  let data = false;
  if (location) {
    data = location.state;
  }
  const userr = useUserSelector((state) => state);
  const [eventState, setEventState] = useState({
    events: [initialState],
  });
  const [showModal, setShowModal] = useState(data);
  const [purpose, setPurpose] = useState(DialogAction.CREATE_EVENT);
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [eventsUpdated, setEventsUpdated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [eventId, seteventId] = useState("");

  const getOrgEvents = async () => {
    let tempEvents: Event[] = [];

    try {
      const response = await getRequest(
        userr.role !== "SuperUser"
          ? `${EVENT_API_PATHS.GET_EVENTS_FOR_ORG}${userr.orgId}`
          : `${EVENT_API_PATHS.GET_EVENTS}`,
      );
      tempEvents = response?.data.map((event) => ({
        id: event._id,
        title: event.title,
        start: event.start ? new Date(event.start) : null,
        end: event.end ? new Date(event.end) : null,
        resource: { id: event._id, users: event.users },
      }));

      setEventState({ events: tempEvents });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrgEvents();
  }, [eventsUpdated]);

  const onEventResize = (data) => {
    const { start, end } = data;
  };

  const patchRequest = async (data: any, id: string) => {
    try {
      const response = await patchRequest(
        `${EVENT_API_PATHS.EDIT_EVENT}${id}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    const duration = event.end.getTime() - event.start.getTime();
    const newEnd = new Date(start.getTime() + duration);
    const newEvent = {
      start: new Date(start),
      end: new Date(newEnd),
    };

    patchRequest(newEvent, event.id);
    const { events } = eventState;
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const updatedEvents = eventState.events.map((ev) =>
      ev === event
        ? {
            ...ev,
            start,
            end: newEnd,
            allDay: !event.allDay && droppedOnAllDaySlot,
          }
        : ev
    );

    setEventState({
      events: updatedEvents,
    });
  };

  const EditEvent = (data) => {
    setPurpose(DialogAction.EDIT_EVENT);
    setShowModal(true);
    setSelectedEvent(data);
  };

  const CreateEvent = () => {
    setPurpose(DialogAction.CREATE_EVENT);
    setShowModal(true);
  };

  const toggleSidebar = (data) => {
    setSelectedEvent(data);
    setSidebarOpen(!sidebarOpen);
    if (!sidebarOpen) {
      seteventId(data.resource.id);
    }
  };

  const sidebarAnimationClasses = sidebarOpen
    ? "translate-x-0 transition-transform ease-in-out duration-300"
    : "translate-x-full transition-transform ease-in-out duration-300";

  return (
    <div>
      <div className=" m-5">
        <div className=" flex justify-between items-center">
          <Box>
            <div className=" items-start text-xl text-purple-900 mb-1">
              Calendar
            </div>
          </Box>
        </div>
      </div>
      {userr.role === "Admin" || userr.role === "SuperUser" ? (
        <div className=" flex justify-start">
          <button
            className="bg-purple-900 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ml-1 mb-4"
            type="button"
            onClick={CreateEvent}
          >
            <Add />
            Add Event
          </button>
        </div>
      ) : null}

      {purpose === DialogAction.CREATE_EVENT ? (
        <EventModal
          title="None"
          purpose={purpose}
          showModal={showModal}
          setShowModal={setShowModal}
          setEventsUpdated={setEventsUpdated}
          resource={null}
        ></EventModal>
      ) : (
        <EventModal
          title={selectedEvent ? selectedEvent.title : ""}
          purpose={purpose}
          showModal={showModal}
          setShowModal={setShowModal}
          setEventsUpdated={setEventsUpdated}
          resource={selectedEvent ? selectedEvent.resource : null}
        ></EventModal>
      )}

      <div className="flex">
        <div className=" w-full">
          <DnDCalendar
            defaultDate={moment().toDate()}
            defaultView="month"
            events={eventState.events}
            localizer={localizer}
            onEventDrop={
              userr.role === "Admin" || userr.role === "SuperUser"
                ? moveEvent
                : undefined
            }
            onEventResize={
              userr.role === "Admin" || userr.role === "SuperUser"
                ? onEventResize
                : undefined
            }
            onDoubleClickEvent={
              userr.role === "Admin" || userr.role === "SuperUser"
                ? EditEvent
                : undefined
            }
            onSelectEvent={toggleSidebar}
            resizable
            style={{ height: 700 }}
          />
        </div>

        <div
          className={`flex bg-indigo-100 transition-all duration-1000 ${
            sidebarOpen ? "max-w-[100%]" : "max-w-[0]"
          }`}
        >
          {sidebarOpen && (
            <div
              className={
                "h-[700px] bg-grey" +
                classNames("slide-sidebar", sidebarAnimationClasses)
              }
            >
              <RightSidebar
                currentEvent={eventId}
                setShowModal={setShowModal}
                setPurpose={setPurpose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Calender;

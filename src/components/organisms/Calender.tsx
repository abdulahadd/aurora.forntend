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

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const initialState: Event = {
  start: moment().toDate(),
  end: moment().toDate(),
  title: "Some title",
};

export enum DialogAction {
  CREATE_EVENT = "Create Event",
  EDIT_EVENT = "Edit Event",
}

function Calender() {
  const userr = useUserSelector((state) => state);
  const [eventState, setEventState] = useState({
    events: [initialState],
  });
  const [showModal, setShowModal] = useState(false);
  const [purpose, setPurpose] = useState(DialogAction.CREATE_EVENT);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [eventsUpdated, setEventsUpdated] = useState(false);
  

  const fetchApi = async () => {
    let tempEvents: Event[] = [];

    try {
      const response = await axios.get<Event[]>(
        `http://localhost:5000/events`,
        {
          headers: {
            Authorization: `Bearer ${userr.token}`,
          },
        }
      );
      tempEvents = response?.data.map((event) => ({
        title: event.title,
        start: event.start ? new Date(event.start) : null,
        end: event.end ? new Date(event.end) : null,
      }));

      setEventState({ events: tempEvents });
    } catch (error) {
      console.log(error);
    }

    
  };

  useEffect(() => {
    fetchApi();
  }, [eventsUpdated]);

  const onEventResize = (data) => {
    const { start, end } = data;
  };

  const patchRequest = async (data: any, title: string) => {
    console.log("title", title);
    try {
      const response = await axios.patch(
        `http://localhost:5000/events/${title}`,
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
      start: start,
      end: newEnd,
    };

    patchRequest(newEvent, event.title);
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
    const { title } = data;
    setPurpose(DialogAction.EDIT_EVENT);
    setShowModal(true);
    setSelectedTitle(title);
  };

  const CreateEvent = () => {
    setPurpose(DialogAction.CREATE_EVENT);
    setShowModal(true);
  };

  return (
    <div>
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
      {purpose === DialogAction.CREATE_EVENT ? (
        <EventModal
          title="None"
          purpose={purpose}
          showModal={showModal}
          setShowModal={setShowModal}
          setEventsUpdated={setEventsUpdated}
        ></EventModal>
      ) : (
        <EventModal
          title={selectedTitle}
          purpose={purpose}
          showModal={showModal}
          setShowModal={setShowModal}
          setEventsUpdated={setEventsUpdated}
        ></EventModal>
      )}

      {eventState.events.length > 0 ? (
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={eventState.events}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={onEventResize}
          onDoubleClickEvent={EditEvent}
          resizable
          style={{ height: 600 }}
        />
      ) : null}
    </div>
  );
}

export default Calender;

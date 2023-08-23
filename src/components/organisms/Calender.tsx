import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "../atoms/types/events/eventTypes";
import { useUserSelector } from "../../redux/redux-hooks/hooks";
import EventModal from "../molecules/modals/eventModal";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);
const initialState: Event = {
  start: moment().toDate(),
  end: moment().toDate(),
  title: "Some title",
};

function Calender() {
  const userr = useUserSelector((state) => state);
  const [eventState, setEventState] = useState({
    events: [initialState],
  });

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
  }, []);

  const onEventResize = (data) => {
    const { start, end } = data;
  };

  const patchRequest = async (data: any, title: string) => {
    console.log("title", title)
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
    const newEvent={
      start: start,
      end: newEnd,
    }

    patchRequest(newEvent, event.title);


    const { events } = eventState;

    const idx = events.indexOf(event);
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
            end:newEnd,
            allDay: !event.allDay && droppedOnAllDaySlot,
          }
        : ev
    );


    setEventState({
      events: updatedEvents,
    });

  };

  return (
    <div>
      <EventModal />

      {eventState.events.length > 0 ? (
        <DnDCalendar
          defaultDate={moment().toDate()}
          defaultView="month"
          events={eventState.events}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={onEventResize}
          resizable
          style={{ height: 600 }}
        />
      ) : null}
    </div>
  );
}

export default Calender;

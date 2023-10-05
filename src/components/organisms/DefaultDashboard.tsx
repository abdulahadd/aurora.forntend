import React, { useEffect, useState } from "react";
import { useUserSelector } from "../../redux/redux-hooks/hooks";
import { Add } from "@mui/icons-material";
import Calender from "./Calender";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import axios from "axios";
import { Event } from "../atoms/types/events/eventTypes";
import moment from "moment";
import { EVENT_API_PATHS } from "../atoms/paths/ApiPaths";
import { getRequest } from "../atoms/api/Apis";

const initialState: Event = {
  id: "",
  start: moment().toDate(),
  end: moment().toDate(),
  title: "No Events",
  resource: { id: "", users: [] },
};

const tomorrow = new Date(moment().toDate());
tomorrow.setDate(tomorrow.getDate() + 1);

const initialStateTomorrow: Event = {
  id: "",
  start: tomorrow,
  end: moment().toDate(),
  title: "No Events",
  resource: { id: "", users: [] },
};

function DefaultDashboard() {
  const userr = useUserSelector((state) => state);
  const navigate = useNavigate();
  const [todaysEventState, setTodaysEventState] = useState({
    events: [initialState],
  });

  const [tomorrowsEventState, setTomorrowsEventState] = useState({
    events: [initialStateTomorrow],
  });

  const datesAreEqual = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const isDate = (value: any): value is Date => value instanceof Date;

  const getEvents = async () => {
    let tempEvents: Event[] = [];

    try {
      const response = await getRequest(
        userr.role !== "SuperUser"
          ? `${EVENT_API_PATHS.GET_EVENTS_FOR_ORG}${userr.orgId}`
          : `${EVENT_API_PATHS.GET_EVENTS}`
      );
      tempEvents = response?.data.map((event) => ({
        id: event._id,
        title: event.title,
        start: event.start ? new Date(event.start) : null,
        end: event.end ? new Date(event.end) : null,
        resource: { id: event._id, users: event.users },
      }));

      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const todayEvents = tempEvents.filter((event) => {
        if (isDate(event.start)) {
          return datesAreEqual(event?.start, today);
        }
      });

      const tomorrowEvents = tempEvents.filter((event) => {
        if (isDate(event.start)) {
          return datesAreEqual(event?.start, tomorrow);
        }
      });

      if (todayEvents.length) setTodaysEventState({ events: todayEvents });
      if (tomorrowEvents.length)
        setTomorrowsEventState({ events: tomorrowEvents });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <div className=" m-5">
        <div className=" flex justify-between items-center">
          <Box>
            <div className=" items-start text-xl text-purple-900 mb-1">
              Dashboard
            </div>
          </Box>
        </div>
      </div>

      {userr.role === "Admin" || userr.role === "SuperUser" ? (
        <div className=" flex justify-start">
          <button
            className="bg-purple-900 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ml-2 mb-4"
            type="button"
            onClick={() =>
              navigate("../calender", {
                state: { key: "add", modal: true },
                replace: true,
              })
            }
          >
            <Add />
            Add Event
          </button>
        </div>
      ) : null}

      <div className="rounded-lg ml-2 mr-16">
        <h1 className="text-2xl text-purple-900 font-semibold pt-2 ml-2 mb-3">
          Todays Events
        </h1>
      </div>

      <div className="bg-purple-900 flex rounded-lg ml-2 mr-16 pt-3 pb-3 pl-3 mb-3">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {todaysEventState.events.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              onClick={() => {
                if (event.id !== "")
                  navigate("../calender", {
                    state: { id: event.id, sidebar: true, key: "EventDet" },
                    replace: true,
                  });
              }}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">
                  {event.start?.toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg ml-2 mr-16">
        <h1 className="text-2xl text-purple-900 font-semibold pt-2 ml-2 mb-3">
          Tomorrows Events
        </h1>
      </div>

      <div className="bg-purple-900 flex rounded-lg ml-2 mr-16 pt-3 pb-3 pl-3">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tomorrowsEventState.events.map((event, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              onClick={() => {
                if (event.id !== "")
                  navigate("../calender", {
                    state: { id: event.id, sidebar: true, key: "EventDet" },
                    replace: true,
                  });
              }}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">
                  {event.start?.toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DefaultDashboard;

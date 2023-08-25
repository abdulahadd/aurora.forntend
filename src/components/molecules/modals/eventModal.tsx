import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Event } from "../../atoms/types/events/eventTypes";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { DialogAction } from "../../organisms/Calender";
import { OrganisationType } from "../../atoms/types/Organisation/OrgData";
import DropDown from "../../atoms/buttons/dropdowns/Dropdown";

type EventDate = Date | null;

export interface EventProps {
  title: string;
  purpose: DialogAction;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setEventsUpdated: Dispatch<SetStateAction<boolean>>;
}

export interface DDListing{
  id: string,
  name: string
}

export default function EventModal(props: EventProps) {
  const [startDateTime, setStartDateTime] = useState<EventDate>(null);
  const [endDateTime, setendDateTime] = useState<EventDate>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Event>();

  const [orgs, setOrgs] = useState<DDListing[]>();
  const [selectOrga, setSelectOrga] = useState("Select");

  const getOrgs = () => {
    fetch("http://localhost:5000/org")
      .then((response) => response.json())
      .then((json) => {
        const organizations: DDListing[]  = json.map((org) => ({id: org._id, name: org.name}));
        setOrgs(organizations);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    getOrgs();
  }, []);

  const createEvent = async (data: Event) => {
    try {
      const response = await axios.post("http://localhost:5000/events", data);
    } catch (error) {
      console.log(error);
    }
  };

  const editEvent = async (data: any, title: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/events/${title}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit: SubmitHandler<Event> = (data) => {
    let obj;
    if (data.title !== "") {
      obj = { ...data, start: startDateTime, end: endDateTime };
    } else obj = { start: startDateTime, end: endDateTime };

    if (props.purpose === DialogAction.CREATE_EVENT) {
      createEvent(obj);
      setStartDateTime(null);
      setendDateTime(null);
      props.setEventsUpdated(true);
    } else {
      editEvent(obj, props.title);
      setStartDateTime(null);
      setendDateTime(null);
      props.setEventsUpdated(true);
    }
    reset();
    props.setShowModal(false);
  };

  const SelectHandler = (inputString: string, key: any) => {
    
  };

  return (
    <>
      {props.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{props.purpose}</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    className="max-w-[450px] flex flex-col  w-full mx-auto p-4 border-2 rounded-xl drop-shadow-xl"
                    onSubmit={handleSubmit(onSubmit)}
                    id="event-form"
                  >
                    <div className="flex flex-col py2">
                      <label className="text-left">Title</label>
                      <input
                        className="border p-2  mt-2 mb-1"
                        {...register("title", {
                          required:
                            props?.purpose === DialogAction.CREATE_EVENT
                              ? true
                              : false,
                        })}
                        type="text"
                      />
                      <p className="text-left text-red-900 mb-2">
                        {errors.title &&
                          props.purpose === DialogAction.CREATE_EVENT &&
                          "Title is required"}
                      </p>
                    </div>
                    <div className="flex flex-col py2">
                      <label className="text-left mb-2">Start Date</label>
                      <DateTimePicker
                        onChange={setStartDateTime}
                        value={startDateTime}
                      />
                    </div>
                    <div className="flex flex-col py2">
                      <label className="text-left mb-2 mt-2">End Date</label>
                      <DateTimePicker
                        onChange={setendDateTime}
                        value={endDateTime}
                      />
                    </div>

                    {props?.purpose === DialogAction.CREATE_EVENT && (<div className="flex flex-col py2">
                      <label className="text-left  mt-2">Organisation</label>
                      <div className="mb-5 w-full text-bottom flex flex-col items-center">
                        <DropDown
                          items={orgs}
                          SelectHandler={SelectHandler}
                          fieldType="orga"
                          select={selectOrga}
                          setSelect={setSelectOrga}
                        />
                      </div>
                    </div>)}
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    form="event-form"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

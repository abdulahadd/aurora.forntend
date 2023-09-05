import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Event, Resource } from "../../atoms/types/events/eventTypes";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { DialogAction } from "../../organisms/Calender";
import DropDown from "../../atoms/buttons/dropdowns/Dropdown";
import { useUserSelector } from "../../../redux/redux-hooks/hooks";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";

type EventDate = Date | null;

export interface EventProps {
  title: string;
  purpose: DialogAction;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setEventsUpdated: Dispatch<SetStateAction<boolean>>;
  resource: Resource | null;
}

export interface DDListing {
  id: string;
  name: string;
}

export interface MultiUsers {
  cat: string;
  key: string;
}

export default function EventModal(props: EventProps) {
  const [startDateTime, setStartDateTime] = useState<EventDate>(null);
  const [endDateTime, setendDateTime] = useState<EventDate>(null);
  const userr = useUserSelector((state) => state);
  const [orgUsers, setorgUsers] = useState<MultiUsers[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<MultiUsers[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Event>();

  const [orgs, setOrgs] = useState<DDListing[]>();
  const [selectOrga, setSelectOrga] = useState("Select");
  const [orgID, setorgID] = useState("");

  const getUsers = (data: string) => {
    fetch(`http://localhost:5000/users/list/?orgId=${data}`)
      .then((response) => response.json())
      .then((json) => {
        const users: MultiUsers[] = json.map((user) => ({
          cat: user._id,
          key: user.username,
        }));
        setorgUsers(users);
      })
      .catch((error) => alert(error));
  };

  const getOrgs = () => {
    fetch("http://localhost:5000/org")
      .then((response) => response.json())
      .then((json) => {
        const organizations: DDListing[] = json.map((org) => ({
          id: org._id,
          name: org.name,
        }));
        setOrgs(organizations);
      })
      .catch((error) => console.log(error));
  };

  const preSelect = () => {
    axios.get(`http://localhost:5000/users/ids`, {
      params: {
        ids: props.resource?.users.join(','), // Convert array to comma-separated string
      },
    })
      .then((response) => {
        const users: MultiUsers[] = response.data.map((user) => ({
          cat: user._id,
          key: user.username,
        }));
        setSelectedUsers(users);
      })
      .catch((error) => console.log(error));

  };


  useEffect(() => {
    getOrgs();
    if (userr.role !== "SuperUser") {
      getUsers(userr.orgId);
    }

    if(props.purpose===DialogAction.EDIT_EVENT && props.showModal===true)
    {
      preSelect();
    }
  }, [props.showModal]);


  const createEvent = async (data: Event) => {
    let obj: any;
    const users = selectedUsers.map((user: MultiUsers) => user.cat);
    if (userr.role === "SuperUser") {
      obj = { ...data, orgId: orgID, users: users };
    } else {
      obj = { ...data, orgId: userr.orgId, users: users };
    }

    try {
      const response = await axios.post("http://localhost:5000/events", obj);
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
    let obj: any;
    if (data.title !== "") {
      obj = { ...data, start: startDateTime, end: endDateTime };
    } else obj = { start: startDateTime, end: endDateTime };

    if (props.purpose === DialogAction.CREATE_EVENT) {
      createEvent(obj);
      setStartDateTime(null);
      setendDateTime(null);
      setSelectOrga("Select");
      props.setEventsUpdated(true);
    } else {
      editEvent(obj, props?.title);
      setStartDateTime(null);
      setendDateTime(null);
      setSelectOrga("Select");
      props.setEventsUpdated(true);
    }
    reset();
    props.setShowModal(false);
  };

  const selectHandler = (inputString: string, key: any) => {
    setorgID(inputString);
    getUsers(inputString);
  };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedUsers(selectedList);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedUsers(selectedList);
  };

  return (
    <>
      {props.showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{props.purpose}</h3>
                </div>
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

                    {props?.purpose === DialogAction.CREATE_EVENT &&
                      userr.role === "SuperUser" && (
                        <div className="flex flex-col py2">
                          <label className="text-left  mt-2">
                            Organisation
                          </label>
                          <div className="mb-5 w-full text-bottom flex flex-col items-center">
                            <DropDown
                              items={orgs}
                              selectHandler={selectHandler}
                              fieldType="orga"
                              select={selectOrga}
                              setSelect={setSelectOrga}
                            />
                          </div>
                        </div>
                      )}

                    <div className="flex flex-col py2">
                      <label className="text-left  mt-2 mb-2">
                        Select Employees
                      </label>
                      <div className="flex flex-col py2 drop-shadow-xl mb-2">
                        <Multiselect
                          displayValue="key"
                          selectedValues={selectedUsers}
                          onRemove={onRemove}
                          onSelect={onSelect}
                          options={orgUsers}
                        />
                      </div>
                    </div>
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

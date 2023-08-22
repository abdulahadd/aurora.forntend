import React, { useState } from "react";
import { Add } from "@mui/icons-material";
import { SubmitHandler, useForm } from "react-hook-form";
import { Event } from "../../atoms/types/events/eventTypes";
import axios from "axios";
import DateTimePicker from "react-datetime-picker";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

type ValuePiece = Date | null;
type Value = ValuePiece;

export default function EventModal() {
  const [showModal, setShowModal] = useState(false);
  const [dateTime, setDateTime] = useState<Value>(new Date());
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Event>();
  

  const postRequest = async (data: Event) => {
    try {
        const response = await axios.post(
          "http://localhost:5000/events",
          data
        );
  
      } catch (error) {
        alert(error);
      }
  };

  const onSubmit: SubmitHandler<Event> = (data) => {
    const obj = { ...data, start: dateTime, end: dateTime }
    console.log("data", obj);
    postRequest(obj);
    reset();
    setShowModal(false)
    
    
  };

  return (
    <>
      <div className=" flex justify-start">
        <button
          className="bg-purple-900 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 ml-1 mb-4"
          type="button"
          onClick={() => setShowModal(true)}
        >
          <Add />
          Add Event
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Add Event</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    className="max-w-[410px] w-full mx-auto p-4 border-2 rounded-xl drop-shadow-xl"
                    onSubmit={handleSubmit(onSubmit)}
                    id="event-form"
                  >
                    <div className="flex flex-col py2">
                      <label className="text-left">Title</label>
                      <input
                        className="border p-2  mt-2 mb-1"
                        {...register("title", { required: true })}
                        type="text"
                      />
                      <p className="text-left text-red-900 mb-2">
                        {errors.title && "Title is required"}
                      </p>
                    </div>
                    <div className="flex flex-col py2">
                      <label className="text-left mb-2">Start Date</label>
                      <DateTimePicker onChange={setDateTime}  value={dateTime}/>
                
                    </div>
                    
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
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

import React, { useEffect, useState } from "react";
import { useUserSelector } from "../../redux/redux-hooks/hooks";
import { Menu, Sidebar } from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Typography, colors } from "@mui/material";
import axios from "axios";
import { EventDetails } from "../atoms/types/events/eventTypes";
import { env } from "process";
import { format } from "date-fns";
import { CommentType } from "../atoms/types/comments/commentTypes";
import { Edit } from "@mui/icons-material";
import { Delete } from "@mui/icons-material";

interface SideBarProps {
  currentEvent: string;
  isOpen: boolean;
}

const RightSidebar: React.FC<SideBarProps> = ({ currentEvent, isOpen }) => {
  const user = useUserSelector((state) => state);
  const [addComment, setAddComment] = useState("");
  const [eventDet, setEventDet] = useState<EventDetails>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [comments, setComments] = useState<CommentType[]>();
  const [ifAdded, setifAdded] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [editComment, seteditComment] = useState<CommentType>();

  const getComments = () => {
    axios
      .get(`${process.env.REACT_APP_COMMENTS_URL}event/${currentEvent}`)
      .then((response) => {
        const comment: CommentType[] = response.data;
        setComments(comment);
      })
      .catch((error) => console.log(error));
  };

  const getEventDetails = () => {
    axios
      .get(`${process.env.REACT_APP_EVENTS_URL}${currentEvent}`)
      .then((response) => {
        const event: EventDetails = response.data;
        setStartDate(format(new Date(response.data.start), "kk:mm a "));
        setEndDate(format(new Date(response.data.end), "kk:mm a "));
        setEventDet(event);
      })
      .catch((error) => console.log(error));
  };

  const addComments = () => {
    const comment = {
      userId: user.username,
      eventId: currentEvent,
      isActive: true,
      comment: addComment,
      
    };

    axios
      .post(`${process.env.REACT_APP_COMMENTS_URL}`, comment)
      .then((response) => {
        setAddComment("");
        setifAdded(!ifAdded);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getEventDetails();
    getComments();
  }, [ifAdded]);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddComment(event.target.value);
  };

  const editHandler = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_COMMENTS_URL}${editComment?._id}`,
        { comment: addComment }
      );
      setAddComment("");
      setifAdded(!ifAdded);
      setisEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (comment) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_COMMENTS_URL}${comment?._id}`
      );
      setifAdded(!ifAdded);
    } catch (error) {
      console.log(error);
    }
  };

  return isOpen === true ? (
    <div className="flex h-[700px] w-[300px]">
      <Sidebar width="300px">
        <Menu>
          <div className=" bg-purple-900 mb-9 p-2.5 ">
            <div className=" flex justify-between items-center">
              <div className=" text-xl ml-5 text-gray-200">
                {eventDet?.title}
              </div>
            </div>
          </div>

          <Box mb="25px">
            <Box display="flex" alignItems=" left" ml="25px"></Box>
            <Box textAlign="left" ml="20px">
              <Typography color={colors.grey[800]}>
                Start : {startDate}
              </Typography>
              <Typography color={colors.grey[800]}>End : {endDate}</Typography>

              <div className="antialiased mx-auto max-w-screen-sm mt-4 items-start">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Comments
                </h3>
                {comments?.map((comment) => (
                  comment && (<div className="space-y-4 mr-4" key={comment?._id}>
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">{/* img */}</div>
                      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed mb-2">
                        <div className="flex justify-between">
                          <strong className=" mb-1 pr-12">
                            {comment?.userId}
                          </strong>
                          {user.username === comment?.userId && (
                            <div>
                              <Edit
                                fontSize="small"
                                onClick={() => {
                                  setAddComment(comment?.comment);
                                  seteditComment(comment);
                                  setisEdit(true);
                                }}
                              />
                              <Delete
                                fontSize="small"
                                onClick={() => {
                                  deleteHandler(comment);
                                }}
                              />
                            </div>
                          )}
                        </div>
                        <p className="text-sm">{comment?.comment}</p>
                      </div>
                    </div>
                  </div>)
                ))}

                <div>
                  <label>Add a comment</label>
                  <input
                    className="border-2 p-2 mt-1 mr-2"
                    value={addComment}
                    onChange={handleCommentChange}
                    type="text"
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        if (isEdit) editHandler();
                        else addComments();
                        setifAdded(false);
                      }
                    }}
                  />
                </div>
              </div>
            </Box>
          </Box>
        </Menu>
      </Sidebar>
    </div>
  ) : null;
};

export default RightSidebar;

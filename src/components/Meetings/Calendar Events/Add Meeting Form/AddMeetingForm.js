import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { PersonAdd, ThumbUp, VideoCall } from "@material-ui/icons";

import classes from "./AddMeetingForm.module.css";
import timeFormatter from "../../../../utils/Time Formater/TimeFormatter";
import Modal from "../../../../UI/Modal Container/Modal";
import Button from "../../../../UI/Button/Button";
import MultiSelect from "../../../../UI/Multi Select/MultiSelect";

const AddMeetingForm = ({ displayForm }) => {
  const [render, setRender] = useState(displayForm);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [attendeeModal, setAttendeeModal] = useState(false);

  const token = useSelector((state) => state.authentication.token);

  useEffect(() => {
    if (displayForm) setRender(true);
  }, [displayForm]);

  const onUnMount = () => {
    if (!displayForm) setRender(false);
  };
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeDescription = (e) => setDescription(e.target.value);
  const onChangeDate = (e) => setDate(e.target.value);
  const onChangeStartTime = (e) => setStartTime(e.target.value);
  const onChangeEndTime = (e) => setEndTime(e.target.value);
  const onToggleModal = (e) => {
    e.preventDefault();
    setAttendeeModal((prev) => !prev);
  };
  const onSubmitFormHandler = async (e) => {
    e.preventDefault();

    try {
      const user = {
        title,
        description,
        date,
        startTime: timeFormatter(startTime),
        endTime: timeFormatter(endTime),
        attendees: attendees.map((attendee) => attendee.email),
      };
      console.log(user);
      let res = await fetch("http://localhost:8000/meeting/add", {
        method: "POST",
        body: JSON.stringify({ ...user }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      res = await res.json();
      if (res.error) throw new Error(res.error);
      // [ TODO ] show success message
      console.log(res);
    } catch (error) {
      // [ TODO ] show error message
      console.log(error.message);
    } finally {
      setTitle("");
      setDate("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      setAttendees([]);
    }
  };

  const selectItemHandler = (user) => {
    setAttendees((prev) => {
      const items = [...prev];
      items.push(user);
      return items;
    });
  };

  const unSelectItemHandler = (user) => {
    setAttendees((prev) => {
      const items = [...prev];
      return items.filter((item) => user.email !== item.email);
    });
  };

  const getItemsHandler = async (searchCriteria) => {
    try {
			let response = await fetch(
				`http://localhost:8000/auth/users?search=${searchCriteria}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			response = await response.json();
			if (response.error) throw new Error(response.error);
			return response;
		} catch (err) {
			throw new Error(err.message);
		}
  };

  const dateObj = new Date();
  const currDate = `${dateObj.getFullYear()}-${dateObj.getMonth()}-${dateObj.getDate()}`;
  const currTime = `${dateObj.getHours()}:${dateObj.getMinutes()}`;

  return (
    render && (
      <Fragment>
        <Modal showModal={attendeeModal} onToggleModal={onToggleModal}>
          <MultiSelect
            getItems={getItemsHandler}
            selectedItems={attendees}
            onSelectItem={selectItemHandler}
            onDeselectItem={unSelectItemHandler}
          />
          <Button
            type="secondary"
            color="#7B6F14"
            onClickHandler={onToggleModal}
          >
            <ThumbUp />
            Done
          </Button>
        </Modal>
        <form
          action=""
          method="post"
          onSubmit={onSubmitFormHandler}
          className={`${classes["create-meeting"]} ${
            displayForm ? classes.show : classes.hide
          }`}
          onAnimationEnd={onUnMount}
        >
          <input
            onChange={onChangeTitle}
            type="text"
            name="meeting-title"
            id={classes["create-meeting-title"]}
            required
            placeholder="Enter meeting title"
            value={title}
          />
          <div className={classes["meeting-date-container"]}>
            <label>Select meeting date</label>
            <input
              onChange={onChangeDate}
              type="date"
              name="meeting-date"
              id={classes["create-meeting-date"]}
              value={date}
              min={currDate}
            />
          </div>
          <div className={classes["start-time-container"]}>
            <label>Start Time</label>
            <input
              onChange={onChangeStartTime}
              type="time"
              name="meeting-start-time"
              id={classes["create-meeting-start-time"]}
              value={startTime}
              min={currTime}
            />
          </div>
          <div className={classes["end-time-container"]}>
            <label>End Time</label>
            <input
              onChange={onChangeEndTime}
              type="time"
              name="meeting-end-time"
              id={classes["create-meeting-end-time"]}
              value={endTime}
              min={startTime}
            />
          </div>
          <input
            onChange={onChangeDescription}
            type="text"
            name="meeting-description"
            id={classes["create-meeting-description"]}
            placeholder="What the meeting is about?"
            value={description}
          />

          <div className={classes["btn-grp"]}>
            <Button
              type="none"
              family="primary"
              color="#548385"
              onClickHandler={onToggleModal}
            >
              <PersonAdd fontSize="medium" />
              <div>Add Attendee</div>
            </Button>
            <Button
              type="submit"
              family="secondary"
              color="#548385"
              onClickHandler={onSubmitFormHandler}
            >
              <VideoCall fontSize="medium" />
              <div>Create Meeting</div>
            </Button>
          </div>
        </form>
      </Fragment>
    )
  );
};

export default AddMeetingForm;

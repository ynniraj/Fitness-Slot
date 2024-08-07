import React, { useState } from "react";
import s from "../../styles/book.module.scss";
import axios from "axios";

const BookClasses = ({ data }) => {
  const [classData, setClassData] = useState(data);

  const handleClick = () => {
    const userId = localStorage.getItem("selectedUser");
    const isUserBooked = classData.bookedBy.includes(userId);
    const isUserWaitlisted = classData.waitlist.includes(userId);

    if (isUserBooked || isUserWaitlisted) {
      alert("You are already booked or waitlisted for this class.");
      return;
    }

    const payload = {
      classId: data?._id,
      userId: localStorage.getItem("selectedUser"),
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_APIURL}/api/book-classes`, payload)
      .then((res) => {
        alert("Class Booked");
        setClassData(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className={s.bookMain}>
      <div className={s.details}>
        <h2>Class Details</h2>
        <p className={s.title}>{classData?.type}</p>
        <p className={s.detailsOth}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
          libero inventore provident eligendi mollitia dolorem odit totam modi
          asperiores dolores quam sint suscipit, explicabo aspernatur magni
          cumque enim rem maxime!
        </p>

        <h4>Details</h4>
        <div className={s.classGrid}>
          <p>Capacity: {classData?.capacity}</p>
          <p>Slots Booked: {classData?.bookedSlots}</p>
          <p>Start Time: {new Date(classData?.startTime).toLocaleString()}</p>
          <p>Waitlist: {classData?.waitlist.length}</p>
        </div>

        <button onClick={handleClick}>
          {classData?.capacity > classData?.bookedSlots
            ? "Book Slot"
            : "Join Waitlist"}
        </button>
      </div>
      <div className={s.listView}>
        <div className={s.bookedUser}>
          <h3>Booked By</h3>
          {classData?.bookedBy?.map((elem) => {
            return <p key={elem}>{elem}</p>;
          })}
        </div>
        <div className={s.waitlist}>
          <h3>WaitList</h3>
          {classData?.waitlist?.map((elem) => {
            return <p key={elem}>{elem}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default BookClasses;

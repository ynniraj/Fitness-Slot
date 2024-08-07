import React, { useEffect, useState } from "react";
import useFetch from "./Utils/useFetch";
import s from "../../styles/cancel.module.scss";
import axios from "axios";

const CancelClasses = () => {
  const [selectedUser, setSelectedUser] = useState("User1");
  const [classes, setClasses] = useState([]);
  const { data, loading } = useFetch(
    `/api/getuser-classes?userId=${selectedUser}`
  );

  useEffect(() => {
    const user = localStorage.getItem("selectedUser");
    setSelectedUser(user);
  }, []);

  useEffect(() => {
    if (data) {
      setClasses(data);
    }
  }, [data]);

  const handleCancel = (classId) => {
    const payload = {
      classId: classId,
      userId: localStorage.getItem("selectedUser"),
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_APIURL}/api/cancel-classes`, payload)
      .then((res) => {
        alert(res.data);
        return axios.get(
          `${process.env.NEXT_PUBLIC_APIURL}/api/getuser-classes?userId=${selectedUser}`
        );
      })
      .then((response) => {
        setClasses(response.data);
      })
      .catch((err) => alert(err.response.data));
  };

  if (loading) {
    return "Loading classes...";
  }

  return (
    <>
      <h2 className={s.titleUser}>LoggedIn User: {selectedUser}</h2>
      <div className={s.showMain}>
        {classes.length === 0
          ? "No Upcoming Classes"
          : classes?.map((elem) => {
              const isClassClosed = new Date(elem.startTime) < new Date();
              return (
                <div key={elem._id} className={s.showCard}>
                  <div className={s.firstRow}>
                    <p className={s.title}>{elem.type}</p>
                    <p>Capacity: {elem.capacity}</p>
                  </div>
                  <p>Slots Booked: {elem.bookedSlots}</p>
                  <p>Start Time: {new Date(elem.startTime).toLocaleString()}</p>
                  <button
                    onClick={
                      isClassClosed ? null : () => handleCancel(elem._id)
                    }
                  >
                    {isClassClosed ? "Class Already Started" : "Cancel Class"}
                  </button>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default CancelClasses;

import React, { useState } from "react";
import useFetch from "./Utils/useFetch";
import s from "../../styles/showclasses.module.scss";
import { useRouter } from "next/router";

const ShowClasses = () => {
  const [classType, setClassType] = useState("");
  const router = useRouter();

  const { data, loading } = useFetch(`/api/filter-classes?type=${classType}`);

  if (loading) {
    return "Loading classes...";
  }

  const handleChange = (event) => {
    setClassType(event.target.value);
  };

  const handleClick = (url) => {
    router.push(url);
  };

  return (
    <>
      <div className={s.mainCont}>
        <div className={s.filters}>
          <select onChange={handleChange} value={classType}>
            <option value="">Filter</option>
            <option value="Yoga">Yoga</option>
            <option value="Gaming">Gaming</option>
            <option value="Music">Music</option>
          </select>
        </div>
        <div className={s.showMain}>
          {data?.length == 0
            ? "No Classes Available"
            : data?.map((elem) => {
                const isClassClosed = new Date(elem.startTime) < new Date();
                return (
                  <div
                    key={elem._id}
                    className={s.showCard}
                    onClick={
                      isClassClosed
                        ? null
                        : () => handleClick(`/${elem.type}/${elem._id}`)
                    }
                  >
                    <div className={s.firstRow}>
                      <p className={s.title}>{elem.type}</p>
                      <p>Capacity: {elem.capacity}</p>
                    </div>
                    <p>Slots Booked: {elem.bookedSlots}</p>
                    <p>Waitlist: {elem.waitlist?.length}</p>
                    <p>
                      Start Time: {new Date(elem.startTime).toLocaleString()}
                    </p>
                    <button>
                      {isClassClosed
                        ? "Class Already Started"
                        : elem?.capacity > elem?.bookedSlots
                        ? "Book Slot"
                        : "Join Waitlist"}
                    </button>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default ShowClasses;

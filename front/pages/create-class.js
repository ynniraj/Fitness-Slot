import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/form.module.scss";
import { useRouter } from "next/router";

const ClassForm = () => {
  const [type, setType] = useState("");
  const [capacity, setCapacity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!type || !capacity || isNaN(capacity) || capacity <= 0 || !startTime) {
      setError("Please provide valid type, capacity, and start time.");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/api/add-classes`, {
        classType: type,
        capacity: parseInt(capacity, 10),
        startTime: new Date(startTime).toISOString(),
      });
      setSuccess("Class created successfully!");
      setError("");
      // Optionally reset form fields
      setType("");
      setCapacity("");
      setStartTime("");
      router.push("/");
    } catch (error) {
      setError("Failed to create class. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create New Class</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="type">Class Type:</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="capacity">Capacity:</label>
          <input
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
            min="1"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <button type="submit">Create Class</button>
      </form>
    </div>
  );
};

export default ClassForm;

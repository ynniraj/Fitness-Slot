import { useEffect, useState } from "react";
import ShowClasses from "../src/Components/ShowClasses";
import Link from "next/link";

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const userMain = localStorage.getItem("selectedUser");
    setSelectedUser(userMain);
  }, [user]);

  const handleChange = (e) => {
    e.preventDefault();
    localStorage.setItem("selectedUser", e.target.value);
    setUser(e.target.value);
  };

  return (
    <>
      <div className="selectDiv">
        <select onChange={handleChange} value={user}>
          <option value="">Select User</option>
          <option value="User1">User1</option>
          <option value="User2">User2</option>
          <option value="User3">User3</option>
          <option value="User4">User4</option>
        </select>
        <h2>LoggedIn User : {selectedUser}</h2>
        <Link href={"/cancel"} className="link">
          Show booked Classes
        </Link>
      </div>

      {!selectedUser ? (
        <div className="userSelect">Select User First</div>
      ) : (
        <ShowClasses />
      )}
    </>
  );
}

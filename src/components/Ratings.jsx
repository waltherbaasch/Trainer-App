import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Ratings = () => {
  const location = useLocation();
  const {
    className,
    trainerName,
    classDescription,
    classDay,
    classTime,
    classId,
  } = location.state || {};
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? "#ffc107" : "#e4e5e9" }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const addUserToClass = () => {
    fetch(`http://localhost:4000/api/v1/users/1/classes/${classId}`, {
      method: "POST",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIkMmEkMTUkNUNCd3lhQ21xblVLODUxWFlYaThLLmY4RUFkanFraUQuN2h4RDkzSTRIOGdWR2NBazdhLi4iLCJ1c2VyRmlyc3ROYW1lIjpudWxsLCJ1c2VyTGFzdE5hbWUiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjAtMDMtMDhUMTk6MDY6NDIuMzgyWiIsInVwZGF0ZWRBdCI6IjIwMjAtMDMtMDhUMTk6MDY6NDIuMzgyWiJ9LCJpYXQiOjE1ODM2OTQ5NTEsImV4cCI6MTU4MzY5ODU1MX0.bP1g83FK4SIy_oZcMaLiBZ_116MnBufcXSD0LtE5dP8",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Class Name: {className}</h2>
      <h3>Trainer Name: {trainerName}</h3>
      <p>Description: {classDescription}</p>
      <p>Day: {classDay}</p>
      <p>Time: {classTime}</p>
      <div>{renderStars()}</div>
      <button onClick={handleOpenPopup} style={{ backgroundColor: "#fcd34d" }}>
        Rate
      </button>
      <button
        onClick={addUserToClass}
        style={{ backgroundColor: "#fcd34d", marginLeft: "10px" }}
      >
        Add User to the Class
      </button>
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h4>Rate this class</h4>
          <input
            type="range"
            min="0"
            max="5"
            value={rating}
            onChange={handleRatingChange}
          />
          <div>{renderStars()}</div>
          <button
            onClick={handleClosePopup}
            style={{ backgroundColor: "#fcd34d" }}
          >
            Submit Rating
          </button>
        </div>
      )}
    </div>
  );
};

export default Ratings;

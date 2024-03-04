import React, { useEffect, useState } from "react";

function Calendar() {
  const [classInfo, setClassInfo] = useState(null);

  useEffect(() => {
    fetchClassInfo();
  }, []);

  const fetchClassInfo = () => {
    fetch("http://localhost:4000/api/v1/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        className: "Lower Abs Workout",
        classDescription:
          "Get ripped! We'll work on your six-packs and get flat tummies.",
        classDay: "Wednesday",
        classTime: "16:30",
      }),
    })
      .then((response) => response.json())
      .then((data) => setClassInfo(data))
      .catch((err) => console.error(err));
  };

  if (!classInfo) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto bg-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-bold mb-2">My Schedule</h2>
      <p>
        <strong>Name:</strong> {classInfo.className}
      </p>

      <p>
        <strong>Day:</strong> {classInfo.classDay}
      </p>
      <p>
        <strong>Time:</strong> {classInfo.classTime}
      </p>
    </div>
  );
}

export default Calendar;

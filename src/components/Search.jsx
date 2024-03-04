import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeImage1 from "../images/Home-image.jpg";
import HomeImage2 from "../images/Home-image2.jpg";
import HomeImage3 from "../images/Home-image3.jpg";
import HomeImage4 from "../images/Home-image4.jpg";
import DetailsImage2 from "../images/Class details - 1-image.jpg";
import SearchImage4 from "../images/Search-image4.jpg";
import SearchImage5 from "../images/Search-image5.jpg";
import SearchImage6 from "../images/Search-image6.jpg";

function Search() {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const images = [HomeImage1, HomeImage2, HomeImage3, HomeImage4];
  const trainerImages = [
    DetailsImage2,
    SearchImage4,
    SearchImage5,
    SearchImage6,
  ];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:4000/api/v1/classes")
      .then((response) => {
        setClasses(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch classes", err);
        setError(err.message);
      });

    axios
      .get("http://localhost:4000/api/v1/trainers")
      .then((response) => {
        setTrainers(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch trainers", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleClassClick = (classItem, trainer) => {
    navigate("/ratings", {
      state: {
        className: classItem.className,
        trainerName: trainer?.trainerName,
        classDescription: classItem.classDescription,
        classDay: classItem.classDay,
        classTime: classItem.classTime,
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Search classes..."
          className="border-2 border-gray-300 rounded-lg p-2"
        />
      </div>
      <div className="flex flex-wrap justify-center mb-8">
        {classes
          .filter((classItem) =>
            classItem.className.toLowerCase().includes(searchTerm)
          )
          .map((classItem, index) => {
            const trainer = trainers.find(
              (trainer) => trainer.assetId === classItem.assetId
            );
            return (
              <div
                key={index}
                className={`m-2 w-32 ${searchTerm ? "bg-yellow-200" : ""}`}
                onClick={() => handleClassClick(classItem, trainer)}
              >
                <img
                  src={images[index % images.length]}
                  alt={`Class Image ${index + 1}`}
                  className="h-36 object-cover rounded-lg shadow-md cursor-pointer"
                />
                <div className="text-center mt-2 text-sm cursor-pointer">
                  {classItem.className}
                </div>
              </div>
            );
          })}
      </div>
      <h2 className="text-lg font-semibold mb-4">Trainers</h2>
      <div className="flex flex-col items-center">
        {trainers.map((trainer, index) => (
          <div key={index} className="flex items-center w-full mb-2">
            <img
              src={trainerImages[index % trainerImages.length]}
              alt="Trainer"
              className="object-cover mr-4"
              style={{ height: "88px", width: "88px", borderRadius: "8px" }}
            />
            <div className="cursor-pointer">{trainer.trainerName}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;

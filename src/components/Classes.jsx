import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeImage1 from "../images/Home-image.jpg";
import HomeImage2 from "../images/Home-image2.jpg";
import HomeImage3 from "../images/Home-image3.jpg";
import HomeImage4 from "../images/Home-image4.jpg";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const images = [
    { src: HomeImage1, width: 335, height: 404 },
    { src: HomeImage2, width: 170, height: 170 },
    { src: HomeImage3, width: 170, height: 170 },
    { src: HomeImage4, width: 170, height: 170 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/classes")
      .then((response) => {
        setClasses(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Popular Classes</h2>
      <div className="flex flex-wrap">
        {images.map((image, index) => (
          <div
            key={index}
            className={`p-2 ${index > 0 ? "hidden md:block" : ""}`}
          >
            <div className="relative">
              <img
                src={image.src}
                alt={`Home Image ${index + 1}`}
                className="rounded-lg shadow-lg"
                style={{
                  width: `${image.width}px`,
                  height: `${image.height}px`,
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-black p-2 text-center">
                <p className="text-xs">
                  {classes.length > index && classes[index].className}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 overflow-x-scroll whitespace-nowrap">
        <div className="flex">
          {images.slice(1).map((image, index) => (
            <div key={index} className="p-2">
              <div className="relative">
                <img
                  src={image.src}
                  alt={`Home Image ${index + 2}`}
                  className="rounded-lg shadow-lg"
                  style={{
                    width: `${image.width}px`,
                    height: `${image.height}px`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-black p-2 text-center">
                  <p className="text-xs">
                    {classes.length > index + 1 && classes[index + 1].className}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;

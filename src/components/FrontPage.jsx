import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import WelcomeImage from '../images/Welcome-image.jpg';
import WelcomeImage2 from '../images/Welcome-image2.jpg';

const FrontPage = () => {
  const navigate = useNavigate(); 


  const handleStartTrainingClick = () => {
    navigate('/classes'); 
  };

  return (
    <div className="relative w-full h-screen flex flex-col">

      
      <div className="flex-1 bg-cover bg-center relative" style={{backgroundImage: `url(${WelcomeImage})`}}>
       
        <div className="absolute bottom-0 left-0 right-0 text-center pb-5">
          <div className="flex flex-col items-center justify-center">
            <span className="text-5xl" style={{color: '#F1C40E'}}>Believe</span>
            <span className="text-5xl" style={{color: '#F1C40E'}}>Yourself</span>
        
            <div className="text-white text-lg mt-2">Train like a pro</div>
          </div>
        </div>
      </div>
     
     
      <div className="flex-1 bg-cover bg-center" style={{backgroundImage: `url(${WelcomeImage2})`}}></div>
      
  
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <button onClick={handleStartTrainingClick} className="bg-yellow-400 rounded-full py-2 px-4 text-sm md:text-base">
          Start Training
        </button>
      </div>
    </div>
  );
}

export default FrontPage;


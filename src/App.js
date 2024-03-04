import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext'; 
import BurgerMenu from './components/BurgerMenu';
import FrontPage from './components/FrontPage';
import LogInForm from './components/LogInForm';
import Classes from './components/Classes';
import Ratings from './components/Ratings';
import Search from './components/Search';
import Calendar from './components/Calender'; 

function App() {
  return (
    <Router>
      <AuthProvider>
        <BurgerMenu /> 
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/login" element={<LogInForm />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/ratings" element={<Ratings />} />
          <Route path="/search" element={<Search />} />
          <Route path="/calender" element={<Calendar />} /> 
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

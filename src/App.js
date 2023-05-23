import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
import ClassDashboard from './components/ClassDashboard';
import StudentDirectory from './components/StudentDirectory';
import TeacherDirectory from './components/TeacherDirectory';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="classes" element={<ClassDashboard/>} />
          <Route path="/students" element={<StudentDirectory/>} />
          <Route path="/teachers" element={<TeacherDirectory/>} />
          <Route path="/calendar" element={<Calendar/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

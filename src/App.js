import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
import ClassDashboard from './components/ClassDashboard';
import StudentDirectory from './components/StudentDirectory';
import TeacherDirectory from './components/TeacherDirectory';
import Calendar from './components/Calendar';
import ClassPage from './components/ClassPage';
import Navbar from './components/Navbar';

import {db} from './firebase.js'
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import {useState, useEffect} from 'react';
function App() {
  const collectionName = 'User'
    const [userCollection, setUserCollection] = useState([])
    useEffect(() => {
        getDocs(collection(db, collectionName))
        .then((allDocs) => 
        {let data = []
          allDocs.forEach((doc) => {
            data.push({...doc.data(), id:doc.id})
          })
          console.log(data)
          setUserCollection(data)
        }) 
    },[])

    const collectionName2 = 'Class'
    const [classCollection, setClassCollection] = useState([])
    useEffect(() => {
        getDocs(collection(db, collectionName2))
        .then((allDocs) => 
        {let data = []
          allDocs.forEach((doc) => {
            data.push({...doc.data(), id:doc.id})
          })
          console.log(data)
          setClassCollection(data)
        }) 
    },[])  

    const collectionName3 = 'Grade'
    const [gradeCollection, setGradeCollection] = useState([])
    useEffect(() => {
        getDocs(collection(db, collectionName3))
        .then((allDocs) => 
        {let data = []
          allDocs.forEach((doc) => {
            data.push({...doc.data(), id:doc.id})
          })
          console.log(data)
          setGradeCollection(data)
        }) 
    },[])  
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="classes">
            <Route index element={<ClassDashboard classCollection = {classCollection} userCollection = {userCollection} gradeCollection = {gradeCollection}/>}/>
            <Route path='class/:id' element={<ClassPage/>}></Route>
          </Route>
          <Route path="/students" element={<StudentDirectory userCollection = {userCollection}/>} />
          <Route path="/teachers" element={<TeacherDirectory userCollection ={userCollection}/>} />
          <Route path="/calendar" element={<Calendar/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

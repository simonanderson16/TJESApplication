import './App.css';
import HomePage from './components/HomePage';
import ClassDashboard from './components/ClassDashboard';
import StudentDirectory from './components/StudentDirectory';
import TeacherDirectory from './components/TeacherDirectory';
import Calendar from './components/Calendar/Calendar';
import Navbar from './components/Navbar';
import Login from './components/Login'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { db } from './firebase.js'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';

let user;

function App() {
  const collectionName = 'User';
  const [userCollection, setUserCollection] = useState([]);


  useEffect(() => {
    getDocs(collection(db, collectionName))
      .then((allDocs) => {
        let data = []
        allDocs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id })
        })
        console.log(data)
        setUserCollection(data)
      })
  }, [])

  const getIsAdmin = async () => {
    if(!getAuth().currentUser) {
      return false;
    }
    const response = await getDocs(query(collection(db, 'User'), where('uid', "==", getAuth().currentUser.uid.toString())));
    user = { id: response.docs?.[0].id, userObject: response.docs?.[0].data()};
    return user.userObject.userType === 'admin';
  }

  let isAdmin = getIsAdmin();

  const collectionName2 = 'Class'
  const [classCollection, setClassCollection] = useState([])
  useEffect(() => {
    getDocs(collection(db, collectionName2))
      .then((allDocs) => {
        let data = []
        allDocs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id })
        })
        console.log(data)
        setClassCollection(data)
      })
  }, [])

  const collectionName3 = 'Grade'
  const [gradeCollection, setGradeCollection] = useState([])
  useEffect(() => {
    getDocs(collection(db, collectionName3))
      .then((allDocs) => {
        let data = []
        allDocs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id })
        })
        console.log(data)
        setGradeCollection(data)
      })
  }, [])
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="classes">
            <Route index element={<ClassDashboard classCollection={classCollection} userCollection={userCollection} gradeCollection={gradeCollection} />} />
            <Route path='class/:id' element={<HomePage />}></Route>
          </Route>
          <Route path="/students" element={<StudentDirectory
            userCollection={userCollection}
            isAdmin={isAdmin} />} />
          <Route path="/teachers" element={<TeacherDirectory userCollection={userCollection} />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export { user };

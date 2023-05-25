import './App.css';
import HomePage from './components/HomePage';
import ClassDashboard from './components/ClassDashboard';
import StudentDirectory from './components/StudentDirectory';
import TeacherDirectory from './components/TeacherDirectory';
import ClassPage from './components/ClassPage';
import Calendar from './components/Calendar';
import Navbar from './components/Navbar';
import Login from './components/Login'
import PageDoesExist from './components/PageDoesExist';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { db } from './firebase.js';
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useState, useEffect } from 'react';

const getUser = async () => {
  if (!getAuth().currentUser) {
    return false;
  }
  const response = await getDocs(query(collection(db, 'User'), where('uid', "==", getAuth().currentUser.uid.toString())));
  return { id: response.docs?.[0].id, userObject: response.docs?.[0].data() };
}

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
        setUserCollection(data)
      })
  }, [])

  let isAdmin = getUser()?.userObject?.userType === 'admin';

  const collectionName2 = 'Class'
  const [classCollection, setClassCollection] = useState([])
  useEffect(() => {
    getDocs(collection(db, collectionName2))
      .then((allDocs) => {
        let data = []
        allDocs.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id })
        })
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
            <Route index element={<ClassDashboard classCollection = {classCollection} userCollection = {userCollection} gradeCollection = {gradeCollection}/>}/>
            <Route path='class/:id' element={<ClassPage userCollection={userCollection} classCollection={classCollection}/>}></Route>
          </Route>
          <Route path="/students" element={<StudentDirectory
            userCollection={userCollection} />} />
          <Route path="/teachers" element={<TeacherDirectory userCollection={userCollection} />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path ="*" element={<PageDoesExist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
export { getUser };

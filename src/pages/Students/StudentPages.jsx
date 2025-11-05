import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentDashboard from './StudentDashboard'
import Sidebar from '../../Components/StudentDash/Sidebar'
import Header from '../../Components/StudentDash/Header'
import Profile from './Profile'
import TestAttempt from '../Admin/test/TestAttempt'
import CodeEditorPage from './Editor/CodeEditorPage'
import TestResults from '../Admin/test/TestResults'
import TestAttemptsList from './test/TestAttemptsList'

const StudentPages = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
      useEffect(() => {
        document.body.className = darkMode ? 'dark-mode' : '';
      }, [darkMode]);

  return (
    <>
    {/* <div className='students-pages-container-box'>  */}
    <div className={`admin-dashboard ${darkMode ? 'admin-dashboard--dark' : ''}`}>
       <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        darkMode={darkMode}
      />

       <div className="admin-dashboard__main">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          darkMode={darkMode}
          onThemeToggle={() => setDarkMode(!darkMode)}
        />
    <Routes >
        <Route path='/' element={<StudentDashboard />} />
        <Route path='/dashboard' element={<StudentDashboard />} />
        <Route path='/profile' element ={<Profile />} />
        <Route path='/testattempt/:testId' element ={<TestAttempt />} />
        <Route path='/testattempt/result/:testId' element ={<TestResults />} />
        <Route path='/codeediter' element ={<CodeEditorPage />} />
        <Route path='/mytests' element={<TestAttemptsList />} />
    </Routes>
    </div>
    </div>
    {/* </div> */}
    </>
  )
}

export default StudentPages
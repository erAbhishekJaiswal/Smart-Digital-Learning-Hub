import React , { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import UserList from './usermanage/UserList'
import Sidebar from '../../Components/AdminDash/Sidebar'
import Header from '../../Components/AdminDash/Header'
import CreateTechStack from './techStack/CreateTechStack'
import AdminProfile from './AdminProfile'
const AdminPages = () => {
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [darkMode, setDarkMode] = useState(false);
        useEffect(() => {
          document.body.className = darkMode ? 'dark-mode' : '';
        }, [darkMode]);
  return (
      <>
      
      {/* <div className='admin-pages-container-box'> */}
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
        <Route path='/' element={<AdminDashboard dark={darkMode}  />} />
        <Route path='/dashboard' element={<AdminDashboard dark={darkMode}  />} />
        <Route path='/userlist' element ={<UserList dark={darkMode}  />} />
        <Route path='/createTeckStack' element={<CreateTechStack dark={darkMode} />} />
        <Route path='/profile' element={<AdminProfile dark={darkMode} />} />
    </Routes>
    </div>
    </div>
    {/* </div> */}
    </>
  )
}

export default AdminPages
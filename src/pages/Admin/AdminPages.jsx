import React , { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import UserList from './usermanage/UserList'
import Sidebar from '../../Components/AdminDash/Sidebar'
import Header from '../../Components/AdminDash/Header'
import CreateTechStack from './techStack/CreateTechStack'
import AdminProfile from './AdminProfile'
// import AddEditCourse from './course/AddEditCourse'
import CourseList from './course/CourseList'
import CreateAdPage from './Ads/CreateAdPage'
import AdsListPage from './Ads/AdsListPage'
import UploadBookForm from './EBooks/UploadBookForm'
import BookListPage from './EBooks/BookListPage';
import TestList from './test/TestList';
import AddQuestion from './test/AddQuestion';
import PdfBookReader from '../PdfBookReader/PdfBookReader'
import CreateUpdate from './course/CreateUpdate'
import AdminTechStackList from './techStack/AdminTechstacklist'
import AddCompany from './Job/AddCompany'
import ApplicationList from './Application/ApplicationList'
import ResumeViewer from './Application/ResumeViewer'
import UserDetails from './usermanage/UserDetails'
import PostJobForm from './Job/PostJobForm'
import AdminJobsList from './Job/AdminJobsList'

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
        <Route path='/userprofile/:id' element ={<UserDetails dark={darkMode}  />} />
        <Route path='/createTeckStack' element={<CreateTechStack dark={darkMode} />} />
        <Route path='/techstack' element ={<AdminTechStackList dark={darkMode} />} />
        {/* <Route path='/addnewcourse' element={<AddEditCourse dark={darkMode} />} /> */}

        <Route path='/create/course' element={<CreateUpdate dark={darkMode} />} />
        <Route path='/courselist' element={<CourseList dark={darkMode} />} />
        <Route path='/profile' element={<AdminProfile dark={darkMode} />} />

        {/* ads */}
        <Route path='/create/ads' element={<CreateAdPage dark={darkMode} />} />
        <Route path='/adslist' element={<AdsListPage dark={darkMode} />} />

        {/* books */}
        <Route path='/create/books' element={<UploadBookForm dark={darkMode} />} />
        <Route path='/bookslist' element={<BookListPage dark={darkMode} />} />
        <Route path="/pdfbooks/:publicId" element={<PdfBookReader />} />

        {/* Test */}
        <Route path="/test/addquestion/:testId" element={<AddQuestion />} />
        <Route path="/testlist" element={<TestList />} />

        {/********************job Routes *********************/}
        <Route path='/addcompany' element={<AddCompany dark={darkMode} />} />
        <Route path='/joblist' element={<AdminJobsList dark={darkMode} />} />
        <Route path='/applicationlist' element={<ApplicationList dark={darkMode} />} />
        <Route path='/resume/:publicId' element={<ResumeViewer dark={darkMode} />} />
        <Route path='/postjob' element={<PostJobForm dark={darkMode} />} />
        {/* <Route path='/create/ads' element={<CreateTechStack dark={darkMode} />} /> */}
    </Routes>
    </div>
    </div>
    {/* </div> */}
    </>
  )
}

export default AdminPages
import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom'
import {PrivateRoute,PublicRoute} from "./Auth/ProtectRoute"
import Home from "./PublicPages/Home"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
// import Navbar from "../Components/Navbar"
// import Footer from "../Components/Footer"
import Footer from '../Components/PublicComp/Footer';
import StudentPages from './Students/StudentPages'
import AdminPages from './Admin/AdminPages'
import UnauthorizedAccess from './shared/UnauthorizedAccess'
import InternalError from './shared/InternalError'
import MaintenancePage from './shared/MaintenancePage'
import NotFound from './shared/NotFound'
import TechCategoryPage from './PublicPages/TechCategoryPage'
import TechSubCategoryPage from './PublicPages/TechSubCategoryPage'
import TechStackPage from './PublicPages/TechStackPage'
import ForgetPassword from './Auth/ForgotPassword'
import OtpVerification from './Auth/OtpVerification';
import OtpForgetVerification from './Auth/OtpForgetVerification';
import ResetPassword from './Auth/ResetPassword';
import About from './PublicPages/About';
import Contact from './PublicPages/Contact';
// import AddEditCourse from './Admin/course/AddEditCourse';
import CreateUpdate from './Admin/course/CreateUpdate';
import CourseList from './Admin/course/CourseList';
import ELibrary from './Admin/eLibrary/ELibrary';
import EbookDetails from './Admin/eLibrary/EbookDetails';
import EbookViewerPage from './Admin/eLibrary/EbookViewerPage';
import Header from '../Components/PublicComp/Header';
import FlipBook from '../Components/FlipBook';
import UploadBookForm from './Admin/EBooks/UploadBookForm';
import PdfBookReader from './PdfBookReader/PdfBookReader';
import CreateAdPage from './Admin/Ads/CreateAdPage';
import AdsListPage from './Admin/Ads/AdsListPage';
import BookListPage from './Admin/EBooks/BookListPage';
import AddQuestion from './Admin/test/AddQuestion';
import CreateTest from './Admin/test/CreateTest';
import TakeTest from './Students/test/TakeTest';
import TestList from './Admin/test/TestList';
import TestAttempt from './Admin/test/TestAttempt';
import CodeEditorPage from './Students/Editor/CodeEditorPage';
import JobPortal from './PublicPages/JobPortal';
import AskToAI from './PublicPages/AskToAI';
const MainPage = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
     <Routes>
        <Route path='/*' element={
            <PublicRoute >
              {/* <Navbar /> */}
              <Header />
                <Routes>
                  {/*********************Auth Routes *********************/}
                    <Route path="/signin" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path='/unauthorized' element={<UnauthorizedAccess />} />
                    <Route path="/not-authorized" element={<UnauthorizedAccess />} />
                     <Route path="/internalerror" element={<InternalError />} />
                    <Route path="/maintanance" element={<MaintenancePage />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/email-verify" element={<OtpVerification />} />
                    <Route path="/otp-forget-verification" element={<OtpForgetVerification />} />
                    <Route path='/reset-password' element={<ResetPassword />} />

                  {/*********************Public Routes *********************/}
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/" element={<Home />} />
                   
                  {/*********************Public Courses Routes *********************/}
                    <Route path='/techstack' element ={<TechStackPage />} />
                    <Route path="/techstack/:categoryId" element={<TechCategoryPage />} />
                    <Route path="/techstack/:categoryId/:subcategoryName" element={<TechSubCategoryPage />} />
                    {/* <Route path='/course' element={<AddEditCourse />} /> */}



                  {/****************************Student Routes *********************/}
                  <Route path="/codeeditor" element={<CodeEditorPage />} />
                  <Route path="/pdfbooks/:publicId" element={<PdfBookReader />} />
                  <Route path="/testattempt/:bookId" element={<TestAttempt />} />
                  <Route path="/jobportal" element={<JobPortal />} />
                  <Route path="/asktoai" element={<AskToAI />} />

                  {/*********************Admin Courses Routes *********************/}

                    {/* Working pages but not intigrate with api */}
                    {/* <Route path='/ebooks' element={<ELibrary />} /> // not use now */}
                    {/* <Route path='/ebooks/detail' element={<EbookDetails />} /> // not use now */}
                    {/* <Route path='/ebooks/viewer' element={<EbookViewerPage />} />  // not use now */}
                    {/* <Route path='/flipbook/:publicId' element={<FlipBook />} /> // not use now */}
                     {/* <Route path="/test/createtest" element={<CreateTest />} /> // not use now */}
                    {/* <Route path="/test/taketest/:testId" element={<TakeTest testId={window.location.pathname.split("/").pop()} />} /> // not use now */}


                    
                  
                </Routes>
              <Footer />
            </PublicRoute>
        } />
        <Route path='/student/*' element={
            <PrivateRoute role="student">
                <StudentPages />
            </PrivateRoute>
        }/>
        <Route path='/admin/*' element={
            <PrivateRoute role="admin">
                <AdminPages />
            </PrivateRoute>
        }/>
    </Routes> 
    </>
  )
}

export default MainPage

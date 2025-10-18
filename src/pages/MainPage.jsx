import React from 'react'
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom'
import {PrivateRoute,PublicRoute} from "./Auth/ProtectRoute"
import Home from "./PublicPages/Home"
import Login from "../pages/Auth/Login"
import Register from "../pages/Auth/Register"
import Navbar from "../Components/Navbar"
import Footer from "../Components/Footer"
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
const MainPage = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
     <Routes>
        <Route path='/*' element={
            <PublicRoute >
              <Navbar />
                <Routes>
                    <Route path="/signin" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/" element={<Home />} />
                    <Route path='/unauthorized' element={<UnauthorizedAccess />} />
                    <Route path="/not-authorized" element={<UnauthorizedAccess />} />
                    <Route path="/internalerror" element={<InternalError />} />
                    <Route path="/maintanance" element={<MaintenancePage />} />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/email-verify" element={<OtpVerification />} />
                    <Route path="/otp-forget-verification" element={<OtpForgetVerification />} />
                    <Route path='/reset-password' element={<ResetPassword />} />
                    <Route path='/techstack' element ={<TechStackPage />} />
                    <Route path="/techstack/:categoryId" element={<TechCategoryPage />} />
                    <Route path="/techstack/:categoryId/:subcategoryName" element={<TechSubCategoryPage />} />
                    
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

import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'
import Banner from './components/Banner'
import MedicalServices from './components/MedicalServices'
import TopDoctors from './components/TopDoctors'
import Testimonials from './components/Testimonials'
import CallToAction from './components/CallToAction'
import { AppContext } from './context/AppContext'
import { useContext } from 'react'
import Features from './components/Features'
import DoctorContextProvider from './context/DoctorContext'
import MedicalRecords from './pages/MedicalRecords'

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />
      <DoctorContextProvider>
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path='/' element={
              <div className="flex flex-col space-y-0">
                <Banner />
                <Features />
                <MedicalServices />
                <TopDoctors />
                <Testimonials />
                <CallToAction />
              </div>
            } />
            <Route path='/home' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:speciality' element={<Doctors />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/appointment/:docId' element={
              <ProtectedRoute>
                <Appointment />
              </ProtectedRoute>
            } />
            <Route path='/my-appointments' element={
              <ProtectedRoute>
                <MyAppointments />
              </ProtectedRoute>
            } />
            <Route path='/my-profile' element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            } />
            <Route path='/verify' element={<Verify />} />
            <Route path='/medical-records' element={<MedicalRecords />} />
          </Routes>
        </main>
      </DoctorContextProvider>
      <Footer />
    </div>
  )
}

export default App
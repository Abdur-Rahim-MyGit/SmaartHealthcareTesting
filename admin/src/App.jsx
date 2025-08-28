import React, { useContext } from 'react';
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './components/Layout';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import AddPatient from './pages/Admin/AddPatient';
import DoctorsList from './pages/Admin/DoctorsList';
import PatientsList from './pages/Admin/PatientsList';
import PatientDetails from './pages/Admin/PatientDetails';
import ClinicalRecords from './pages/Admin/ClinicalRecords';
import Login from './pages/Login';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DoctorPatientsList from './pages/Doctor/PatientsList';
import DoctorPatientDetails from './pages/Doctor/PatientDetails';

const AdminRoute = ({ children }) => {
  const { aToken } = useContext(AdminContext);
  if (!aToken) {
    return <Navigate to="/" />;
  }
  return children;
};

const DoctorRoute = ({ children }) => {
  const { dToken } = useContext(DoctorContext);
  if (!dToken) {
    return <Navigate to="/" />;
  }
  return children;
};

const App = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  return (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      {(dToken || aToken) ? (
        <Layout>
          <Routes>
            {/* Admin Routes */}
            <Route path='/' element={aToken ? <Navigate to="/admin-dashboard" /> : <Navigate to="/doctor-dashboard" />} />
            <Route path='/admin-dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} />
            <Route path='/all-appointments' element={<AdminRoute><AllAppointments /></AdminRoute>} />
            <Route path='/add-doctor' element={<AdminRoute><AddDoctor /></AdminRoute>} />
            <Route path='/add-patient' element={<AdminRoute><AddPatient /></AdminRoute>} />
            <Route path='/doctor-list' element={<AdminRoute><DoctorsList /></AdminRoute>} />
            <Route path='/patients-list' element={<AdminRoute><PatientsList /></AdminRoute>} />
            <Route path='/clinical-records' element={<AdminRoute><ClinicalRecords /></AdminRoute>} />
            <Route path='/patient-details/:patientId' element={<AdminRoute><PatientDetails /></AdminRoute>} />
            
            {/* Doctor Routes */}
            <Route path='/doctor-dashboard' element={<DoctorRoute><DoctorDashboard /></DoctorRoute>} />
            <Route path='/doctor-appointments' element={<DoctorRoute><DoctorAppointments /></DoctorRoute>} />
            <Route path='/doctor-profile' element={<DoctorRoute><DoctorProfile /></DoctorRoute>} />
            <Route path='/doctor/patients-list' element={<DoctorRoute><DoctorPatientsList /></DoctorRoute>} />
            <Route path='/doctor/patient-details/:patientId' element={<DoctorRoute><DoctorPatientDetails /></DoctorRoute>} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path='*' element={<Login />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
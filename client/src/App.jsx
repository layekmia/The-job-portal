
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Application from "./pages/Application";
import RecruterLogin from "./components/RecruterLogin";
import { useApp } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJob from "./pages/ManageJob";
import ViewApplication from "./pages/ViewApplication";
import 'quill/dist/quill.snow.css'

export default function App() {
  const {showRecruterLogin} = useApp();


  return (
    <div>
      {showRecruterLogin && <RecruterLogin/>}
      <Routes>
        <Route  path="/" element={<Home/>}/>
        <Route  path="/apply-job/:id" element={<ApplyJob/>}/>
        <Route  path="/application" element={<Application/>}/>
        <Route path="/dashboard" element={<Dashboard/>} >
          <Route path="add-job" element={<AddJob/>}/>
          <Route index={true} element={<Navigate replace={true} to='manage-jobs'/>}/>
          <Route path="manage-jobs" element={<ManageJob/>}/>
          <Route path="view-applications" element={<ViewApplication/>}/>
        </Route>
      </Routes>
    </div>
  );
}
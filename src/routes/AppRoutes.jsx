import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Skills from "../pages/Skills";
import Projects from "../pages/Projects";
import Experience from "../pages/Experience";
import Contact from "../pages/Contact";
import Login from "../pages/admin/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import ManageAll from "../pages/ManageAll";
import ManageProjects from "../pages/admin/ManageProjects";
import ManageSkills from "../pages/admin/ManageSkills";
import ManageExperience from "../pages/admin/ManageExperience";
import ManageMessages from "../pages/admin/ManageMessages";
import ProfileUpload from "../pages/admin/ProfileUpload";
import ResumeUpload from "../pages/admin/ResumeUpload";
// import Test from "../pages/Test";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/contact" element={<Contact />} />
      {/* <Route path="/test" element={<Test />} /> */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manageall"
        element={
          <ProtectedRoute>
            <ManageAll />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects"
        element={
          <ProtectedRoute>
            <ManageProjects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <ProtectedRoute>
            <ManageSkills />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/experience"
        element={
          <ProtectedRoute>
            <ManageExperience />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <ManageMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <ProfileUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/resume"
        element={
          <ProtectedRoute>
            <ResumeUpload />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;

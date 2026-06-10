import { useState } from "react";
import ProfileUpload from "./admin/ProfileUpload";
import ResumeUpload from "./admin/ResumeUpload";
import ManageProjects from "./admin/ManageProjects";
import ManageSkills from "./admin/ManageSkills";
import ManageExperience from "./admin/ManageExperience";
import ManageMessages from "./admin/ManageMessages";

const tabs = [
  {
    key: "profile",
    label: "Profile",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    key: "resume",
    label: "Resume",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    key: "projects",
    label: "Projects",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      </svg>
    ),
  },
  {
    key: "skills",
    label: "Skills",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
  },
  {
    key: "experience",
    label: "Experience",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    key: "messages",
    label: "Messages",
    icon: (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

function ManageAll() {
  const [activePage, setActivePage] = useState("profile");

  return (
    <section className="min-h-screen bg-gray-950 pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-indigo-400 text-xs font-medium tracking-widest uppercase mb-2">
            Admin Panel
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Manage All
          </h1>
        </div>

        {/* Tab bar — scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActivePage(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                activePage === key
                  ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/40"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:bg-white/10"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Active panel */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="absolute -top-px left-16 right-16 h-px bg-linear-to-r from-transparent via-indigo-500/50 to-transparent" />
          {activePage === "profile" && <ProfileUpload />}
          {activePage === "resume" && <ResumeUpload />}
          {activePage === "projects" && <ManageProjects />}
          {activePage === "skills" && <ManageSkills />}
          {activePage === "experience" && <ManageExperience />}
          {activePage === "messages" && <ManageMessages />}
        </div>
      </div>
    </section>
  );
}

export default ManageAll;

import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

const skills = ["React", "ASP.NET Core Web API", "SQL Server"];

function Home() {
  const [profile, setProfile] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getProfile();
      setProfile(data);
      setTimeout(() => setVisible(true), 100);
    };
    load();
  }, []);

  if (!profile)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            Loading...
          </p>
        </div>
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-950 flex items-center justify-center px-6 py-24 overflow-hidden relative">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-indigo-500/10 blur-2xl" />
      </div>

      <div
        className={`relative z-10 flex flex-col items-center text-center gap-8 transition-all duration-1000 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Avatar */}
        <div
          className={`relative group transition-all duration-700 delay-100 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <div className="absolute -inset-1 rounded-full bg-linear-to-tr from-cyan-500 to-indigo-500 opacity-60 blur-sm group-hover:opacity-100 transition duration-500" />
          <img
            src={profile.imageUrl}
            alt={profile.name}
            className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-gray-900 shadow-2xl"
          />
          <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 border-2 border-gray-950 rounded-full animate-pulse" />
        </div>

        {/* Name */}
        <div
          className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-white via-cyan-100 to-cyan-300 bg-clip-text text-transparent">
            {profile.name}
          </h1>
        </div>

        {/* Title */}
        <div
          className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-lg md:text-xl text-cyan-400 font-medium tracking-wide">
            {profile.title}
          </p>
        </div>

        {/* Skill badges */}
        <div
          className={`flex flex-wrap justify-center gap-3 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {skills.map((s) => (
            <span
              key={s}
              className="px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 border border-white/25 text-gray-200 hover:border-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300 cursor-default"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-linear-to-r from-transparent via-cyan-500 to-transparent" />

        {/* CTA */}
        <div
          className={`transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl.replace(
                "/upload/",
                "/upload/fl_attachment/",
              )}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide
    bg-linear-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/25
    hover:shadow-cyan-500/50 hover:scale-105 active:scale-100 transition-all duration-300"
            >
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M8 12l4 4m0 0l4-4m-4 4V4"
                />
              </svg>
              Download Resume
            </a>
          ) : (
            <button
              disabled
              className="group inline-flex items-center gap-3 ... opacity-50 cursor-not-allowed"
            >
              Resume Not Available
            </button>
          )}
        </div>

        {/* Scroll hint */}
        <div
          className={`mt-2 flex flex-col items-center gap-2 transition-all duration-700 delay-700 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-xs text-gray-600 tracking-widest uppercase">
            Scroll to explore
          </span>
          <div className="w-px h-8 bg-linear-to-b from-gray-600 to-transparent animate-bounce" />
        </div>
      </div>
    </section>
  );
}

export default Home;

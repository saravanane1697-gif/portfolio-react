import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

function About() {
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
        <div className="w-10 h-10 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-950 pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
            About Me
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {profile.name}
          </h1>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-linear-to-r from-cyan-500/50 to-transparent" />
            <span className="text-cyan-400 font-medium text-sm">
              {profile.title}
            </span>
          </div>
        </div>

        {/* Bio card */}
        <div
          className={`relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-700 delay-200 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {/* Glow */}
          <div className="absolute -top-px left-12 right-12 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

          <p className="text-gray-300 text-lg leading-relaxed">
            {profile.aboutMe}
          </p>
        </div>

        {/* Tech stack badges */}
        <div
          className={`mt-10 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-gray-500 text-sm mb-4 tracking-wider uppercase">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              "React",
              "ASP.NET Core Web API",
              "SQL Server",
              "Tailwind CSS",
              "C#",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-gray-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

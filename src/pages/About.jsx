import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const contactLinks = [
  {
    key: "email",
    icon: <MailIcon />,
    label: "Email",
    href: (val) => `mailto:${val}`,
  },
  {
    key: "phone",
    icon: <PhoneIcon />,
    label: "Phone",
    href: (val) => `tel:${val}`,
  },
  {
    key: "linkedInUrl",
    icon: <LinkedInIcon />,
    label: "LinkedIn",
    href: (val) => val,
  },
  {
    key: "gitHubUrl",
    icon: <GitHubIcon />,
    label: "GitHub",
    href: (val) => val,
  },
];

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

        {/* Contact links */}
        <div
          className={`mt-10 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-gray-500 text-sm mb-4 tracking-wider uppercase">
            Contact
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contactLinks.map(({ key, icon, label, href }) => {
              const value = profile[key];
              if (!value) return null;
              return (
                <a
                  key={key}
                  href={href(value)}
                  target={
                    key === "linkedInUrl" || key === "gitHubUrl"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    key === "linkedInUrl" || key === "gitHubUrl"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-200"
                >
                  <span className="text-gray-500 group-hover:text-cyan-400 transition-colors duration-200 shrink-0">
                    {icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs tracking-wider uppercase mb-0.5">
                      {label}
                    </p>
                    <p className="text-gray-300 group-hover:text-cyan-300 text-sm transition-colors duration-200 truncate">
                      {value}
                    </p>
                  </div>
                  {/* Arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 ml-auto text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 7h10v10" />
                    <path d="M7 17 17 7" />
                  </svg>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

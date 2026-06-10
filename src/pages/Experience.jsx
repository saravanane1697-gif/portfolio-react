import { useEffect, useState } from "react";
import { getExperiences } from "../services/experienceService";

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getExperiences();
      setExperiences(data);
      setTimeout(() => setVisible(true), 100);
    };
    load();
  }, []);

  return (
    <section className="min-h-screen bg-gray-950 pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div
          className={`mb-14 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
            My Journey
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Experience
          </h1>
        </div>

        {experiences.length === 0 ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-2 bottom-2 w-px bg-linear-to-b from-cyan-500/60 via-indigo-500/40 to-transparent" />

            <div className="space-y-8 pl-14">
              {experiences.map((exp, i) => (
                <div
                  key={exp.id}
                  className={`relative transition-all duration-700 ${
                    visible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-10 top-6 w-3 h-3 rounded-full bg-cyan-400 border-2 border-gray-950 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />

                  <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-white font-semibold text-lg group-hover:text-cyan-300 transition-colors duration-200">
                          {exp.company}
                        </h3>
                        <p className="text-cyan-400 text-sm font-medium">
                          {exp.role}
                        </p>
                      </div>
                      <span className="shrink-0 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium">
                        {exp.duration}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Experience;

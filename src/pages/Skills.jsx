import { useEffect, useState } from "react";
import { getSkills } from "../services/skillService";

const categoryColors = {
  Frontend: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
  Backend:
    "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400",
  Database:
    "from-violet-500/20 to-violet-500/5 border-violet-500/30 text-violet-400",
  DevOps:
    "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
  default: "from-gray-500/20 to-gray-500/5 border-gray-500/30 text-gray-300",
};

function Skills() {
  const [skills, setSkills] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await getSkills();
      setSkills(data);
      setTimeout(() => setVisible(true), 100);
    };
    load();
  }, []);

  // Group by category
  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section className="min-h-screen bg-gray-950 pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={`mb-14 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-cyan-400 text-sm font-medium tracking-widest uppercase mb-3">
            What I know
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Skills</h1>
        </div>

        {skills.length === 0 ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, items], gi) => {
              const colorClass =
                categoryColors[category] || categoryColors.default;
              return (
                <div
                  key={category}
                  className={`flex flex-col items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${gi * 100}ms` }}
                >
                  <h2 className="text-gray-400 text-sm font-semibold tracking-widest uppercase mb-5">
                    {category}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-3">
                    {items.map((skill) => (
                      <div
                        key={skill.id}
                        className={`px-5 py-3 rounded-xl bg-linear-to-br ${colorClass} border font-medium text-sm hover:scale-105 transition-all duration-200 cursor-default`}
                      >
                        {skill.skillName}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Skills;

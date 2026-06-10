import { useEffect, useState } from "react";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../services/skillService";

const empty = { skillName: "", category: "" };
const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-cyan-500/60 focus:bg-white/10 transition-all duration-200";

function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(empty);

  const refreshSkills = () => getSkills().then((data) => setSkills(data));

  useEffect(() => {
    getSkills().then((data) => setSkills(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) await updateSkill(editingId, formData);
    else await createSkill(formData);
    setFormData(empty);
    setEditingId(null);
    refreshSkills();
  };

  const handleEdit = (s) => {
    setEditingId(s.id);
    setFormData({ skillName: s.skillName, category: s.category });
  };
  const handleCancel = () => {
    setFormData(empty);
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Manage Skills</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 mb-8 p-5 rounded-xl border border-white/10 bg-white/5"
      >
        <h3 className="text-sm font-medium text-gray-400 mb-4">
          {editingId ? "✏️ Edit Skill" : "➕ Add New Skill"}
        </h3>
        <input
          className={inputClass}
          placeholder="Skill Name"
          value={formData.skillName}
          onChange={(e) =>
            setFormData({ ...formData, skillName: e.target.value })
          }
          required
        />
        <input
          className={inputClass}
          placeholder="Category (e.g. Frontend, Backend)"
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          required
        />
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${editingId ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25" : "bg-linear-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02]"}`}
          >
            {editingId ? "Update Skill" : "Add Skill"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2.5 rounded-xl text-sm text-gray-400 border border-white/10 hover:bg-white/5 transition-all duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <p className="text-gray-500 text-sm py-8 w-full text-center">
            No skills yet.
          </p>
        ) : (
          skills.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-200"
            >
              <div>
                <span className="text-white text-sm font-medium">
                  {s.skillName}
                </span>
                <span className="ml-2 text-xs text-gray-500">{s.category}</span>
              </div>
              <button
                onClick={() => handleEdit(s)}
                className="ml-1 p-1 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => deleteSkill(s.id).then(refreshSkills)}
                className="p-1 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageSkills;

import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/projectService";

const empty = { title: "", description: "", gitHubUrl: "", demoUrl: "" };
const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-cyan-500/60 focus:bg-white/10 transition-all duration-200";

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(empty);

  const refreshProjects = () => getProjects().then((data) => setProjects(data));

  useEffect(() => {
    getProjects().then((data) => setProjects(data));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) await updateProject(editingId, formData);
    else await createProject(formData);
    setFormData(empty);
    setEditingId(null);
    refreshProjects();
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setFormData({
      title: p.title,
      description: p.description,
      gitHubUrl: p.gitHubUrl,
      demoUrl: p.demoUrl,
    });
  };
  const handleDelete = async (id) => {
    if (window.confirm("Delete this project?")) {
      await deleteProject(id);
      refreshProjects();
    }
  };
  const handleCancel = () => {
    setFormData(empty);
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Manage Projects</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 mb-8 p-5 rounded-xl border border-white/10 bg-white/5"
      >
        <h3 className="text-sm font-medium text-gray-400 mb-4">
          {editingId ? "✏️ Edit Project" : "➕ Add New Project"}
        </h3>
        <input
          className={inputClass}
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          className={`${inputClass} resize-none`}
          rows="3"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="gitHubUrl"
          placeholder="GitHub URL"
          value={formData.gitHubUrl}
          onChange={handleChange}
        />
        <input
          className={inputClass}
          name="demoUrl"
          placeholder="Demo URL"
          value={formData.demoUrl}
          onChange={handleChange}
        />
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${editingId ? "bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25" : "bg-linear-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02]"}`}
          >
            {editingId ? "Update Project" : "Add Project"}
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
      <div className="space-y-3">
        {projects.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            No projects yet.
          </p>
        ) : (
          projects.map((p) => (
            <div
              key={p.id}
              className="flex items-start justify-between gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-200"
            >
              <div className="min-w-0">
                <h4 className="text-white font-medium text-sm mb-1">
                  {p.title}
                </h4>
                <p className="text-gray-400 text-xs line-clamp-2">
                  {p.description}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageProjects;

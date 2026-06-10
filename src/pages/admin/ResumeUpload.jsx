import { useState } from "react";
import { uploadResume } from "../../services/profileService";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-cyan-500/60 focus:bg-white/10 transition-all duration-200";

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a resume file first.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      await uploadResume(file);
      setStatus("success");
      setMessage("Resume uploaded successfully!");
      setFile(null);
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setMessage(error.response?.data || error.message || "Upload failed.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Upload Resume</h2>

      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-white/20 bg-white/5">
          <svg
            className="w-8 h-8 text-gray-500 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-400 mb-1">
              Accepted formats: PDF, DOC, DOCX
            </p>
            {file && (
              <p className="text-xs text-cyan-400 truncate">{file.name}</p>
            )}
          </div>
        </div>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className={inputClass}
        />

        <button
          onClick={handleUpload}
          disabled={status === "loading"}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-linear-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
        >
          {status === "loading" ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Uploading...
            </span>
          ) : (
            "Upload Resume"
          )}
        </button>

        {status === "success" && (
          <p className="text-emerald-400 text-sm bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3">
            {message}
          </p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;

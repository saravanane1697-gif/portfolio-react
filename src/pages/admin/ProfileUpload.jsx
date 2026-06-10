import { useState } from "react";
import { uploadProfilePhoto } from "../../services/profileService";

function ProfileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) setPreview(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select an image first.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const result = await uploadProfilePhoto(file);
      console.log(result);
      setStatus("success");
      setMessage("Profile photo uploaded successfully!");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setMessage(error.response?.data || error.message || "Upload failed.");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-cyan-500/60 focus:bg-white/10 transition-all duration-200";

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">
        Upload Profile Photo
      </h2>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Preview */}
        <div className="shrink-0">
          <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-white/20 overflow-hidden bg-white/5 flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
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
              "Upload Photo"
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
    </div>
  );
}

export default ProfileUpload;

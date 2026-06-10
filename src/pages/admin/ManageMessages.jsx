import { useEffect, useState } from "react";
import {
  getMessages,
  deleteMessage,
  markAsRead,
} from "../../services/contactService";

function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshMessages = () =>
    getMessages().then((data) => {
      setMessages(data);
      setLoading(false);
    });

  useEffect(() => {
    getMessages().then((data) => {
      setMessages(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" />
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Contact Messages</h2>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
          {messages.length} total
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="w-12 h-12 text-gray-700 mx-auto mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          <p className="text-gray-500 text-sm">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 rounded-xl border transition-all duration-200 ${
                msg.isRead
                  ? "border-white/10 bg-white/5"
                  : "border-cyan-500/20 bg-cyan-500/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-cyan-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                    {msg.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{msg.name}</p>
                    <p className="text-gray-500 text-xs">{msg.email}</p>
                  </div>
                </div>
                {!msg.isRead && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shrink-0">
                    New
                  </span>
                )}
              </div>

              <p className="text-gray-300 text-sm font-medium mb-1">
                {msg.subject}
              </p>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {msg.message}
              </p>

              <div className="flex gap-2">
                {!msg.isRead && (
                  <button
                    onClick={() => markAsRead(msg.id).then(refreshMessages)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-200"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Mark Read
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(msg.id).then(refreshMessages)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all duration-200"
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
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageMessages;

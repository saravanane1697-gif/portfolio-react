import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboardService";
import { Link } from "react-router-dom";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getDashboardStats();

    setStats(data);
  };

  if (!stats) return <h3>Loading...</h3>;

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center mb-3">
            <div className="card-body">
              <h3>{stats.projectsCount}</h3>
              <p>Projects</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center mb-3">
            <div className="card-body">
              <h3>{stats.skillsCount}</h3>
              <p>Skills</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center mb-3">
            <div className="card-body">
              <h3>{stats.experiencesCount}</h3>
              <p>Experiences</p>
            </div>
          </div>
        </div>

        <li>
          <Link to="/admin/resume">Upload Resume</Link>
        </li>

        <div className="col-md-6">
          <div className="card text-center mb-3">
            <div className="card-body">
              <h3>{stats.messagesCount}</h3>
              <p>Total Messages</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card text-center mb-3">
            <div className="card-body">
              <h3>{stats.unreadMessagesCount}</h3>
              <p>Unread Messages</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

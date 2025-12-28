import { useEffect, useState } from "react";
import { fetchRandomUser } from "./api/userApi";
import type { User } from "./types/user";
import "./App.css";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError(null);

        const fetchedUser = await fetchRandomUser();
        setUser(fetchedUser);
      } catch {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [refreshKey]);

  const refreshUser = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="page">
      <div className="panel">
        <h1 className="main-title">User</h1>

        {loading && <p className="loading">Fetching user…</p>}

        {error && <p className="error">{error}</p>}

        {user && !loading && !error && (
          <>
            <h1 className="panel-title">Name</h1>
            <div className="input-box active">
              <span className="icon">👤</span>
              <span className="text">{user.fullName}</span>
            </div>

            <h1 className="panel-title">Email Address</h1>
            <div className="input-box">
              <span className="icon">✉️</span>
              <span className="text">{user.email}</span>
            </div>
          </>
        )}

        <button
          className="login-btn"
          onClick={refreshUser}
          disabled={loading}
        >
          Refresh User
        </button>
      </div>
    </div>
  );
};

export default App;

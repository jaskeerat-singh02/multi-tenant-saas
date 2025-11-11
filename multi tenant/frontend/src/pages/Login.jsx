import { useState } from "react";

function Login() {
  const [tenant, setTenant] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!tenant) {
        alert("Please enter tenant ID");
        return;
      }

      // ✅ Backend uses tenant as subdomain → tenant1.localhost:5000
      const url = `http://${tenant}.localhost:5000/api/auth/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.token) {
        // ✅ Save token + tenant ID
        localStorage.setItem("token", data.token);
        localStorage.setItem("tenant", tenant);

        alert("Login successful!");

        // ✅ Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Network or server error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input
        placeholder="Tenant subdomain (example: tenant1)"
        value={tenant}
        onChange={(e) => setTenant(e.target.value)}
      /><br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;

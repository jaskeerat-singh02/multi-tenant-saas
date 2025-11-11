import { useState } from "react";

export default function RegisterTenant() {
  const [tenantId, setTenantId] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/tenants/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tenantId, name }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register New Tenant</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Tenant ID"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Tenant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Create Tenant</button>
      </form>

      <p>{message}</p>
    </div>
  );
}

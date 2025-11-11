import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tenantInfo, setTenantInfo] = useState(null);
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState("");

  const token = localStorage.getItem("token");
  const tenant = localStorage.getItem("tenant");

  // ✅ If not logged in → redirect
  if (!token || !tenant) {
    window.location.href = "/login";
  }

  // ✅ Create base API URL for this tenant
  const BASE_URL = `http://${tenant}.localhost:5000`;

  // ✅ Load tenant info
  useEffect(() => {
    fetch(`${BASE_URL}/api/tenants`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTenantInfo(data);

        // ✅ Apply theme colors
        if (data.theme) {
          document.body.style.background = data.theme.primaryColor;
          document.body.style.color = data.theme.secondaryColor;
        }
      });
  }, []);

  // ✅ Load resources
  useEffect(() => {
    fetch(`${BASE_URL}/api/resources`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  // ✅ Add a new resource
  const addResource = () => {
    fetch(`${BASE_URL}/api/resources`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newResource }),
    })
      .then((res) => res.json())
      .then((item) => {
        setResources([item, ...resources]);
        setNewResource("");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Dashboard</h2>

      {tenantInfo && (
        <p><b>Tenant:</b> {tenantInfo.name}</p>
      )}

      <h3>Add Resource</h3>
      <input
        value={newResource}
        onChange={(e) => setNewResource(e.target.value)}
        placeholder="Resource name"
      />
      <button onClick={addResource}>Add</button>

      <h3>Resources</h3>
      <ul>
        {resources.map((item) => (
          <li key={item._id}>{item.name}</li>
        ))}
      </ul>

      <br/>
      <button onClick={() => {
        localStorage.clear();
        window.location.href = "/login";
      }}>
        Logout
      </button>
    </div>
  );
}

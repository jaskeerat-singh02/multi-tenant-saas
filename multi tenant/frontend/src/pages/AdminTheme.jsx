import { useEffect, useState } from "react";

export default function AdminTheme() {
  const token = localStorage.getItem("token");
  const tenant = localStorage.getItem("tenant");

  if (!token) {
    window.location.href = "/login";
  }

  const BASE_URL = `http://${tenant}.localhost:5000`;

  const [theme, setTheme] = useState({
    primaryColor: "",
    secondaryColor: "",
    font: "",
    logo: ""
  });

  // ✅ Load current theme
  useEffect(() => {
    fetch(`${BASE_URL}/api/tenants`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.theme) {
          setTheme(data.theme);
        }
      });
  }, []);

  // ✅ Update theme in backend
  const updateTheme = async () => {
    const res = await fetch(`${BASE_URL}/api/tenants/theme`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ theme }),
    });

    const data = await res.json();
    alert("Theme updated!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Theme Editor</h2>

      <label>Primary Color:</label><br />
      <input
        type="color"
        value={theme.primaryColor}
        onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
      />
      <br /><br />

      <label>Secondary Color:</label><br />
      <input
        type="color"
        value={theme.secondaryColor}
        onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
      />
      <br /><br />

      <label>Font:</label><br />
      <input
        type="text"
        value={theme.font}
        onChange={(e) => setTheme({ ...theme, font: e.target.value })}
      />
      <br /><br />

      <label>Logo URL:</label><br />
      <input
        type="text"
        value={theme.logo}
        onChange={(e) => setTheme({ ...theme, logo: e.target.value })}
      />
      <br /><br />

      <button onClick={updateTheme}>
        Save Theme
      </button>

      <br /><br />

      <button onClick={() => window.location.href = "/dashboard"}>
        Back to Dashboard
      </button>
    </div>
  );
}

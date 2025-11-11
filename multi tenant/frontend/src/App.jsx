import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import RegisterTenant from "./pages/RegisterTenant";
import Dashboard from "./pages/Dashboard";
import AdminTheme from "./pages/AdminTheme";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Multi-Tenant SaaS Dashboard</h1>

      {/* Navigation Menu */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register-tenant">Register Tenant</Link> |{" "}
        <Link to="/dashboard">Dashboard</Link> |{" "}
        <Link to="/admin-theme">Admin Theme</Link>
      </nav>

      {/* Page Routes */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register-tenant" element={<RegisterTenant />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-theme" element={<AdminTheme />} />
      </Routes>
    </div>
  );
}

export default App;

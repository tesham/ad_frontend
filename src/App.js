import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import PrivateRoute from "./components/common/ProtectedRoute";
import ResponsiveAppBar from "./components/common/TopBar";
import Dashboard from "./components/dashboard";
import AuditTable from "./components/audit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route
            path={"/"}
            element={
              <>
                <ResponsiveAppBar />
                <Dashboard />
              </>
            }
          />
          <Route
            path={"/audit"}
            element={
              <>
                <ResponsiveAppBar />
                <AuditTable />
              </>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

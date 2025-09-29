import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route 
             path="/dashboard"
             element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
             } />

          {/* Default redirect */}
          <Route path="*" element={<Login />}/>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
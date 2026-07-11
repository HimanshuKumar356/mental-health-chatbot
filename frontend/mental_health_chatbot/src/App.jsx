import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

      <AuthProvider>

          <BrowserRouter>

              <Routes>

                  <Route
                      path="/"
                      element={<Navigate to="/login" />}
                  />

                  <Route
                      path="/login"
                      element={<Login />}
                  />

                  <Route
                      path="/register"
                      element={<Register />}
                  />

                  <Route
                      path="/dashboard"
                      element={
                          <ProtectedRoute>
                              <Dashboard />
                          </ProtectedRoute>
                      }
                  />

                  <Route
                      path="/chat"
                      element={
                          <ProtectedRoute>
                              <Chat />
                          </ProtectedRoute>
                      }
                  />

                  <Route
                      path="/mood"
                      element={
                          <ProtectedRoute>
                              <Mood />
                          </ProtectedRoute>
                      }
                  />

                  <Route
                      path="/journal"
                      element={
                          <ProtectedRoute>
                              <Journal />
                          </ProtectedRoute>
                      }
                  />

                  <Route
                      path="/profile"
                      element={
                          <ProtectedRoute>
                              <Profile />
                          </ProtectedRoute>
                      }
                  />

              </Routes>

          </BrowserRouter>

      </AuthProvider>

  );
}

export default App;
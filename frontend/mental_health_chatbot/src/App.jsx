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
import MainLayout from "./layouts/MainLayout";

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
                      element={
                        <ProtectedRoute>
                          <MainLayout />
                        </ProtectedRoute>
                      }
                  >

                      <Route
                        path="/dashboard"
                        element={<Dashboard />}
                      />

                      <Route
                        path="/chat"
                        element={<Chat />}
                      />

                      <Route
                         path="/mood"
                         element={<Mood />}
                      />

                      <Route
                        path="/journal"
                        element={<Journal />}
                      />

                      <Route
                        path="/profile"
                        element={<Profile />}
                      />
                      
                      <Route

                        path="/chat"
                        element={<Chat />}
                      />

                </Route>
              </Routes>

          </BrowserRouter>

      </AuthProvider>

  );
}

export default App;
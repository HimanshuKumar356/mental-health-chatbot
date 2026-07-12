import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";

import Notification from "./components/Notification";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Mood from "./pages/Mood";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";

function App() {

    return (

        <AuthProvider>

            <NotificationProvider>

                <BrowserRouter>

                    <Notification />

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

                        </Route>

                    </Routes>

                </BrowserRouter>

            </NotificationProvider>

        </AuthProvider>

    );

}

export default App;
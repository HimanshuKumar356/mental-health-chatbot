import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { useNotification } from "../context/NotificationContext";

import "../styles/profile.css";

import {

    getProfile,

    updateProfile,

    changePassword

} from "../api/auth";

export default function Profile() {

    const navigate = useNavigate();

    const { logout } = useAuth();

    const { showNotification } = useNotification();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [editing, setEditing] = useState(false);

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const data = await getProfile();

            const profile = data.user || data;

            setUser(profile);

            setName(profile.name);

            setEmail(profile.email);

        }

        catch (err) {

            console.error(err);

            showNotification(

                "Unable to load profile.",

                "error"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleSave = async () => {

        try {

            const data = await updateProfile(

                name,

                email

            );

            const updatedUser = data.user || data;

            setUser(updatedUser);

            setName(updatedUser.name);

            setEmail(updatedUser.email);

            localStorage.setItem(

                "user",

                JSON.stringify(updatedUser)

            );

            setEditing(false);

            showNotification(

                "Profile updated successfully.",

                "success"

            );

        }

        catch (err) {

            showNotification(

                err.response?.data?.error ||

                "Failed to update profile.",

                "error"

            );

        }

    };

    const handlePasswordChange = async () => {

        if (

            !currentPassword ||

            !newPassword ||

            !confirmPassword

        ) {

            showNotification(

                "Please fill all password fields.",

                "error"

            );

            return;

        }

        if (

            newPassword !== confirmPassword

        ) {

            showNotification(

                "Passwords do not match.",

                "error"

            );

            return;

        }

        try {

            const data = await changePassword(

                currentPassword,

                newPassword

            );

            showNotification(

                data.message,

                "success"

            );

            setCurrentPassword("");

            setNewPassword("");

            setConfirmPassword("");

            setShowPasswordForm(false);

        }

        catch (err) {

            showNotification(

                err.response?.data?.error ||

                "Failed to change password.",

                "error"

            );

        }

    };

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    if (loading) {

        return (

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                    fontSize: "22px",
                    fontWeight: "bold"
                }}
            >

                Loading Profile...

            </div>

        );

    }

    return (

        <div className="profile-page">
    
            <h1>
    
                👤 My Profile
    
            </h1>
    
            <div className="profile-card">
    
                <div className="profile-avatar">
    
                    {
    
                        user?.name
    
                            ?.charAt(0)
    
                            .toUpperCase()
    
                    }
    
                </div>
    
                <div className="profile-info">
    
                    <div className="profile-item">
    
                        <label>
    
                            Name
    
                        </label>
    
                        {
    
                            editing
    
                            ?
    
                            <input
    
                                className="profile-input"
    
                                value={name}
    
                                onChange={(e)=>
    
                                    setName(e.target.value)
    
                                }
    
                            />
    
                            :
    
                            <p>
    
                                {user?.name}
    
                            </p>
    
                        }
    
                    </div>
    
                    <div className="profile-item">
    
                        <label>
    
                            Email
    
                        </label>
    
                        {
    
                            editing
    
                            ?
    
                            <input
    
                                className="profile-input"
    
                                value={email}
    
                                onChange={(e)=>
    
                                    setEmail(e.target.value)
    
                                }
    
                            />
    
                            :
    
                            <p>
    
                                {user?.email}
    
                            </p>
    
                        }
    
                    </div>
    
                    <div className="profile-item">
    
                        <label>
    
                            Member Since
    
                        </label>
    
                        <p>
    
                            {
    
                                user?.created_at
    
                                ?
    
                                new Date(
    
                                    user.created_at
    
                                ).toLocaleDateString()
    
                                :
    
                                "Not Available"
    
                            }
    
                        </p>
    
                    </div>
    
                </div>
    
                <div className="profile-actions">
    
                    {
    
                        editing
    
                        ?
    
                        <>
    
                            <button
    
                                className="primary-btn"
    
                                onClick={handleSave}
    
                            >
    
                                💾 Save
    
                            </button>
    
                            <button
    
                                className="secondary-btn"
    
                                onClick={() => {
    
                                    setEditing(false);
    
                                    setName(user.name);
    
                                    setEmail(user.email);
    
                                }}
    
                            >
    
                                Cancel
    
                            </button>
    
                        </>
    
                        :
    
                        <button
    
                            className="primary-btn"
    
                            onClick={() =>
    
                                setEditing(true)
    
                            }
    
                        >
    
                            ✏️ Edit Profile
    
                        </button>
    
                    }
    
                    <button
    
                        className="secondary-btn"
    
                        onClick={() =>
    
                            setShowPasswordForm(
    
                                !showPasswordForm
    
                            )
    
                        }
    
                    >
    
                        🔒 Change Password
    
                    </button>
    
                    <button
    
                        className="logout-btn"
    
                        onClick={handleLogout}
    
                    >
    
                        🚪 Logout
    
                    </button>
    
                </div>
    
                {
    
                    showPasswordForm &&
    
                    <div className="password-card">
    
                        <h3>
    
                            🔒 Change Password
    
                        </h3>
    
                        <input
    
                            type="password"
    
                            placeholder="Current Password"
    
                            value={currentPassword}
    
                            onChange={(e)=>
    
                                setCurrentPassword(
    
                                    e.target.value
    
                                )
    
                            }
    
                        />
    
                        <input
    
                            type="password"
    
                            placeholder="New Password"
    
                            value={newPassword}
    
                            onChange={(e)=>
    
                                setNewPassword(
    
                                    e.target.value
    
                                )
    
                            }
    
                        />
    
                        <input
    
                            type="password"
    
                            placeholder="Confirm New Password"
    
                            value={confirmPassword}
    
                            onChange={(e)=>
    
                                setConfirmPassword(
    
                                    e.target.value
    
                                )
    
                            }
    
                        />
    
                        <button
    
                            className="primary-btn"
    
                            onClick={handlePasswordChange}
    
                        >
    
                            Update Password
    
                        </button>
    
                    </div>
    
                }
    
            </div>
    
        </div>
    
    );
    
    }
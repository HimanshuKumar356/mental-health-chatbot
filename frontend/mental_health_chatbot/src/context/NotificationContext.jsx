import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {

    const [notification, setNotification] = useState({

        open: false,

        message: "",

        severity: "success"

    });

    const showNotification = (

        message,

        severity = "success"

    ) => {

        setNotification({

            open: true,

            message,

            severity

        });

    };

    const closeNotification = () => {

        setNotification((prev) => ({

            ...prev,

            open: false

        }));

    };

    return (

        <NotificationContext.Provider

            value={{

                showNotification,

                notification,

                closeNotification

            }}

        >

            {children}

        </NotificationContext.Provider>

    );

}

export const useNotification = () =>

    useContext(NotificationContext);
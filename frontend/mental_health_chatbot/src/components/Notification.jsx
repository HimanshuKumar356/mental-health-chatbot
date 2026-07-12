import Snackbar from "@mui/material/Snackbar";

import Alert from "@mui/material/Alert";

import { useNotification } from "../context/NotificationContext";

export default function Notification() {

    const {

        notification,

        closeNotification

    } = useNotification();

    return (

        <Snackbar

            open={notification.open}

            autoHideDuration={3000}

            onClose={closeNotification}

            anchorOrigin={{

                vertical: "top",

                horizontal: "right"

            }}

        >

            <Alert

                onClose={closeNotification}

                severity={notification.severity}

                variant="filled"

                sx={{

                    width: "100%",

                    minWidth: "320px",

                    fontWeight: 500,

                    borderRadius: "12px"

                }}

            >

                {notification.message}

            </Alert>

        </Snackbar>

    );

}
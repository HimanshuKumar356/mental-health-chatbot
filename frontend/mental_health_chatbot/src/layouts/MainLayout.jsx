import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";

import Navbar from "../components/Navbar";

export default function MainLayout(){

    return(

        <div
            style={{
                display:"flex",
                minHeight:"100vh",
                background:"#f4f7fb"
            }}
        >

            <Sidebar/>

            <div
                style={{
                    flex:1,
                    display:"flex",
                    flexDirection:"column"
                }}
            >

                <Navbar/>

                <Outlet/>

            </div>

        </div>

    );

}
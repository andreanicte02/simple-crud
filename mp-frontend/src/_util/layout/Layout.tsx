import './layout.style.css';
import {useState} from "react";
import Sidebar from "../components/SideBar/SideBar.tsx";
import HeadBar from "../components/HeadBar/HeadBar.tsx";
import {Outlet} from "react-router-dom";
import {useGetSessionHook} from "../hooks/useSessionHook.tsx";

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const data = useGetSessionHook();
    return (
        <div className="layout">
            <HeadBar onToggle={() => setSidebarOpen(!sidebarOpen)} name={data.username} />
            <div style={{flexDirection:'row', display:'flex'}}>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
            <div className={`content`}>
                <Outlet/>
            </div>
            </div>
        </div>

    );
};
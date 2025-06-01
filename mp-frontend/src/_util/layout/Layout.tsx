import './layout.style.css';
import {useState} from "react";
import Sidebar from "../components/SideBar/SideBar.tsx";
import HeadBar from "../components/HeadBar/HeadBar.tsx";

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="layout">
            <HeadBar onToggle={() => setSidebarOpen(!sidebarOpen)}/>
            <div style={{flexDirection:'row', display:'flex'}}>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
            <div className={`content`}>
                <p>Bienvenido al contenido principal.</p>
            </div>
            </div>
        </div>

    );
};
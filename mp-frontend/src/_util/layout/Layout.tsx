import './layout.style.css';
import {useState} from "react";
import Sidebar from "../components/SideBar/SideBar.tsx";
import HeadBar from "../components/HeadBar/HeadBar.tsx";

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="layout">
            <HeadBar onToggle={() => setSidebarOpen(!sidebarOpen)}/>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
            <main className={`content ${sidebarOpen ? 'blurred' : ''}`}>
                <p>Bienvenido al contenido principal.</p>
            </main>
        </div>

    );
};
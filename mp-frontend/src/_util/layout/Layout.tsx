import './layout.style.css';
import HeadBar from "../components/HeadBar/HeadBar.tsx";
import SideBar from "../components/SideBar/SideBar.tsx";
import {useState} from "react";

export const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="layout">
            <HeadBar onToggle={() => setSidebarOpen(!sidebarOpen)}/>
            <div className="main">
                <SideBar open={sidebarOpen}/>
                <section className="content">
                    <p>Bienvenido al contenido principal.</p>
                </section>
            </div>
        </div>

    );
};
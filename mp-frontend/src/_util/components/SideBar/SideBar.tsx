import './sidebar.style.css';
import type {FC} from "react";
import {logout} from "../../functions.ts";
import {useNavigate} from "react-router-dom";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
    const isDesktop = window.innerWidth >= 600;
    const navigate = useNavigate();
    return (
        <>
            <aside className={`sidebar ${isDesktop ? (open ? '' : 'closed') : (open ? 'open' : '')}`}>

                <ul>
                    <li tabIndex={0} onClick={()=> navigate('/dashboard')}>Inicio</li>
                    <li tabIndex={1} onClick={()=> navigate('/case')}>Casos reporte</li>
                    <li onClick={logout} tabIndex={2}>Cerrar Sesion</li>
                </ul>
            </aside>

            {!isDesktop && (
                <div
                    className={`backdrop ${open ? 'visible' : ''}`}
                    onClick={onClose}
                />
            )}
        </>
    );
};

export default Sidebar;

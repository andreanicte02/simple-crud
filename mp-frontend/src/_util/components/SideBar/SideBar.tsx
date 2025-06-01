import './sidebar.style.css';
import type {FC} from "react";

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
    const isDesktop = window.innerWidth >= 600;

    return (
        <>
            <aside className={`sidebar ${isDesktop ? (open ? '' : 'closed') : (open ? 'open' : '')}`}>

                <ul>
                    <li tabIndex={0}>Inicio</li>
                    <li tabIndex={0}>Fiscalías</li>
                    <li tabIndex={0}>Casos</li>
                    <li tabIndex={0}>Usuarios</li>
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

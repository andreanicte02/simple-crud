import './sidebar.style.css';
import type {FC} from "react";

interface SidebarProps {
    open: boolean;
}

const Sidebar: FC<SidebarProps> = ({open}) => {
    return (
        <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
            <ul>
                <li>Inicio</li>
                <li>Fiscalías</li>
                <li>Casos</li>
                <li>Usuarios</li>
            </ul>
        </aside>
    );
};

export default Sidebar;
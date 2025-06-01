import type {FC} from "react";
import './headbar.sytle.css';

interface HeadBarProps {
    onToggle: () => void;
}

const HeadBar: FC<HeadBarProps> = ({ onToggle }) => (
    <header className="headbar">
        <button className="toggle-btn" onClick={onToggle}>
            ☰
        </button>
        <h3> Mi Aplicación</h3>
    </header>
);

export default HeadBar;
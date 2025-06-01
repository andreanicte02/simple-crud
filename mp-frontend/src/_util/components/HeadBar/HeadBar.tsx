import type {FC} from "react";
import './headbar.sytle.css';

interface HeadBarProps {
    onToggle: () => void;
}

const HeadBar: FC<HeadBarProps> = ({ onToggle }) => (
    <header className="headbar">
        <button className="toggle-btn" onClick={onToggle}>☰</button>
        <h1 className="title">
            <span className="full-title">Mi Aplicación Completa</span>
            <span className="short-title">App</span>
        </h1>
    </header>
);

export default HeadBar;
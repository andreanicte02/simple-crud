import type {FC} from "react";
import  './alert.style.css'

const icons = {
    success: (
        <span className="icon" role="img" aria-label="success">
      ✓
    </span>
    ),
    danger: (
        <span className="icon" role="img" aria-label="danger">
      ⚠️
    </span>
    ),
};

interface AlertProps {
    message: string;
    type?: "success" | "danger";
}

const Alert: FC<AlertProps> = ({ message, type = "success" }) => (
    <div className={`custom-alert ${type}`}>
        {icons[type]}
        <span>{message}</span>
    </div>
);

export default Alert;
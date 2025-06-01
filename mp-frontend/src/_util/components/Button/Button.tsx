import type {ButtonHTMLAttributes, FC} from "react";
import './button.style.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button className={`button-mui ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
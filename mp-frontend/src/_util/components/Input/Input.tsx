import type {FC, InputHTMLAttributes} from "react";
import './input.style.css';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<InputProps> = ({ className = '', ...props }) => {
    return <input className={`input-mui ${className}`} {...props} />;
};

export default Input;

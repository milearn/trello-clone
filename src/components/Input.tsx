import "./Input.css";
import { useRef } from "react";
interface InputProps {
    displaySize?: 'small' | 'large';
    placeholder: string;
    onSubmit: (input: string) => void;
}
const Input = (props: InputProps) => {
    const inputEl = useRef(null);
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const inputValue = inputEl.current.value;
        if (inputValue && typeof props.onSubmit === 'function') {
            props.onSubmit(inputValue);
            inputEl.current.value = '';
        }
    }
    const { displaySize = "small", placeholder } = props;
    return <form onSubmit={handleFormSubmit} className={displaySize}>
        <span className="plus-icon">+</span> <input type="text" name="text" placeholder={placeholder} ref={inputEl} className="text-input" />
    </form>
}
export default Input
import './KebabMenu.css'
import { useState } from 'react'
const KebabMenu = (props) => {
    const [isMenuVisible, setMenuVisibility] = useState(false);
    const toggleMenu = () => {
        setMenuVisibility(!isMenuVisible);
    }
    return <div className="wrapper">
        <span {...props} className='kebab-icon' onClick={toggleMenu}>&#8942;</span>
        {isMenuVisible &&
            <div className="menu-container">
                {props.children}
            </div>}
    </div>
}
export default KebabMenu;
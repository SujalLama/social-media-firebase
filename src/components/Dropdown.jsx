import React, {useState, useEffect, useRef} from 'react'
import {MdArrowDropDown} from 'react-icons/md';

function Dropdown ({menu, children, className, selected, setSelected}) {
    const [active, setActive] = useState(false);
    const domNode = useRef();
    useEffect(() => {
        const hideShowHandler = (event) => {
            
            if (!domNode.current.contains(event.target)) {
                close();
            }
        }
        
        document.addEventListener('mousedown', hideShowHandler)

        return () => {
        document.removeEventListener('mousedown', hideShowHandler)
        }
    })

    function close() {
        setActive(false);
    }
    return (
        <div className={`dropdown ${active && 'active'}`} ref={domNode}>
                    <div className={`btn__dropdown ${className?.btn}`} onClick={() => setActive(!active)}>
                        {
                            children 
                                ? children 
                                : <><span>{selected}</span>
                                    <MdArrowDropDown /></>
                        }
                        
                    </div>

                    <div className={`dropdown__menu ${className?.menu}`}>
                        <ul>
                            {
                                menu.map(item => <li key={item} onClick={() => {
                                    setSelected(item)
                                    setActive(false)
                                }}>{item}</li>)
                            }
                        </ul>
                    </div>
        </div>
    );
}


export default Dropdown

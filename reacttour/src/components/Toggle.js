import { useState } from "react";

const Toggle = () => {
    const [isvisible,setisvisible] = useState(true);

    const toggleVisibility = () => {
        setisvisible(!isvisible);
    };

    return (
        <div>
            <h2>Userstate show/Hide Example</h2>
            <button onClick={toggleVisibility}>
                {isvisible ? "hide content" : "show content" }
            </button>
            {isvisible && (<div>This div content will show/hide based on the usestate</div>)}
        </div>
    );
};

export default Toggle;
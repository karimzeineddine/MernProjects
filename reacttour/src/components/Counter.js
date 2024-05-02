import { useState } from "react";

const Counter = ()=>{
    const [count, setcount] = useState(0);

    const incrementCounter= () =>{
        setcount(count + 1);
    };

    return (
        <div>
            <h3>Counter:{count}</h3>
            <button onClick={incrementCounter}>Increment</button>
        </div>
    );
};

export default Counter;

import { useState } from 'react';

const Page = ({props}) => {
    const [num, setNum] = useState(0);
    return (
        <div>
            <h1>{num}</h1>
            <button onClick={() => {
               setNum(n => n+1)
            }}>Increment</button>
        </div>
    );
};

export default Page;
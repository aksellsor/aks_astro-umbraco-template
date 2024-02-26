
import { useState } from 'react';

const Page = ({ children }) => {
    const [num, setNum] = useState(0);
    return (
        <>
            <h3>{num}</h3>
            <button
                onClick={() => {
                    setNum(n => n + 1);
                }}
            >
                {children}
            </button>
        </>
    );
};

export default Page;
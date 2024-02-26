
import { useState } from 'react';

const Page = ({props}) => {
    const [num, setNum] = useState(0);
    return (
        <div>
            <h1>{num}</h1>
            <button onClick={() => {
               setNum(n => n+1)
            }}>Increment</button>
            <img src={"https://1235738-www.web.tornado-node.net/"+props.properties.pageBg[0]?.url}/>
        </div>
    );
};

export default Page;
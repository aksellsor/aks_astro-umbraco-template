import { useStore } from '@nanostores/react';
import { darkmode } from '../globalState';
import { useEffect } from 'react';

const DarkmodeToggle = ({ override }) => {
    // read the store value with the `useStore` hook
    const $darkmode = useStore(darkmode);
    useEffect(() => {
        if (override) {
            darkmode.set(override);
        }
    }, [override]);

    // write to the imported store using `.set`
    return (
        <>
            <pre>{JSON.stringify(override, null, 1)}</pre>
            <button onClick={() => darkmode.set(!$darkmode)} style={{ padding: "1rem", width: "max-content" }}>TOGGLE DARKMODE</button>
        </>
    );
};

export default DarkmodeToggle;
import { useStore } from '@nanostores/react';
import { darkmode } from '../globalState';

const DarkmodeToggle = () => {
    // read the store value with the `useStore` hook
    const $darkmode = useStore(darkmode);
    // write to the imported store using `.set`
    return (
        <button onClick={() => darkmode.set(!$darkmode)} style={{ padding: "1rem", width: "max-content" }}>TOGGLE DARKMODE</button>
    );
};

export default DarkmodeToggle;
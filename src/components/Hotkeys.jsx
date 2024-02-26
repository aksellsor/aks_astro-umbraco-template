
// External components
import { useHotkeys } from 'react-hotkeys-hook';

const REPO = import.meta.env.PUBLIC_GITHUB_REPO;
const UMBRACO = import.meta.env.PUBLIC_UMBRACO_URL;
const CLOUDFLARE_DASH = import.meta.env.PUBLIC_CLOUDFLARE_DASH;

const AllHotkeys = () => {
    const openUrl = (url) => {
        window
            .open(
                url,
                "_blank"
            )
            .focus();
    };
    useHotkeys('alt+shift+g', () => openUrl(REPO));
    useHotkeys('alt+shift+u', () => openUrl(UMBRACO));
    useHotkeys('alt+shift+c', () => openUrl(CLOUDFLARE_DASH));
};

export default AllHotkeys;
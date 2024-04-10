import { persistentAtom } from '@nanostores/persistent';
// import { atom } from 'nanostores';
// import client from './umbraco-client';
// const root = await client.getContentById(null, '/', false).then((res) => res);
// export const rootData = atom(root);
export const darkmode = persistentAtom('darkmode', true);

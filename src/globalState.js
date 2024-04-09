// import { atom } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';
// import client from './umbraco-client';
// const globalData = await client
//   .getContentById(window.location.origin, '/', false)
//   .then((res) => res);
// const properties = globalData?.properties;
// export const globalProps = atom(properties);
export const darkmode = persistentAtom('darkmode', true);

// import { configureStore } from '@reduxjs/toolkit';
// import entriesReducer from './entriesSlice';


// export const loadState = () => {
//   try {
//     const serialized = localStorage.getItem('entries');
//     console.log( serialized)
//     if (serialized === null) return undefined;
//     return JSON.parse(serialized);
//   } catch (err) {
//     console.error('Failed to load state from localStorage:', err);
//     return undefined;
//   }
// };


// const preloadedState = loadState();

// export const store = configureStore( {
//     reducer: {
//         entries: entriesReducer
//     },
//     preloadedState
// } );

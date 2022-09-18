import { configureStore } from '@reduxjs/toolkit';
import scoringKeyReducer from 'store/scoringKey';

function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem('persistentState', serialisedState);
    } catch (e) {
        console.warn(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem('persistentState');
        if (serialisedState === null) return undefined;
        return JSON.parse(serialisedState);
    } catch (e) {
        console.warn(e);
        return undefined;
    }
}

const store = configureStore({
    reducer: {
        scoringKey: scoringKeyReducer,
    },
    preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;

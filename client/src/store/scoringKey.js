import { createSlice } from '@reduxjs/toolkit';

export const scoringKeySlice = createSlice({
    name: 'scoringKey',
    initialState: {
        value: 'ppr',
    },
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setValue } = scoringKeySlice.actions;

export default scoringKeySlice.reducer;

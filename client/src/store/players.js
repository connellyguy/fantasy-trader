import { createSlice } from '@reduxjs/toolkit';

export const playersSlice = createSlice({
    name: 'players',
    initialState: {
        scoringKey: 'ppr',
    },
    reducers: {
        setScoringKey: (state, action) => {
            state.scoringKey = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setScoringKey } = playersSlice.actions;

export default playersSlice.reducer;

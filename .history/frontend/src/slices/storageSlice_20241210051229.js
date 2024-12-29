import {createSlice} from "@reduxjs/toolkit";

const initialState = localStorage.getItem('storage') ? JSON.parse(localStorage.getItem('storage')) : {storageItems: []};

const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {
        addToStorage: (state, action) => {
            const item = action.payload;
            const existingItem = state.storageItems.find((i) => i.id === item.id);
            if(existingItem) {
                existingItem.quantity += 1;
            } else {
                state.storageItems.push({...item, quantity: 1});
            }
            localStorage.setItem('storage', JSON.stringify(state));
        },
        removeFromStorage: (state, action) => {
            const item = action.payload;
            const existingItem = state.storageItems.find((i) => i.id === item.id);
            if(existingItem.quantity === 1) {
                state.storageItems = state.storageItems.filter((i) => i.id !== item.id);
            } else {
                existingItem.quantity -= 1;
            }
            localStorage.setItem('storage', JSON.stringify(state));
        },
    },
});                        

export default storageSlice.reducer;
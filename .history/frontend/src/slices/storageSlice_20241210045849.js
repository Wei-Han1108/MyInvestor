import {createSlice} from "@reduxjs/toolkit";

const initialState = localStorage.getItem('storage') ? JSON.parse(localStorage.getItem('storage')) : {storageItems: []};

const storageSlice = createSlice({
    name: 'storage',
    initialState,
    reducers: {

    },
});                        

export default storageSlice.reducer;
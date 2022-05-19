import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data: {},
}

export const formSlice = createSlice({
    name: 'getData',
    initialState,
    reducers: {
        // getData: async (state) => {
        //     console.log('lolol')
        //     const data = await axios.get("https://catfact.ninja/fact");
        //     console.log(data);
        //     state.data = data;
        // }
        
    },
})

// Action creators are generated for each case reducer function
export const { getData } = formSlice.actions

export default formSlice.reducer
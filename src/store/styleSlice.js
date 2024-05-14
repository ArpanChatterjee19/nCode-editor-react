import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarOpen : false,
}

const styleSlice = createSlice({
    name: "styleSlice",
    initialState,
    reducers: { 
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        }, 
     }
});

export const { setSidebarOpen } = styleSlice.actions
export default styleSlice.reducer
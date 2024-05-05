import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    html : "",
    css : "",
    js : "",
}

const codeSlice = createSlice({
    name: "codeSlice",
    initialState,
    reducers: { 
        setHtml: (state, action) => {
            state.html = action.payload;
        },
        setCss: (state, action) => {
            state.css = action.payload;
        },
        setJs: (state, action) => {
            state.js = action.payload;
        }, 
     }
});

export const { setJs, setHtml, setCss} = codeSlice.actions
export default codeSlice.reducer
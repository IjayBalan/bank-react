import { configureStore } from "@reduxjs/toolkit";
import Slice from './Slice.js'
let Store=configureStore({
    reducer:{
        data:Slice
    }
})
export default Store
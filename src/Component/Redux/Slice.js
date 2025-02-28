import {createSlice} from '@reduxjs/toolkit'
import Detail from "../Details.json"

let Slice=createSlice({
    name:"user",
    initialState:{
        Items:Detail.Details,
        IsLogin:false
    },
    reducers:{
        updateDatas:(state,action)=>{
         state.Items=action.payload
        },
        IsLoginUpdate:(state,action)=>{
            state.IsLogin=action.payload
        }
    }
})
export let {updateDatas,IsLoginUpdate,updateCreditAmount}=Slice.actions
export default Slice.reducer
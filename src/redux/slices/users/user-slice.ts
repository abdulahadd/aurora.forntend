import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userState from "../../../components/atoms/types/redux/redux-types";
import { stat } from "fs";


const initialState:userState={
    _id:'',
    username:'Abdul',
    password:'1234',
    token:'',
    role: '',
    orgId: '',
    isLoggedIn:false

}



const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        updateUserState(state, action: PayloadAction<userState>){
            state._id=action.payload._id;
            state.username=action.payload.username;
            state.password=action.payload.password;
            state.token=action.payload.token;
            state.role=action.payload.role;
            state.orgId=action.payload.orgId;
            state.isLoggedIn=action.payload.isLoggedIn;

        }

    }
})

export const { updateUserState } = userSlice.actions;
export default userSlice.reducer;
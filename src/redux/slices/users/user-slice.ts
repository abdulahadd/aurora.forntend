import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userState from "../../../components/atoms/types/redux/redux-types";


const initialState:userState={
    username:'Abdul',
    password:'1234',
    token:'',
    role: '',
    orga: '',
    isLoggedIn:false

}



const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        updateUserState(state, action: PayloadAction<userState>){
            state.username=action.payload.username;
            state.password=action.payload.password;
            state.token=action.payload.token;
            state.role=action.payload.role;
            state.orga=action.payload.orga;
            state.isLoggedIn=action.payload.isLoggedIn;

        }

    }
})

export const { updateUserState } = userSlice.actions;
export default userSlice.reducer;
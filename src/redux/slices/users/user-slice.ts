import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState{
    username: string;
    password: string;
    token: string;
    role: string;
    isLoggedIn: boolean
}

const initialState:userState={
    username:'Abdul',
    password:'1234',
    token:'',
    role: '',
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
            state.isLoggedIn=action.payload.isLoggedIn;

        }

    }
})

export const { updateUserState } = userSlice.actions;
export default userSlice.reducer;
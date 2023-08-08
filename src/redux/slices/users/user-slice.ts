import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState{
    username: string;
    password: string;
    token: string;
    role: string
}

const initialState:userState={
    username:'Abdul',
    password:'1234',
    token:'',
    role: ''

}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{

        updateUserState(state, action: PayloadAction<userState>){
            state.username=action.payload.username;
            state.password=action.payload.password;
            state.token=action.payload.token;

        }

    }
})

export const { updateUserState } = userSlice.actions;
export default userSlice.reducer;
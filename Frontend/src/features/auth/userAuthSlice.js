import { createSlice } from '@reduxjs/toolkit';

//Get user from localStorage
const userToken = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: userToken ? userToken.username : null,
	token: userToken ? userToken.token : null
	
};

//Register admin

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserToken(state, action) {
			const { token, username } = action.payload;
            console.log(token,username)
			localStorage.setItem(
				'user',
				JSON.stringify({
                    token,
					username
				})
			);
			state = { token, username };
		},
		deleteUserToken(state) {
			state = { username: null, token: null };
			localStorage.removeItem('user');
		}
	}
});
export const { deleteUserToken, setUserToken } = authSlice.actions;

export default authSlice.reducer;



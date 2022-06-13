import {createSlice} from '@reduxjs/toolkit'


const initialState = {
  isAdmin : 0,
  isUser : 0,
  isKurum : 0,
  admin: {},
  user: {},
  kurum: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isUser = true
    },
    userLogout : (state) => {
      state.user = {}
      state.isUser = false
    },
    setKurum: (state, action) => {
      state.kurum = action.payload
      state.isKurum = true
    },
    kurumLogout : (state) => {
      state.kurum = {}
      state.isKurum = false
    }
  },
})

export const {setUser,
              userLogout, 
              setKurum, 
              kurumLogout
            } = authSlice.actions

export default authSlice.reducer
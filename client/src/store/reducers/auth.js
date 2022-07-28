import {createSlice} from '@reduxjs/toolkit'


const initialState = {
  isUser : 0,
  isKurum : 0,
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
    },
    setActiveSMSAPI: (state, action) => {
      console.log(action.payload)
      state.kurum.active_sms_api = action.payload
    }
  },
})

export const {setUser,
              userLogout, 
              setKurum, 
              kurumLogout,
              setActiveSMSAPI
            } = authSlice.actions

export default authSlice.reducer
import {createSlice} from '@reduxjs/toolkit'


const initialState = {
  isAdmin : 0,
  admin: {},
  mobileMenu: false
}

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload
      state.isAdmin = true
    },
    adminLogout : (state) => {
      state.admin = {}
      state.isAdmin = false
    },
    setMobileMenu: (state, action) => {
        state.mobileMenu = action.payload
    },
  },
})

export const { setAdmin, adminLogout, setMobileMenu } = adminSlice.actions

export default adminSlice.reducer
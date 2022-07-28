import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  mobileMenu: false,
  isDark: false,
  active_project_id: ''
}

export const kurumSlice = createSlice({
  name: 'kurum.dashboard',
  initialState,
  reducers: {
    setMobileMenu: (state, action) => {
      state.mobileMenu = action.payload
    },
    setDark: (state, action) => {
      //window.localStorage.setItem("dark", action.payload);
      state.isDark = action.payload
    },
    setActiveProjectID: (state, action) => {
      //window.localStorage.setItem("dark", action.payload);
      state.active_project_id = action.payload
    }
  },
})

export const { setMobileMenu, setDark, setActiveProjectID } = kurumSlice.actions

export default kurumSlice.reducer
import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  items: [],
  item: {},
}

export const hissedarSlice = createSlice({
  name: 'hissedar',
  initialState,
  reducers: {
    setHissedars: (state, action) => {
        state.items = action.payload
    },
    getItem : (state, action) => {
      state.item = action.payload
    }
  },
})

export const { setHissedars, getItem } = hissedarSlice.actions

export default hissedarSlice.reducer
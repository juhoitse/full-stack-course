import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    createFilter(state, action) {
      return action.payload.toLowerCase()
    }
  }
})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer

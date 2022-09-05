import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  timerid: null,
};

/*const notificationReducer = (statesf = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
}*/

const notifSlice = createSlice({
  name: "notif",
  initialState: initialState,
  reducers: {
    showNotif(state, action) {
      state.message = action.payload;
      console.log("notif", state.message);
      return state;
    },
    hideNotif(state, action) {
      state.message = null;
      return state;
    },
    setTimerId(state, action) {
      state.timerid = action.payload;
      return state;
    },
    clearTimer(state, action) {
      //console.log('clear timer', state.timerid)
      clearTimeout(state.timerid);
    },
  },
});

export const {
  showNotif,
  hideNotif,
  setTimerId,
  clearTimer,
} = notifSlice.actions;

export const setNotification = (notif, timeout) => {
  return (dispatch) => {
    dispatch(showNotif(notif));
    dispatch(clearTimer());
    const timerid = setTimeout(() => {
      dispatch(hideNotif());
    }, timeout * 1000);
    //console.log('set timer', timerid)
    dispatch(setTimerId(timerid));
  };
};

export default notifSlice.reducer;

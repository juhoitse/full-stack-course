import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  style: null,
  timerid: null,
};

const errorStyle = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 1,
};

const confirmStyle = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 1,
};

const notifSlice = createSlice({
  name: "notif",
  initialState: initialState,
  reducers: {
    showNotif(state, action) {
      state.message = action.payload.message;
      state.style = action.payload.error ? errorStyle : confirmStyle;
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

export const setNotification = (notif) => {
  return (dispatch) => {
    console.log("notif", notif);
    dispatch(showNotif(notif));
    dispatch(clearTimer());
    const timerid = setTimeout(() => {
      dispatch(hideNotif());
    }, 5000);
    //console.log('set timer', timerid)
    dispatch(setTimerId(timerid));
  };
};

export default notifSlice.reducer;

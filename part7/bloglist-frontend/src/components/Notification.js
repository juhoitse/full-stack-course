import { connect } from "react-redux";

const Notification = (props) => {
  const notification = props.notification;
  const style = props.style;
  if (notification === null) {
    return null;
  }

  console.log("style", style);

  return <div style={style}>{notification}</div>;
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification.message,
    style: state.notification.style,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;

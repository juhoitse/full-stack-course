const Message = ({message, error}) => {
  if(message === null) {
    return null
  }
  if(error) {
    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 1,
    }
    return (
      <div style={errorStyle}>{message}</div>
    )
  } else {
    const confirmStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 1,
    }
    return (
      <div style={confirmStyle}>{message}</div>
    )
  }

}

export default Message

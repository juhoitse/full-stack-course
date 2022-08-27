import { createFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.createFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(null,  { createFilter })(Filter)

export default ConnectedFilter

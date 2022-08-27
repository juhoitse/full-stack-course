import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, setTimerId } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const state = useSelector(state => state)
  const anecdotes = state.anecdotes
  const filter = state.filter
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => id === a.id)
    const newDote = {
      content: anecdote.content,
      id: id,
      votes: anecdote.votes + 1
    }
    dispatch(voteAnecdote(id, newDote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    //console.log('timer', state.notification)
    //dispatch(setTimerId(timerid))
  }

  //console.log(filter)

  return (
    <div>
      {anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter) ).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList

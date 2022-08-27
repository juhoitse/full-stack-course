import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]*/

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = []//anecdotesAtStart.map(asObject).sort( (a,b) => a.votes < b.votes)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: initialState,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const newAnecdote = {
        content: anecdote.content,
        id: anecdote.id,
        votes: anecdote.votes + 1
      }
      return state.map(a => a.id !== action.payload ? a : newAnecdote).sort( (a,b) => a.votes < b.votes)
    },
    setAnecdotes(state, action) {
      return action.payload.sort( (a,b) => a.votes < b.votes)
    }
  }
})

export const { vote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initiliazeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    //console.log('anecdotes', anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (id, anecdote) => {
  return async dispatch => {
    const voot = await anecdoteService.update(id, anecdote)
    dispatch(vote(id))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer

import { useState } from 'react'

const AnecdoteGenerator = (props) => {
  return (
    <div>
      <p>{props.anecdotes[props.selected]}</p>
      <p>{"has"} {props.votes[props.selected]} {"votes"}</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handler} >
      {props.name}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const votes = [0, 0, 0, 0, 0, 0, 0]

  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(votes);
  const anecdoteHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }
  const voteHandler = (v) => {
    const handler = () => {
      const copy = [...vote]
      copy[v] = copy[v] + 1
      setVote(copy)
    }
    return handler
  }
  return (
    <div>
      <h1>{"Anecdote of the day"}</h1>
      <AnecdoteGenerator anecdotes={anecdotes} votes={vote} selected={selected} />
      <Button name={"vote"} handler={voteHandler(selected)} />
      <Button name={"next anecdote"} handler={anecdoteHandler} />
      <h1>{"Anecdote with most votes"}</h1>
      <AnecdoteGenerator anecdotes={anecdotes} votes={vote} selected={vote.indexOf(Math.max(...vote))} />
    </div>
  )
}

export default App

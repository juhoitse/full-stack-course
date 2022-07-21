import { useState } from 'react'

const Button = ( props ) => {
  return (
    //<div>
      <button onClick={props.func}>
        {props.name}
      </button>
    //</div>
  )
}

const StatisticsLine = (props) => {
  return (
    <tr><td>{props.name}</td><td>{props.num}</td></tr>
  )
}

const Statistics = (props) => {
  const all = props.good+props.neutral+props.bad
  const average = (props.good-props.bad)/all
  const positiveNum = (props.good/all) * 100
  const positive = positiveNum + "%"

  if(all === 0) {
    return (
      <div>
        <h1>{"No feedback given"}</h1>
      </div>
    )
  }
  return (
    <div>
      <h1>{"statistics"}</h1>
      <table>
        <tbody>
          <StatisticsLine name={"Good"} num={props.good} />
          <StatisticsLine name={"Neutral"} num={props.neutral} />
          <StatisticsLine name={"Bad"} num={props.bad} />
          <StatisticsLine name={"All"} num={all} />
          <StatisticsLine name={"Average"} num={average} />
          <StatisticsLine name={"Positive"} num={positive} />
        </tbody>
      </table>
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newValue = good + 1
    setGood(newValue)
  }

  const handleNeutral = () => {
    const newValue = neutral + 1
    setNeutral(newValue)
  }

  const handleBad = () => {
    const newValue = bad + 1
    setBad(newValue)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name={"Good"} func={handleGood} />
      <Button name={"Neutral"} func={handleNeutral} />
      <Button name={"Bad"} func={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

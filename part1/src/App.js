const Header = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.name[0]} {props.num[0]}
      </p>
      <p>
        {props.name[1]} {props.num[1]}
      </p>
      <p>
        {props.name[2]} {props.num[2]}
      </p>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>
        Number of exercises {props.num}
      </p>
    </div>
  );
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [part1, part2, part3]
  const nums = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header name={course} />
      <Content name={parts} num={nums} />
      <Total num={exercises1+exercises2+exercises3} />
    </div>
  )
}

export default App

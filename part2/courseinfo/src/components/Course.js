const Header = (props) => {
  return(
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
        {props.part.name} {props.part.exercises}
      </p>
    </div>
  )

}

const Content = (props) => {
  const parts = props.course.parts.map( part =>
                                        <Part key={part.id} part={part} />)
  return (
    <div>
      {parts}
    </div>
  )
}

const Total = (props) => {
  const total = props.course.parts.reduce(
    (a, b) => ({ exercises: a.exercises + b.exercises })
  );
  return(
    <div>
      <p>
        <b>Total of {total.exercises} exercises</b>
      </p>
    </div>
  );
}

const Course = (props) => {
    const course = props.course
    return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course

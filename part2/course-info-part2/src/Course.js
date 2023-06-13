
const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b>Total of {sum} exercises </b></p>

const Part = ({ part }) => {
  
  return(
    <div>
         <p>
          {part.name} {part.exercises}
        </p>
         
    </div>
   
  )
}

  
const Content = ({ parts }) => {
  //const initialValue = 0
  return(
    parts.map((part => <div key={part.id}><Part part={part} /></div>))
  )
}
  
  const Course = ({courses}) => {
    return(
      courses.map(course => {
        const initialValue = 0
        const total = course.parts.reduce((accum, currItem) => {return accum + currItem.exercises}, initialValue)
       return( 
            <div>
                <div key={course.id}>
                <Header course={course.name} />
                <Content parts={course.parts} />
                <Total sum={total} />
            </div>
      </div>)
        
      })
    
    )
  }
export default Course
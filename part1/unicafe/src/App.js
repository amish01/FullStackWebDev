import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({ voteCount, text }) => <tr><td>{text}:</td><td>{voteCount}</td></tr>
const Statistics = (props) => {
  if (props.totalVote === 0) {
    return <div>
              <h1>Give Feedback</h1>
              <Button handleClick={props.incrementGood} text="Good"></Button>
              <Button handleClick={props.incrementNeutral} text="Neutral"></Button>
              <Button handleClick={props.incrementBad} text="Bad"></Button>
                {/* <button onClick={props.incrementGood}>Good</button>
                <button onClick={props.incrementNeutral}>Neutral</button>
                <button onClick={props.incrementBad}>Bad</button> */}
              <h1>Statistics</h1>
              <p>No Feedback given</p>
      </div>
  }
  return(
    <div>
        <h1>Give Feedback</h1>

        <Button handleClick={props.incrementGood} text="Good"></Button>
        <Button handleClick={props.incrementNeutral} text="Neutral"></Button>
        <Button handleClick={props.incrementBad} text="Bad"></Button>
        
        {/* <button onClick={props.incrementGood}>Good</button>
        <button onClick={props.incrementNeutral}>Neutral</button>
        <button onClick={props.incrementBad}>Bad</button> */}
        <h1>Statistics</h1>
       
        <table>
          <tbody>
            <StatisticLine voteCount={props.good} text="Good" />
            <StatisticLine voteCount={props.neutral} text="Neutral" />
            <StatisticLine voteCount={props.bad} text="Bad" />
            <StatisticLine voteCount={props.totalVote} text="All" />
            <StatisticLine voteCount={props.voteAverage} text="Average" />
            <StatisticLine voteCount={props.votePositive + " %"} text="Positive" />
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

  const totalVote = good + bad + neutral
  const voteAverage = ((1*good) + (0 * neutral) + ( -1 * bad) * 1.0)/totalVote
  const votePositive = (good/totalVote) * 100.0


  const incrementGood = () => {
    console.log('increasing, value before', good)
    setGood(good + 1)
  }

  const incrementNeutral = () => {
    console.log('increasing, value before', neutral)
    setNeutral(neutral + 1)
  }

  const incrementBad = () => {
    console.log('increasing, value before', bad)
    setBad(bad + 1)
  }

  
  return (
      // <div>
    //   <h1>Give Feedback</h1>
    //   <span><Button handleClick={incrementGood} text="Good"></Button></span>
    //   <Button handleClick={incrementNeutral} text="Neutral"></Button>
    //   <Button handleClick={incrementBad} text="Bad"></Button>
    //   <h1>Statistics</h1>
    //   <p>
    //     good: {good} <br/>
    //     neutral: {neutral} <br/>
    //     bad: {bad} <br/>
    //     all: {totalVote} <br/>
    //     average: {voteAverage} <br/>
    //     positive: {votePositive}%

    //   </p>
    // </div>

    <Statistics incrementGood={incrementGood} incrementNeutral={incrementNeutral}
                incrementBad={incrementBad} good={good} neutral={neutral} bad={bad}
                totalVote={totalVote} voteAverage={voteAverage} votePositive={votePositive} />
  )
}

export default App;

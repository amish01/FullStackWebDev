
import { useState } from 'react'

const getMax = (arr) => {
  const iterator = arr.values()
  let currMax = iterator.next().value
  for (const votesCast of iterator){
    if(votesCast > currMax){
      currMax = votesCast
    }
  }
  return currMax
}

const Display = ({anecdote, vote}) => {return (<div>
                                      <h1>Anecdote of the day</h1>
                                      <p>{anecdote} <br/> <span>This anecdote has <b>{vote}</b> votes</span></p>
                                      </div>) }
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const Summary = ({anecdotesArr, votesArr}) => {
  let maxVote = votesArr.indexOf(getMax(votesArr))  
    return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotesArr[maxVote]}</p>  
   </div>)
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0, 0))
  const numAnecdotes = anecdotes.length
  
  

  const getNextAnecdote = () => {
      const selectedIndex = Math.floor(Math.random() * numAnecdotes)
      setSelected(selectedIndex)
      return selectedIndex
  } 
  const voteSelectedAnecdote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }
  
  return (
    <div>
      <Display anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button handleClick={voteSelectedAnecdote} text="vote" />
      <Button handleClick={getNextAnecdote} text="next anecdote" />  
      <Summary anecdotesArr={anecdotes} votesArr={votes} />       
    </div>
  )
}

export default App
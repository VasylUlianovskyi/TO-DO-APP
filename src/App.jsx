import './reset.css'
import './index.css'
import TasksList from './components/TasksList'
import TaskFormContainer from './components/TaskFormContainer'

function App () {
  return (
    <>
      <TaskFormContainer />
      <TasksList />
    </>
  )
}

export default App

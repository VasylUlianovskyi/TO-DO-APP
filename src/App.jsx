import './reset.css'
import './index.css'
import TasksList from './components/TasksList'
import TaskFormContainer from './components/TaskFormContainer'
import Header from './components/Header'

function App () {
  return (
    <>
      <div className='filter'></div>
      <img
        className='backgroundImg'
        src='https://media.cnn.com/api/v1/images/stellar/prod/191111144441-03-highest-mountains-world-photos-restricted.jpg?q=w_2500,h_1406,x_0,y_0,c_fill'
        alt=''
      />
      <article className='toDoEl'>
        <Header />
        <TaskFormContainer />
        <TasksList />
      </article>
    </>
  )
}

export default App

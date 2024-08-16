
import './App.css'
import { Form } from './components/Form'

function App() {


  return (
    <div className='bg-slate-200 h-screen max-h-full'>
      <div className=' '>
        <h1 className='p-5 text-center font-semibold text-4xl mt-8'>Sign Up Page</h1>
        <div className='mt-4'>
          <Form />
        </div>
      </div>
    </div>
  )
}

export default App

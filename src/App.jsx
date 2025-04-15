import { useState } from 'react'
import './App.css'
import TicketGenerator from './components/TicketGenerator'
import { Toaster } from 'react-hot-toast';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Toaster position="top-right" />
      <TicketGenerator />
    </>
  )
}

export default App

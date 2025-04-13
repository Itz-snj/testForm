import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TicketGenerator from './components/TicketGenerator'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TicketGenerator />
    </>
  )
}

export default App

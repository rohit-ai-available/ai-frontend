import { useState } from 'react'
import ChatBot from './ai component/ChatBot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatBot></ChatBot>
    </>
  )
}

export default App
 
import { useState } from 'react'
import ChatBot from './ai component/ChatBot'
import FlexBanner from './FlexBanner'
import FlexPrintingLanding from './FlexPrintingLanding '
import CarShowcase from './CarShowcase'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatBot></ChatBot>
      {/* <FlexBanner></FlexBanner> */}
      {/* <FlexPrintingLanding></FlexPrintingLanding> */}
      {/* <CarShowcase></CarShowcase> */}
    </>
  )
}

export default App
 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import ChessBoard from './Components/Board'
import Login from './Components/Login'

export default function App() {
  const [username, setUsername] = useState("")

  return (
    <StrictMode>
      {username === "" ? (
        <Login onStart={setUsername} />
      ) : (
        <ChessBoard />
      )}
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)

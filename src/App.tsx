import Router from './router'
import { AuthProvider } from './context/AuthContext'
import './App.css'

function App() {

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App

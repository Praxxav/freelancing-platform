
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from "./component/Landing"
import Signup from './component/Signup'

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} /> 
        
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

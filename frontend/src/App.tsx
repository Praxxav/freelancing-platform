
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from "./component/Landing"

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>

        <Route path="/" element={<LandingPage />} /> 
        
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

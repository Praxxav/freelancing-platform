
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from "./pages/Landing"
import Signup from './pages/Signup'
import Signin from "./pages/Signin"
import Dashboard from './pages/Dashboard'
import ServicesPage from './pages/Services'
function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/signin" element={<Signin />} /> 
        <Route path="/Services" element={<ServicesPage children={undefined} />} />
        <Route path="/Dashboard" element={<Dashboard />} /> 

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

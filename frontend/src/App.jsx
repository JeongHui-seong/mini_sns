import Login from "./pages/Login"
import Home from "./pages/Home"
import { Routes, Route } from 'react-router-dom';

const AppContent = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </>
  )
}

function App() {

  return (
    <AppContent />
  )
}

export default App

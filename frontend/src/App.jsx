import Login from "./pages/Login";
import Home from "./pages/Home";


import { Routes, Route, Navigate } from 'react-router-dom';

const AppContent = () => {
  return (
    <Routes>
      
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      

      <Route path="/home" element={<Home />} />
      


    </Routes>
  );
};

function App() {
  return <AppContent />;
}

export default App;

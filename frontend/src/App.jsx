import Login from "./pages/Login"
import Home from "./pages/Home"
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";
import { RouteWrapper } from "./components/RouteWrapper";

const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<RouteWrapper requireAuth={true}><Home /></RouteWrapper>}></Route>
      <Route path="/login" element={<RouteWrapper requireAuth={false}><Login /></RouteWrapper>}></Route>
        <Route path="/home" element={<Home />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App;

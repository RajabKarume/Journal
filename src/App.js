import './App.css';
import SignUp from './components/Login/SignUp';
import MainPage from './components/Mainpage/Display/MainPage';
import LogIn from './components/Login/LogIn';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './components/Auth/WithAuth';

function App() {

  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) => {
    if (!currentUser){
      return (
        <Navigate to='/login' />
      )
    }
    return children
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/login"} element={<LogIn/>}  />
          <Route path={"/signup"} element={<SignUp/>}  />
          <Route path={'/'} element={<ProtectedRoute> <MainPage/> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;

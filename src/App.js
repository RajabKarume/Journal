import './App.css';
import SignUp from './components/Login/SignUp';
import MainPage from './components/Mainpage/Display/MainPage';
// import Card from './components/Mainpage/Card/Card';
// import Input from './components/Mainpage/Input/Input';
// import NavBar from './components/Mainpage/Navbar/NavBar';
import LogIn from './components/Login/LogIn';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './components/Auth/WithAuth';


function App() {

  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if (!currentUser){
      return (
        <Navigate to='/' />
      )
    }
    return children
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<LogIn/>}  />
          <Route path={"/signup"} element={<SignUp/>}  />
          <Route path={'/home'} element={<ProtectedRoute> <MainPage/> </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

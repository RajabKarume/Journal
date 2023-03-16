import './App.css';
import SignUp from './components/Login/SignUp';
import MainPage from './components/Mainpage/Display/MainPage';
// import Card from './components/Mainpage/Card/Card';
// import Input from './components/Mainpage/Input/Input';
// import NavBar from './components/Mainpage/Navbar/NavBar';
import LogIn from './components/Login/LogIn';
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <LogIn /> */}
      {/* <NavBar /> */}
      {/* <Input /> */}
      {/* <Card /> */}
      {/* <MainPage /> */}
      {/* <SignUp /> */}
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainPage/>}  />
          <Route path={"/login"} element={<LogIn/>}  />
          <Route path={"/signup"} element={<SignUp/>}  />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;

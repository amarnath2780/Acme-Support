import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Login from './Pages/Login/Login';
import AdminHome from './Pages/AdminHome';
import Home from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/admin' element={<AdminHome/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

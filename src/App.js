import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Login from './Pages/Login/Login';
import AdminHome from './Pages/AdminHome';
import Home from './Pages/Home';
import PrivateRoutes from './Routes/PrivateRoutes';
import AdminPrivateRoutes from './Routes/AdminPrivateRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>

            <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<Home/>}/>
            </Route>

            <Route element={<AdminPrivateRoutes/>}>
              <Route path='/admin' element={<AdminHome/>}/>
            </Route>

            <Route path='/login' element={<Login/>}/>

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

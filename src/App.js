import './App.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

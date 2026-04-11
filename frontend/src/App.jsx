import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Footer from './components/Footer.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/footer' element={<Footer/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

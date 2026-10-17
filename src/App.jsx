import './style/App.css';
import { Route, Routes } from 'react-router-dom';
import GamePage from './pages/gamePage';
import Nav from './pages/Nav';

export default function App() {
  return(<div>
    <Nav/>
    <Routes>
      <Route path="/" element={<GamePage/>} />
      <Route path='/stats' element={<></>} />
    </Routes>
  </div>)
}
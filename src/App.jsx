import './style/App.css';
import { Route, Routes } from 'react-router-dom';
import Nav from './pages/Nav';
import StatsPage from './pages/StatsPage';
import StartPage from './pages/Game/StartPage';
import FeedBack from './pages/FeedBack';
import GameWL from './pages/Game/GameWL';
import GamePage from './pages/Game/gamePage';

export default function App() {
  return(<div className='column app'>
    <Nav/>
    <div className='contents'>
      <Routes>
        <Route path='/' element={<StartPage/>} />
        <Route path="/game" element={<GamePage/>} />
        <Route path="/gamewl" element={<GameWL/>} />

        <Route path='/stats' element={<StatsPage/>} />
        <Route path='/feedback' element={<FeedBack/>} />
      </Routes>
    </div>
  </div>)
}
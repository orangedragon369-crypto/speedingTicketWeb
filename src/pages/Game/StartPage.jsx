import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Deck from './Deck';
import CarSelector from './selectors/CarSelector';
import LocationSelector from './selectors/LocationSelector';
import SpecialtySelector from './selectors/SpecialtySelector';

export default function StartPage(){
    const [deckVisible, setDeckVisible] = useState(false);
    const [locationsVisible, setLocationVisible] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async () => {
        //check for deck if false set to default deck
        //list of numbers for count of each card in deck and other info ex: v  having geo metro, accelerator, on freeway, with 4 copies of the first 3 card options in the deck builder"
        localStorage.getItem('deck')!==null?0:localStorage.setItem('deck', `000444|`);
        navigate('/game'); // Changes the page/route programmatically
    };

    return (<div className="column center start-page">
        <button onClick={()=>setDeckVisible(!deckVisible)}>Deck</button>
        {deckVisible?<Deck/>:<></>}
        <CarSelector/>
        {/* <option value="Ford Model T">Ford Model T</option> */}
        <SpecialtySelector/>
        <LocationSelector/>
        {/* broken road */}
        <button onClick={handleLogin}>start</button>
    </div>);
}

/*
dropdown menus          when selected show details ie effects, takeoff value, acceleration modifier, etc
    car
    speciality
    location settings
*/
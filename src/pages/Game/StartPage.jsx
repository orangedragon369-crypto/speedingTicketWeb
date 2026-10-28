import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarSelector from './selectors/CarSelector';
import LocationSelector from './selectors/LocationSelector';
import SpecialtySelector from './selectors/SpecialtySelector';
import Deck from './selectors/Deck';

export default function StartPage(){
    const [deckVisible, setDeckVisible] = useState(false);
    const navigate = useNavigate();
    const deck = {
        brake: 3,
        gas: 6,
        inertia: 3,
        lightenTheLoad: 3,
        molotov: 3,
        takeoff: 1,
        timeSkip: 3,
        warp: 3,
    };
    const handleStart = async (start = true) => {
        if (localStorage.getItem('car')==null||localStorage.getItem('specialty')==null||localStorage.getItem('local')==null) {
            start = false;
            alert('Make sure all option have a selected value.')
        }
        if (localStorage.getItem('deck')==null){
            let response = confirm("You have not given a deck option. Would you like to use the default deck?");
            response?localStorage.setItem('deck', JSON.stringify(deck)):start = false;
        }
        if (start) navigate('/game'); // Changes the page/route programmatically
    };

    return (<div className="column center start-page">
        <button onClick={()=>setDeckVisible(!deckVisible)}>Deck</button>
        {deckVisible?<Deck/>:<></>}
        <CarSelector/>
        <SpecialtySelector/>
        <LocationSelector/>
        <button onClick={()=>handleStart()}>start</button>
    </div>);
}
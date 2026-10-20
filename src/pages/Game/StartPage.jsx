import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Deck from './Deck';

export default function StartPage(){
    const [deckVisible, setDeckVisible] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async () => {
        //check for deck if false set to default deck
        //list of numbers for count of each card in deck and other info ex: v  having geo metro, accelerator, on freeway, with 4 copies of the first 3 card options in the deck builder"
        localStorage.getItem('deck')!==null?0:localStorage.setItem('deck', `000444|`);
        navigate('/game'); // Changes the page/route programmatically
    };

    return (<div className="column center start-page">
        <button onClick={()=>setDeckVisible(!deckVisible)}>deck</button>
        {deckVisible?<Deck/>:<></>}
        <select name="car" id="car">
            <option value="0">Geo Metro</option>
            {/* <option value="Ford Model T">Ford Model T</option> */}
        </select>
        <select name="speciality" id="speciality">
            <option value="0">Accelerator</option>
            <option value="1">Tank</option>
        </select>
        <select name="location" id="location">
            <option value="0">Freeway</option>
            {/* <option value="Broken Road">Broken Road</option> */}
        </select>
        <button onClick={handleLogin}>start</button>
    </div>);
}

/* 
start button
dropdown menus          when selected show details ie effects, takeoff value, acceleration modifier, etc
    car
    speciality
    location settings
deck edit button
*/
import { useNavigate } from 'react-router-dom';

export default function StartPage(){
    const navigate = useNavigate();
    const handleLogin = async () => {
        //check for deck if false default deck set to deck
        localStorage.setItem(deck, "list of number for count of each card in deck and other info ex: 004440..  having geo freeway and 4 of the first 3 card options in the deck builder")
        navigate('/dashboard'); // Changes the page/route programmatically
    };

    return (<div className="column center">
        <button>deck</button>
        <select name="car" id="car">
            <option value="Geo Metro">Geo Metro</option>
            {/* <option value="Ford Model T">Ford Model T</option> */}
        </select>
        <select name="location" id="location">
            <option value="FreeWay">Freeway</option>
            {/* <option value="Broken Road">Broken Road</option> */}
        </select>
        <button onClick={handleLogin}>start</button>
    </div>);
}

/* 
start button
dropdown menus
    car
    location settings
deck edit button
*/
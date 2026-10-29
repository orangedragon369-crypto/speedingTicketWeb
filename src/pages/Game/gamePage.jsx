import { useState } from "react";
import singleSolidWhite from "../../images/map/map00.png";
import doubleSolidWhite from "../../images/map/map01.png";
import singleDottedWhite from "../../images/map/map02.png";
import doubleDottedWhite from "../../images/map/map03.png";
import solidDottedWhite from "../../images/map/map04.png";
import singleSolidYellow from "../../images/map/map05.png";
import doubleSolidYellow from "../../images/map/map06.png";
import singleDottedYellow from "../../images/map/map07.png";
import doubleDottedYellow from "../../images/map/map08.png";
import solidDottedYellow from "../../images/map/map09.png";

export default function GamePage(){
    const [turnCount, setTurnCount] = useState(0);
    const [tilesToEscape, setTilesToEscape] = useState(0);
    const [timeThisTurn, setTimeThisTurn] = useState(0);
    const [width, setWidth] = useState([
        [doubleSolidWhite, singleDottedWhite],
        [solidDottedWhite, doubleDottedWhite],
        [singleSolidWhite, singleSolidYellow],
        [doubleSolidYellow, singleDottedYellow],
        [doubleDottedYellow, solidDottedYellow],
    ]);
    const [height, setHeight] = useState([0, 1, 3, 4, 5]);

    return(<div className="gamePage">
        <div className="topMenu row between">
            <div>{turnCount}</div>
            <div>{tilesToEscape}</div>
            <button>display menu options</button>
        </div>
        <div className="board">{/* board and contents */}
            <div className="layer3 row">{/* layer 3 (top) */}
                {/* card animation
                other effects (explosions, cloud cover, etc) */}
            </div>
            <div className="layer2 row">{/* layer 2 (center) */}
                {/*player icon
                cars and other objects */}
            </div>
            <div className="layer1 row">{/* layer 1 (bottom non-board) */}
                {/* movement/action effects */}
            </div>
            <div className="layer0 row centered">
                {width.map((side, i)=>{
                    return(<div key={i} className='lane column'>
                        {height.map((index)=>(<span className="row tile" key={'tile'+index+i}>
                            <img src={side[0]}/>
                            <img className="mirrored" src={side[1]}/>
                        </span>))}
                    </div>)
                })}
            </div>
        </div>
        <div className="bottomMenu row between">
            <div className="column">
                <div>{timeThisTurn}</div>
                <div>deck</div>
            </div>
            <div>hand w/cards</div>
            <div className="column">
                <button>end turn</button>
                <div>discard</div>
            </div>
        </div>
    </div>)
}

/* 
top
    turn count
    tiles needed to escape cops and/or tiles to objective
    menu
        restart with same settings
        end early

board
    tiles
    player icon
    other cars and objects

bottom
    time left this turn
    turn end
    cards
        name
        effect
        time cost
    deck and discard
    hand

animation or events
    play cards
    movement/action effects
*/
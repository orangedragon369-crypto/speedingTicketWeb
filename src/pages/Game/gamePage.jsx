import { useState } from "react"

export default function GamePage(){
    const [turnCount, setTurnCount] = useState(0);
    const [tilesToEscape, setTilesToEscape] = useState(0);
    const [timeThisTurn, setTimeThisTurn] = useState(0);
    //read local storage for deck and other info
    return(<div className="gamePage">
        <div className="topMenu row between">
            <div>{turnCount}</div>
            <div>{tilesToEscape}</div>
            <button>display menu options</button>
        </div>
        <div className="board">
            <div className="layer3 row">{/* layer 3 (top) */}
                {/* card animation
                other effects (explosions, cloud cover, etc) */}
            </div>
            <div className="layer2 row">{/* layer 2 (center) */}
                {/*player icon
                cars and other objects */}
            </div>
            <div className="layer1 row">{/* layer 1 (bottom) */}

                {/* tiles on map
                movement/action effects */}
            </div>
        </div>
        <div className="bottomMenu row">
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
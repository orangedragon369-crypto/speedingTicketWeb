import { useEffect, useState } from "react";

import singleSolidWhite from "../../images/map/map01.png";
import doubleSolidWhite from "../../images/map/map02.png";
import singleDottedWhite from "../../images/map/map00.png";
import doubleDottedWhite from "../../images/map/map03.png";
import solidDottedWhite from "../../images/map/map04.png";

import singleSolidYellow from "../../images/map/map07.png";
import doubleSolidYellow from "../../images/map/map08.png";
import singleDottedYellow from "../../images/map/map05.png";
import doubleDottedYellow from "../../images/map/map09.png";
import solidDottedYellow from "../../images/map/map06.png";

import blankTile from "../../images/models/mapContents0.png";
import purpleItemTile from "../../images/models/mapContents1.png";
import orangeItemTile from "../../images/models/mapContents2.png";
import blueCar from "../../images/models/mapContents3.png";
import greenCar from "../../images/models/mapContents4.png";
import greenBike from "../../images/models/mapContents5.png";
import blueBike from "../../images/models/mapContents6.png";

export default function GamePage(){
    const [turnCount, setTurnCount] = useState(0);
    const [tilesToEscape, setTilesToEscape] = useState(0);
    const [timeThisTurn, setTimeThisTurn] = useState(0);
    const [width, setWidth] = useState(JSON.parse(localStorage.getItem('road')));
    const [height, setHeight] = useState([0, 1, 3]);
    const [layer1Contents, setLayer1Contents] = useState([])
    const [layer2Contents, setLayer2Contents] = useState([])
    const [layer3Contents, setLayer3Contents] = useState([])


    useEffect(()=>{
        const toSetList = [];
        let toAdd2d = [];
        width.map(()=>{
            toAdd2d = [];
            height.map(()=>{
                toAdd2d.push(blankTile);
            })
            toSetList.push(toAdd2d);
        })
        toSetList.push(toAdd2d);
        setLayer1Contents(toSetList);
        setLayer2Contents(toSetList);
        setLayer3Contents(toSetList);
    }, [width, height]);

    const findImg = (imgString)=>{
        switch (imgString){
            case "singleSolidWhite":
                return singleSolidWhite;
            case "doubleSolidWhite":
                return doubleSolidWhite;
            case "singleDottedWhite":
                return singleDottedWhite;
            case "doubleDottedWhite":
                return doubleDottedWhite;
            case "solidDottedWhite":
                return solidDottedWhite;
            case "singleSolidYellow":
                return singleSolidYellow;
            case "doubleSolidYellow":
                return doubleSolidYellow;
            case "singleDottedYellow":
                return singleDottedYellow;
            case "doubleDottedYellow":
                return doubleDottedYellow;
            case "solidDottedYellow":
                return solidDottedYellow;
        }
    }

    function Map(){
        return(<div className="layer0 row centered">
            <span className="column tileHalf">
                {height.map((index)=>(<img key={'left'+index} src={doubleSolidWhite}/>))}
            </span>
            {width.map((side, i)=>{
                return(<span key={i} className='lane column'>
                    {height.map((index)=>(<div className="row tile" key={'tile'+index+i}>
                        <img className="mirrored" src={findImg(side[0])}/>
                        <img src={findImg(side[1])}/>
                    </div>))}
                </span>)
            })}
            <span className="column tileHalf" >
                {height.map((index)=>(<img className="mirrored" key={'right'+index} src={doubleSolidWhite}/>))}
            </span>
        </div>)
    }

    function layerSkeleton(lanes){
        lanes.map((distance)=>{
            distance.map((item)=>{
                return <img src={item}/>
            })
        })
    }

    return(<div className="gamePage">
        <div className="topMenu row between">
            <div>{turnCount}</div>
            <div>{tilesToEscape}</div>
            <button>display menu options</button>
        </div>
        <div className="board">{/* board and contents */}
            <div className="layer3 row centered">{/* layer 3 (top) */}
                {layerSkeleton(layer3Contents)}
                {/* card animation
                other effects (explosions, cloud cover, etc) */}
            </div>
            <div className="layer2 row centered">{/* layer 2 (center) */}
                {layerSkeleton(layer2Contents)}
                {/*player icon
                cars and other objects */}
            </div>
            <div className="layer1 row centered">{/* layer 1 (bottom non-board) */}
                {layerSkeleton(layer1Contents)}
                {/* movement/action effects */}
            </div>
            <Map/>
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
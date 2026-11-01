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
    const [width, setWidth] = useState(() => {
        const localRoad = localStorage.getItem('road');
        return localRoad ? JSON.parse(localRoad) : []; 
    });
    const [height, setHeight] = useState([0, 1, 3]);
    const [layer1Contents, setLayer1Contents] = useState([])
    const [layer2Contents, setLayer2Contents] = useState([])
    const [layer3Contents, setLayer3Contents] = useState([])

    const createGrid = () => {
        if (!Array.isArray(width)) return [];
        let array = Array.from({ length: width.length }, () => 
            Array.from({ length: height.length }, () => blankTile)
        );
        array.push(Array.from({ length: height.length }, () => blankTile));
        return array;
    };

    function setTileTo(lane, height, item, layer){
        console.log(lane, height, item, layer)
        console.log(typeof(lane), typeof(height), typeof(item), typeof(layer))
        switch (layer){
            case 1:
                setLayer1Contents(setTile(layer1Contents));
                break;
            case 2:
                setLayer2Contents(setTile(layer2Contents));
                break;
            case 3:
                setLayer3Contents(setTile(layer3Contents));
                break;
            default:
                return
        }

        function setTile(sets) {
            // 1. Create a deep/shallow copy of the grid to maintain immutability
            const setTo = sets.map(lane => [...lane]);          
            // 2. Wrap your arguments in parentheses (lane, index) and (element, indexI)
            setTo.forEach((laneData, index) => {
                if (lane === index) { 
                    laneData.forEach((element, indexI) => {
                        if (height === indexI) { // Note: 'height' refers to the parameter passed into setTileTo
                            setTo[index][indexI] = item;
                        }
                    });
                }
            });         
            return setTo;
        }
    }

    useEffect(()=>{
        setLayer1Contents(createGrid());
        setLayer2Contents(createGrid());
        setLayer3Contents(createGrid());
    }, [width, height])

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
            default:
                return;
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

    function LayerSkeleton({lanes}){
        return (<>
            {lanes.map((distance, index1)=>{
                
                return(<div key={'content lane'+index1} className="column">
                    {distance.map((item, index2)=>{
                        return (<img className="contentImg" key={'content'+index1+index2} src={item}/>);
                    })}
                </div>)
            })}
        </>)
    }

    return(<div className="gamePage">
        <div className="topMenu row between">
            <div>{turnCount}</div>
            <div>{tilesToEscape}</div>
            <button onClick={()=>{}}>display menu options</button>
        </div>
        <div className="board">{/* board and contents */}
            <div className="layer3 row centered">{/* layer 3 (top) */}
                <LayerSkeleton lanes={layer3Contents}/>
                {/* card animation
                other effects (explosions, cloud cover, etc) */}
            </div>
            <div className="layer2 row centered">{/* layer 2 (center) */}
                <LayerSkeleton lanes={layer2Contents}/>
                {/*player icon
                cars and other objects */}
            </div>
            <div className="layer1 row centered">{/* layer 1 (bottom non-board) */}
                <LayerSkeleton lanes={layer1Contents}/>
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
functions made:
    setTileTo(lane, heigth, item to change it to, number of the layer(should only be 1, 2, or 3))

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
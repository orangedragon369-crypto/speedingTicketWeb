// react imports
import { useEffect, useState } from "react";

// image imports:
// white lines
import singleSolidWhite from "../../images/map/map01.png";
import doubleSolidWhite from "../../images/map/map02.png";
import singleDottedWhite from "../../images/map/map00.png";
import doubleDottedWhite from "../../images/map/map03.png";
import solidDottedWhite from "../../images/map/map04.png";

// yellow lines
import singleSolidYellow from "../../images/map/map07.png";
import doubleSolidYellow from "../../images/map/map08.png";
import singleDottedYellow from "../../images/map/map05.png";
import doubleDottedYellow from "../../images/map/map09.png";
import solidDottedYellow from "../../images/map/map06.png";

// map contents
import character from "../../images/models/character.png";
import blankTile from "../../images/models/mapContents0.png";
import purpleItemTile from "../../images/models/mapContents1.png";
import orangeItemTile from "../../images/models/mapContents2.png";
import blueCar from "../../images/models/mapContents3.png";
import greenCar from "../../images/models/mapContents4.png";
import greenBike from "../../images/models/mapContents5.png";
import blueBike from "../../images/models/mapContents6.png";

// other imports
import capitalize from "../../components/capitalize";

export default function GamePage(){

    const [menuDisplay, setMenuDisplay] = useState(true);
    const [hand, setHand] = useState([]);
    let shuffle = [];
    const discard = [];
    
    const allHints = JSON.parse(localStorage.getItem('hints'));
    const cards = JSON.parse(localStorage.getItem('deckOptions')); 
    const deck = JSON.parse(localStorage.getItem('deck'));
    const car = JSON.parse(localStorage.getItem('cars'))[JSON.parse(localStorage.getItem('car'))];
    const perk = JSON.parse(localStorage.getItem("specialties"))[JSON.parse(localStorage.getItem('specialty'))];

    const [isMounted, setISMounted] = useState(false);
    const [addedPerk, setAddedPerk] = useState(false);

    const [turnCount, setTurnCount] = useState(0);
    const [tilesToEscape, setTilesToEscape] = useState(1);
    const [timeThisTurn, setTimeThisTurn] = useState(0);
    const timePerTurn = 15;
    const [cardsLost, setCardsLost] = useState(0);

    const [velocity, setVelocity] = useState(0);
    const [score, setScore] = useState(0);
    const [scoreMult, setScoreMult] = useState(1);
    const [accelerationMod, setAccelerationMod] = useState(car.accelerationMod);

    const [width, setWidth] = useState(() => {
        const localRoad = localStorage.getItem('road');
        return localRoad ? JSON.parse(localRoad) : []; 
    });
    const [height, setHeight] = useState([0, 1, 2]);
    const [layer1Contents, setLayer1Contents] = useState([])
    const [layer2Contents, setLayer2Contents] = useState([])
    const [layer3Contents, setLayer3Contents] = useState([])

    const createGrid = () => {
        if (!Array.isArray(width)) return [];
        let array = Array.from({ length: width.length }, () => Array.from({ length: height.length }, () => blankTile));
        let firstLane = Array.from({ length: height.length-1 }, () => blankTile)
        firstLane.push(character)
        array.push(firstLane)
        return array;
    };

    const updateGrid = () => {
        if (!layer1Contents || !layer1Contents[0])return false;
        const characterLocation = [];
        layer2Contents.forEach((lane, num)=>{
            lane.forEach((object, index)=>{
                if (object == character) {
                    characterLocation.push(num);
                    characterLocation.push(index);
                };
            });
        });
        
        const newGrid1 = layer1Contents.map(lane => [...lane]);
        const newGrid2 = layer2Contents.map(lane => [...lane]);
        const newGrid3 = layer3Contents.map(lane => [...lane]);
            
        newGrid1.map((lane, index)=>{
            if (height.length > lane.length){
                    newGrid1[index].unshift(blankTile);
                    newGrid2[index].unshift(blankTile);
                    newGrid3[index].unshift(blankTile);
            } else if (height.length < lane.length){
                if (characterLocation[1] == 0){
                        newGrid1[index].pop();
                        newGrid2[index].pop();
                        newGrid3[index].pop();
                } else {
                        newGrid1[index].shift();
                        newGrid2[index].shift();
                        newGrid3[index].shift();
                    
                }
            }
        });
        
        if (width.length+1 > layer1Contents.length){
            const extraWidth = Array.from({ length: height.length }, () => blankTile)
            newGrid1.push(extraWidth);
            newGrid2.push(extraWidth);
            newGrid3.push(extraWidth);
        } else if (width.length+1 < layer1Contents.length){
            if (characterLocation[0] == layer1Contents.length-1){
                newGrid1.shift();
                newGrid2.shift();
                newGrid3.shift();
            } else {
                newGrid1.pop();
                newGrid2.pop();
                newGrid3.pop();
            }
        }
        
        setLayer1Contents(newGrid1);
        setLayer2Contents(newGrid2);
        setLayer3Contents(newGrid3);
    }

    const shuffleDeck = ()=>{
        if (shuffle.length > 0) return;
        let cardsToShuffle = {};
        Object.keys(deck).map((card)=>{
            cardsToShuffle[card] = deck[card];
        });
        
        //randomize shuffle order logic
        const cardSet = Object.keys(cardsToShuffle);
        let cardsRemaining = Object.values(cardsToShuffle).reduce((sum, count) => sum + count, 0);
        const deckCount = Object.values(cardsToShuffle).reduce((sum, count) => sum + count, 0); 

        while (cardsRemaining > 0){
            cardsRemaining = Object.values(cardsToShuffle).reduce((sum, count) => sum + count, 0);
            const randInt = Math.floor(Math.random()*deckCount);
            if (cardsToShuffle[cardSet[randInt]] > 0){
                cardsToShuffle[cardSet[randInt]]--;
                shuffle.push(cardSet[randInt]);
            }
        }
    }

    const drawCards = (number)=>{
        if (hand.length >= 8) return alert('Cannot draw more cards right now.');

        const add = [];
        
        for (let x = 0; number > x; x++){
            if (shuffle.length == 0){
                shuffleDeck();
            }
            let addedCard = shuffle.shift();
            add.push(addedCard);
        }
        setHand(prevItems => [...prevItems, add].flat())
    }

    const discardCards = (target)=>{
        const tempHand = [];
        const randInt = Math.floor(Math.random()*hand.length);
        hand.forEach((item, num)=>{
            let condition = true;
            if (target == "hand") condition = false;
            if (target == "random") condition = (randInt!=num)?true:false;
            if (target == "last") condition = (num != hand.length-1)?true:false;
            if (target == "first") condition = (num != 0)?true:false;
            if (target ==  Object) condition = (!target[item] || target[item]<=0)?true:false;
            if (condition){
                tempHand.push(item);
            } else {
                discard.push(item[0]);
            }
        });
        setHand(tempHand);
    }

    const setTileTo = (lane, vert, item, layer)=>{
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
                    laneData.forEach((a, indexI) => {
                        if (vert === indexI) {
                            setTo[index][indexI] = item;
                        }
                    });
                }
            });         
            return setTo;
        }
    }
    const playCard = (func, arg) =>{
        func.forEach((funct, index)=>{
            cardEffectFinder(funct, arg[index])
        });
        
    }

    const cardEffectFinder = (item, args)=>{
        switch (item){
            case "move":
                // mode(%), sum(whole), static(instant move amount)
                // amount ie: -1, 1, 90, 125, velocity
                // how (normal if not given) ie: ghost
                break;
            case "hp":
                // temp
                // amount gain/loss ie: 1
                break;
            case "weight":
                // mod
                // percent ie: 90, 110
                break;
            case "discard":
                // type ie: random
                // count ie: 1
                break;
            case "aoe":
                //  function:type ie: move:sum
                //  amount for func ie: 1
                // area size ie: 1 single square
                break;
            case "score":
                // how ie: multiplier, strait
                // mod
                // 120
                break;
            case "traffic":
                // mod
                // 125
                break;
            case "boardHeight":
                // sum
                // 1
                break;
            case "overboard":
                break;
            case "flight":
                // variable name ie: velocity
                // compare type ie: ==, >=, >
                // variable name/num value ie: takeoffVelocity
                break;
            default:
                break;
        }
    } 

    const addPerk = ()=>{
        cardEffectFinder(perk.function, perk.arg)
    }

    const endGame = ()=>{

    }

    useEffect(()=>{
        if (!addedPerk){
            addPerk();
            setAddedPerk(true);
        }
        setLayer1Contents(createGrid());
        setLayer2Contents(createGrid());
        setLayer3Contents(createGrid());
    }, [])

    useEffect(()=>{
        if (isMounted){
            if (cardsLost >= 1) for (let i = 0; i < Math.floor(cardsLost); i++)discardCards('random');
            setCardsLost(cardsLost+.2);
            setTilesToEscape(Math.floor(tilesToEscape - 1 + cardsLost));
            drawCards(5 - (hand.length));
            setTimeThisTurn(timePerTurn);
        }
    }, [turnCount]);

    useEffect(()=>{
        if (tilesToEscape <= 0) {
            endGame();
        }
    }, [tilesToEscape])

    useEffect( ()=>{
        updateGrid()
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
            default:
                return;
        }
    }

    function Map(){
        return(<div className="layer0 row centered">
            <span className="column tileHalf">
                {height.map((a, index)=>(<img key={'left'+index} src={doubleSolidWhite}/>))}
            </span>
            {width.map((side, i)=>{
                return(<span key={i} className='lane column'>
                    {height.map((a, index)=>(<div className="row tile" key={'tile'+i+index}>
                        <img className="mirrored" src={findImg(side[0])}/>
                        <img src={findImg(side[1])}/>
                    </div>))}
                </span>)
            })}
            <span className="column tileHalf" >
                {height.map((a, index)=>(<img className="mirrored" key={'right'+index} src={doubleSolidWhite}/>))}
            </span>
        </div>)
    } 

    function LayerSkeleton({lanes}){
        return (<>
            {lanes.map((distance, index1)=>{
                return(<div key={'content lane'+index1} className='column'>
                    {distance.map((item, index2)=>{
                        return (<img className="contentImg" key={'contents'+index1+index2} src={item}/>);
                    })}
                </div>)
            })}
        </>)
    }

    function Menu(){
        return(<div className={`pauseMenu flow ${menuDisplay?'see':'noSee'}`}>
            <button onClick={()=>setHeight(prevItems => [...prevItems, height.length])}>height+</button>
            <button onClick={()=>height.length>1?setHeight(prevItems => prevItems.filter((item) => item !== height.length-1)):false}>height-</button>
            <button onClick={()=>setWidth(prevItems => [...prevItems, ["singleDottedWhite","singleDottedWhite"]])}>width+</button>
            <button onClick={()=>width.length>0?setWidth(prevItems => prevItems.filter((i, index) => index !== width.length-1)):false}>width-</button>
            <button onClick={()=>drawCards(5)}>draw</button>
            <button onClick={()=>discardCards('random')}>discard random</button>
            <button onClick={()=>discardCards('hand')}>discard hand</button>
            <button onClick={()=>discardCards('first')}>discard first</button>
            <button onClick={()=>discardCards('last')}>discard last</button>
            <button onClick={()=>shuffleDeck()}>shuffle</button>
            <button onClick={()=>setTileTo(0, 0, orangeItemTile, 1)}>setTileTo test</button>
            <button onClick={()=>setTileTo(0, 0, blankTile, 1)}>un-setTileTo test</button>
        </div>)
    }

    function StartConfirm(){
        return (<div className="pauseMenu">
            <button onClick={()=>{
                setISMounted(true);
                setTurnCount(1)
                }}>Start</button>
        </div>)
    }

    function DisplayHand(){
        return (<div className="row">{hand.map((card, index)=>{
            const hints = {};
            const hasHints = (data)=>{
                if (data) {
                    data.map((hint)=>{
                        hints[hint] = true;
                        hasHints(hint.hint);
                    })
                }
            }

            card = cards[card];

            return (<div onClick={()=>playCard([card.function, card.function2], [[card.arg].flat(), [card.arg2].flat()])} key={'card'+index} className="cards game column">
                <div className="row between">
                    <span>{capitalize(card.id)}</span>
                    <span>{card.cost}</span>
                </div>
                <div>{card.effect}</div>
                {hasHints(card.hint)}
                <div className="hints">{Object.keys(hints).map((a, key)=>{
                    return(<div key={index+key} className="hint">
                        <div>{capitalize(a)}</div>
                        <div>{allHints[a].effect}</div>
                    </div>)
                })}</div>
            </div>);
        })}</div>);
    }

    return(<div className="gamePage">
        {menuDisplay?<Menu/>:<></>}
        {!isMounted?<StartConfirm/>:<></>}
        <div className="topMenu row between">
            <div>{turnCount}</div>
            <div>{tilesToEscape}</div>
            <button onClick={()=>setMenuDisplay(!menuDisplay)}>
                Pause
            </button>
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
                <div className="time">{timeThisTurn}</div>
                <div className="deck centered center column">deck</div>
            </div>
            <DisplayHand/>
            <div className="column">
                <button onClick={()=>setTurnCount(turnCount+1)}>end turn</button>
                <div className="discard centered center column">discard</div>
            </div>
        </div>
    </div>)
}

/* fixes:

*/

/* To Do:
logic
    add sanity check to localstorage and switch pages with massage if fail
    finish play card function
    add car generation on the road
    add perk application 
    add win screen transition
    add velocity and movement logic per turn
    add score increase, decrease, and mod bonus logic and triggers
    add number labels
    add time spending logic
    endGame logic

styling
    add page styling color consistency
    add styling for game page
    add animations for actions 
*/

/* Blue Print

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
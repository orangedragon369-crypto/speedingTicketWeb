import { useEffect, useState } from "react";
import getData from "../../../firebaseStuff/callFirestore";
import capitalize from "../../../components/capitalize"

export default function Deck(){
    const [cardBank, setCardBank] = useState([]);
    const [allHints, setAllHints] = useState({});
    const [deckSet, setDeckSet] = useState({})
    const [deckSize, setDeckSize] = useState(0);
    const [emptyDeck, setEmptyDeck] = useState({});
    const deckMin = 10;
    const deckMax = 40;

    const retrieveData = async ()=>{
        const hintToAdd = {};
        const deck = {};
        const cardPos = {};
        const cards = await getData("Cards");
        const hints = await getData("hints");

        hints.map((data)=>hintToAdd[data.id] = data);
        cards.map((data)=>{
            deck[data.id] = 0;
            cardPos[data.id] = data
        });
        localStorage.setItem("emptyDeck", JSON.stringify(deck));
        localStorage.setItem("hints", JSON.stringify(hintToAdd));
        localStorage.setItem("deckOptions", JSON.stringify(cardPos));
        localStorage.setItem("deck", JSON.stringify(deck));

        setEmptyDeck(deck);
        setDeckSet(deck);
        setAllHints(hintToAdd);
        setCardBank(cardPos);
    }

    const handleChange = (id, num) => {
        if (num>parseInt(cardBank[id].maxCount)) alert("You cannot have more of that card.")
        else {setDeckSet({
            ...deckSet,
            [id]: parseInt(num)
        });}
    };

    useEffect(()=>{
        if (localStorage.getItem('deckOptions')&&localStorage.getItem('hints')){
            setEmptyDeck(JSON.parse(localStorage.getItem('emptyDeck')));
            setDeckSet(JSON.parse(localStorage.getItem('deck')));
            setAllHints(JSON.parse(localStorage.getItem('hints')));
            setCardBank(JSON.parse(localStorage.getItem('deckOptions')));
        } else retrieveData();
    }, [])

    useEffect(()=>{
        let size = 0;
        Object.keys(deckSet).map((key)=>{
            size+=deckSet[key]
        })
        setDeckSize(size)
    }, [deckSet])

    return(<>
        <div className="flow">
            {Object.keys(cardBank).map((card, index)=>{
                const cardInfo = cardBank[card];
                const id = capitalize(cardInfo.id)
                const hints = {};
                const hasHints = (data)=>{
                    if (data) {
                        data.map((hint)=>{
                            hints[hint] = true;
                            hasHints(hint.hint);
                        })
                    }
                }
                return(<div className="column cards" key={index}>
                    <div className="row title">
                        <div><b>{id}</b></div>
                        <div>{cardInfo.cost}</div>
                    </div>
                    <div>{cardInfo.effect}</div>
                    <div>
                        <input 
                            type="number"
                            className="fillH"
                            placeholder="Reply to comment"
                            value={deckSet[cardInfo.id]}
                            onChange={(e) => handleChange(cardInfo.id, e.target.value)}
                        /> <b>/ {cardInfo.maxCount}</b>
                    </div>
                    {hasHints(cardInfo.hint)}
                    <div className="hints">{Object.keys(hints).map((key)=>{
                        return(<div key={index+key} className="hint">
                            <div>{capitalize(key)}</div>
                            <div>{allHints[key].effect}</div>
                        </div>)
                    })}</div>
                </div>);
            })}
        </div>
        <div className="row between">
            <button onClick={()=>retrieveData()}>Think you are missing card options? Click here to reload.</button>
            <button onClick={()=>{
                if (deckSize<deckMin) alert( `Must be at least ${deckMin} cards.`);
                else {
                    localStorage.setItem("deck", JSON.stringify(deckSet))
                    alert('Deck Saved.');
                };
            }}>Set as Current Deck</button>
            <button onClick={()=>{
                localStorage.setItem('deck', JSON.stringify(emptyDeck));
                setDeckSet({
                    brake: 3,
                    gas: 6,
                    inertia: 3,
                    lightenTheLoad: 3,
                    molotov: 3,
                    takeoff: 1,
                    timeSkip: 3,
                    warp: 3,
                })
            }}>Reset Deck</button>
            <div>Minimum card count: {deckMin}</div>
            <div>{deckSize}/{deckMax}</div>
        </div>
    </>);
}
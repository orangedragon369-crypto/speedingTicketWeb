import { useEffect, useState } from "react";
import getData from "../../firebaseStuff/callFirestore";

export default function Deck(){
    const [cardBank, setCardBank] = useState([]);
    const [allHints, setAllHints] = useState({});
    const [deckSet, setDeckSet] = useState({})
    const [deckSize, setDeckSize] = useState(0);
    const deckMin = 10;
    const deckMax = 40;

    const retrieveData = async ()=>{
        const hintToAdd = {};
        const cards = await getData("Cards");
        const hints = await getData("hints");
        const deck = {};

        hints.map((data)=>hintToAdd[data.id] = data);
        localStorage.setItem("hints", JSON.stringify(hintToAdd));
        localStorage.setItem("deckOptions", JSON.stringify(cards));
        localStorage.setItem("deck", JSON.stringify(deck));
        cards.map((data)=>deck[data.id] = 0);

        setDeckSet(deck);
        setAllHints(hintToAdd);
        setCardBank(cards);
    }

    const handleChange = (id, num) => {
        setDeckSet({
            ...deckSet,
            [id]: parseInt(num)
        });
    };

    useEffect(()=>{
        if (localStorage.getItem('deckOptions')&&localStorage.getItem('hints')){
            setDeckSet(JSON.parse(localStorage.getItem('deck')));
            setAllHints(JSON.parse(localStorage.getItem('hints')));
            setCardBank(JSON.parse(localStorage.getItem('deckOptions')));
        } else retrieveData();
    }, [])

    useEffect(()=>{
        // finish logic ***
        setDeckSize(0)
    }, [deckSet])

    const capitalize = (words, result="")=>{
        words.split("").map((letter, count)=>{
            if (/[A-Z]/.test(letter)) result += " ";
            count === 0 ? result += letter.toUpperCase(): result += letter;
        })
        return result
    };

    return(<>
        <div className="flow">
            {cardBank.map((card, index)=>{
                const id = capitalize(card.id)
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
                        <div>{id}</div>
                        <div>{card.cost}</div>
                    </div>
                    <div>{card.effect}</div>
                    <input 
                        type="number"
                        className="fillH"
                        placeholder="Reply to comment"
                        value={deckSet[card.id]}
                        onChange={(e) => handleChange(card.id, e.target.value)}
                    />
                    {hasHints(card.hint)}
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
            <button onClick={()=>localStorage.setItem("deck", JSON.stringify(deckSet))}>Set as Current Deck</button>
            <div>{deckSize}/{deckMax} if less than {deckMin} then red with note: `Must be at least ${deckMin} cards.`</div>
        </div>
    </>);
}
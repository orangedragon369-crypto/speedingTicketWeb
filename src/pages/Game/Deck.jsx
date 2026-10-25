import { useEffect, useState } from "react";
import getData from "../../firebaseStuff/callFirestore";

export default function Deck(){
    const [cardBank, setCardBank] = useState([]);
    const [allHints, setAllHints] = useState([]);

    useEffect(()=>{
        const retrieve = async ()=>{
            const hints = await getData("hints")
            const cards = await getData("Cards");
            console.log(hints, cards);
            setAllHints(hints);
            setCardBank(cards);
        }
        retrieve();
    }, [])

    const capitalize = (words, result="")=>{
        words.split("").map((letter, count)=>{
            if (/[A-Z]/.test(letter)) result += " ";
            count === 0 ? result += letter.toUpperCase(): result += letter;
        })
        return result
    };

    return(<div className="flow">
        {cardBank.map((card, index)=>{
            const id = capitalize(card.id)
            return(<div className="column cards" key={index}>
                <div className="row title">
                    <div>{id}</div>
                    <div>{card.cost}</div>
                </div>
                <div>{card.effect}</div>
                <div>count in deck</div>
                {card.hint?(<div className="hints">{card.hint?.map((hint, index1)=>{
                    let title = capitalize(hint)
                    return (<div className="hint" key={`hint${index},${index1}`}>
                        <div>{title}</div>
                        {allHints.map((rightHint)=>{
                            console.log("is mapping") 
                            if (hint==rightHint.id) return(<div>{rightHint.effect}</div>);
                            return (<></>);
                        })}
                    </div>)
                })}</div>):(<></>)}
            </div>);
        })}
    </div>);
}
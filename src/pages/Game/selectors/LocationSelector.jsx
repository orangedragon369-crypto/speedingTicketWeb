import { useEffect, useState } from "react";
import capitalize from "../../../components/capitalize";
import getData from "../../../firebaseStuff/callFirestore";

export default function LocationSelector(){
    const [localData, setLocalData] = useState({});
    const [currentLocal, setCurrentLocal] = useState("");
    const [localsVisible, setLocalVisible] = useState(false);

    const retrieveData = async ()=>{
        const locals = {};
        const localsTemp = await getData("locations");
        localsTemp.map((data)=>locals[data.id] = data);
        localStorage.setItem("locals", JSON.stringify(locals));
        setLocalData(locals);
    }

    useEffect(()=>{
        if (localStorage.getItem('locals')){
            setLocalData(JSON.parse(localStorage.getItem('locals')));
        } else retrieveData();
    }, [])

    return(<>
        <button onClick={()=>setLocalVisible(!localsVisible)}>Locations</button>
        {localsVisible?(<div className="flow">
            {Object.values(localData).map((local, index)=>{
                return(<div className="column cards" key={index}>
                    <div>{capitalize(local.id)}</div>
                    <div className="column">
                        {local.features.map((feat, index)=>{
                            return(<div key={index+"feat"} className="row">
                                {feat}: {local.effect[index]}
                            </div>)
                        })}
                    </div>
                    <button onClick={()=>{
                        setCurrentLocal(local.id);
                        localStorage.setItem('road', JSON.stringify(local.road.map((type=String)=>{
                            return type.split("/")
                        })));
                        localStorage.setItem("local", JSON.stringify(local.id))
                    }}>{currentLocal==local.id?"Saved":"Save as Location"}</button>
                </div>);
            })}
        </div>):<>{currentLocal}</>}
    </>)
}
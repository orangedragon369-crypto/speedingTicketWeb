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
            {Object.keys(localData).map((local, index)=>{
                const localInfo = localData[local];
                const id = capitalize(localInfo.id)
                return(<div className="column cards" key={index}>
                    <div>{id}</div>
                    <div className="column">
                        {localInfo.features.map((feat, index)=>{
                            return(<div key={index+"feat"} className="row">
                                {feat}: {localInfo.effect[index]}
                            </div>)
                        })}
                    </div>
                    <button onClick={()=>{
                        setCurrentLocal(id);
                        localStorage.setItem('road', JSON.stringify(localInfo.road.map((type=String)=>{
                            console.log(type, type.split("/"))
                            return type.split("/")
                        })));
                        localStorage.setItem("local", JSON.stringify(localInfo.id))
                    }}>{currentLocal==id?"Saved":"Save as Location"}</button>
                </div>);
            })}
        </div>):<>{currentLocal}</>}
    </>)
}
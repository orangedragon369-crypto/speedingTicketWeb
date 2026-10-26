import { useEffect, useState } from "react";
import capitalize from "../../../components/capitalize";
import getData from "../../../firebaseStuff/callFirestore";

export default function CarSelector(){
    const [carData, setCarData] = useState({});
    const [currentCar, setCurrentCar] = useState("");
    const [carsVisible, setCarsVisible] = useState(false);

    const retrieveData = async ()=>{
        const cars = {};
        const carsTemp = await getData("cars");
        carsTemp.map((data)=>cars[data.id] = data);
        localStorage.setItem("cars", JSON.stringify(cars));
        setCarData(cars);
    }

    useEffect(()=>{
        if (localStorage.getItem('cars')){
            setCarData(JSON.parse(localStorage.getItem('cars')));
        } else retrieveData();
    }, [])

    return(<>
        <button onClick={()=>setCarsVisible(!carsVisible)}>Cars</button>
        {carsVisible?(<div className="flow">
            {Object.keys(carData).map((car, index)=>{
                const carInfo = carData[car];
                const id = capitalize(carInfo.id)
                return(<div className="column cards" key={index}>
                    <div>{id}</div>
                    <div>Acceleration Mod: {carInfo.accelerationMod}</div>
                    <div>Hit Points: {carInfo.hp}</div>
                    <div>Weight: {carInfo.weight}</div>
                    <button onClick={()=>{
                        setCurrentCar(id);
                        localStorage.setItem("car", JSON.stringify(carInfo.id))
                    }}>{currentCar==id?"Saved":"Save as car"}</button>
                </div>);
            })}
        </div>):<>{currentCar}</>}
    </>)
}
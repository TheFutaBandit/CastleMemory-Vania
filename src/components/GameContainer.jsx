import { useState } from "react";
import CardContainer from "./CardContainer.jsx"
import SymbolContainer from "./SymbolContainer.jsx"

export default function GameContainer() {
    const [level, setLevel] = useState(0);

    function resetLevel() {
        setLevel(0);
    }


    function incrementLevel() {
        setLevel((prevLevel) => prevLevel + 1);
    }

    return (
        <div className = "GameContainer">
            <CardContainer level = {level} reset = {resetLevel} increment = {incrementLevel}/>
            <SymbolContainer level = {level} />
        </div>
    );
}
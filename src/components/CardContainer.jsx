import { useState } from "react";
import "../styles/CardContainerStyles.css"

function Card({CardName, CardUrlName = "trevor", shuffle, obj, lossCondition, increment, level}) {
    const imageSource = `src/assets/images/${CardUrlName}.png`;

    const checkFlag = () => {
        if(level === 3) {
            toggleWinCondition();
            return false;
        }
        if(obj.flag === 1) {
            lossCondition();
            return false;
        }
        return true;
    }

    const toggleFlag = () => {
        obj.flag = 1;        
    }

    return (
        <div 
            className ="card" 
            onClick = {() => {
                if(checkFlag()) {
                increment();
                toggleFlag();
                shuffle();
                }
            }}>
            <img src = {imageSource} alt= "Trevor Belmont" className = "card-image" />
            <div className = "card-overlay" ></div>
            <div className = "card-text">{CardName}</div>
        </div>
    )
}

const cardList = [
    {
        id: "trevor",
        cardName : "TREVOR BELMONT",
        cardUrlName : "trevor",
        flag: 0,
    },
    {
        id: "sypha",
        cardName : "SYPHA BELNADES",
        cardUrlName : "sypha",
        flag: 0,
    },
    {
        id: "alucard",
        cardName : "ALUCARD TEPES",
        cardUrlName : "alucard",
        flag: 0,
    },
    {
        id: "dracula",
        cardName : "DRACULA TEPES",
        cardUrlName : "dracula",
        flag: 0,
    },
]

function LossDiv({toggleRestart, winCondition}) {
    return (
        (winCondition === false) 
        ? <div className = "Loss">
            <h1>You have lost. Click to restart!</h1>
            <button onClick={() => toggleRestart()}>restart</button>
        </div>
        : <div className = "Win">
            <h1>You have won. Click to restart!</h1>
            <button onClick={() => toggleRestart()}>restart</button>
        </div>
    )
}


export default function CardContainer({level, reset, increment}) {
    const [list, setList] = useState([...cardList.map((card) => ({...card}))]);
    const [gameCondition, setGameCondition] = useState(true);

    function toggleLossCondition() {
        setGameCondition(false);
    }

    function toggleRestartCondition() {
        setList([...cardList.map((card) => ({...card}))]);
        setGameCondition(true);
        reset();
    }

    function shuffleList() {
        let array = list;

        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        console.log(array);
        setList([...array]);
    }

    return (
        
        <div className = "card-container">
           {(gameCondition) 
                            ? list.map((item, index) => {
                                return  <Card 
                                            key = {index} 
                                            CardName = {item.cardName} 
                                            CardUrlName={item.cardUrlName}
                                            shuffle = {shuffleList} 
                                            obj = {item}
                                            lossCondition = {toggleLossCondition}
                                            increment = {increment}
                                            level = {level}
                                        />})   
                            : <LossDiv toggleRestart = {toggleRestartCondition} />}
        </div>
    )
}




import { useState } from "react";
import { useEffect } from "react";
import "../styles/CardContainerStyles.css"

function Card({CardName, CardUrlName = "trevor", shuffle, obj, toggleLossCondition, increment, level}) {
    const imageSource = `src/assets/images/${CardUrlName}.png`;

    const checkFlag = () => {
        if(level === 3) {
            toggleLossCondition();
            return false;
        }
        if(obj.flag === 1) {
            toggleLossCondition();
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
                checkFlag() 
                increment();
                toggleFlag();
                shuffle(); 
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

function LossDiv({ toggleRestart, winCondition }) {
    const [imgSrc, setImgSrc] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function fetchData() {
            try {
                // const response = await fetch(
                //     `https://api.giphy.com/v1/gifs/translate?api_key=${process.env.API_KEY}&s=${winCondition ? "winner" : "loser"}`,
                //     { mode: "cors", signal }
                // );
                // const data_json = await response.json();
                // if (data_json.data && data_json.data.images) {
                //     setImgSrc(data_json.data.images.original.url);
                // }
                setImgSrc("https://giphy.com/gifs/netflix-sigh-uh-trevor-wsZ6ysousRXKVv7oke");
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Fetch error:", error);
                }
            }
        }

        fetchData();

        return () => {
            controller.abort();
        };
    }, [winCondition]);

    return (
        <div className="Loss">
            <h1>{winCondition ? "You have won. Click to restart!" : "You have lost. Click to restart!"}</h1>
            {/* <img src={imgSrc} className ="gif" alt="GIF" /> */}
            <h2>pretend its a gif here, I don't know why I can't put my API_KEY in the .env</h2>
            <button onClick={toggleRestart}>Restart</button>
        </div>
    );
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
                                            toggleLossCondition = {toggleLossCondition}
                                            increment = {increment}
                                            level = {level}
                                        />})   
                            : <LossDiv toggleRestart = {toggleRestartCondition} winCondition={level >= 3}/>}
        </div>
    )
}




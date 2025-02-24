import { Component } from 'react';
import Logo1 from "../assets/images/logo_1.svg?react";
import Logo2 from "../assets/images/logo_2.svg?react";
import Logo5 from "../assets/images/logo_3.svg?react";
import Logo3 from "../assets/images/logo_4.svg?react";
import Logo4 from "../assets/images/logo_5.svg?react";
import "../styles/symbolContainerStyles.css";


const symbolList = [
    {
        imageName: "logo_1",
        Component: Logo1,
        item_number: 0,
    },
    {
        imageName: "logo_2",
        Component: Logo2,
        item_number: 1,
    },
    {
        imageName: "logo_5",
        Component: Logo5,
        item_number: 4,
    },
    {
        imageName: "logo_3",
        Component: Logo3,
        item_number: 2,
    },
    {
        imageName: "logo_4",
        Component: Logo4,
        item_number: 3,
    },
    
];

function Symbol({Component, isLit, index}) {
    const defaultColor = "#808080";
    const litColor = "#FFB042";

    return (
        <div className={`logo ${isLit ? 'lit' : ''}`}>
            <Component style={{ 
                fill: isLit ? litColor : defaultColor,
                transition: 'fill 0.3s ease',
                animation: isLit ? 'lightUp 0.5s ease' : 'none'
            }} />
        </div>
    );
}

export default function SymbolContainer({level}) {
    console.log(level);
    return (
        <div className = "footer-logos">
            {symbolList.map((item, index) => {
                return <Symbol 
                    key = {item.imageName} 
                    Component={item.Component}
                    isLit = {Number(item.item_number) < level}
                    index = {index}
                    />
            })}
        </div>
    )
}
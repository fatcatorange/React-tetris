import React from "react";
import './TetrisGame.css'

export default function PaintScore(props){
    return (
    <div>
        <div>{props.score}</div>
        <div>{props.clearLine}</div>
        <div>{props.level}</div>
    </div>)
}
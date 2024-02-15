import React from "react";
import './TetrisGame.css'
import './PaintScore.css'

export default function PaintScore(props){
    return (
    <div className="score-and-level-container">
        <div className="score-panel">score:{props.score}</div>
        <div className="cleanLine-panel">clean line:{props.clearLine}</div>
        <div className="level-panel">level:{props.level}</div>
    </div>)
}
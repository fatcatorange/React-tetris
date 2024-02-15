import React from "react";
import './GameOverPanel.css';
import './TetrisGame.css'

export default function GameOverPanel(props){


    return (
        <div className="game-over-panel">
            <div className="reset-button">你掛了 要重玩嗎</div>
            <div className="button-panel">
                <button className="reset-button" onClick = {props.resetGame}>好啊</button>
                <button className="reset-button" >不要</button>
            </div>
            
        </div>
    )
}
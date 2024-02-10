import React from "react";
import './TetrisGame.css'

export default function PaintTetris(props){
    let allBrick = [];
    for(let i=0;i<props.board.length;i++)
    {
        for(let j=0;j<props.board[i].length;j++)
        {
            allBrick.push(<div key={i+","+j} className="brick"></div>)
        }
    }

    for(let i=0;i<props.nowBrick.length;i++)
    {
        const rowIndex = props.nowBrick[i][0];
        const colIndex = props.nowBrick[i][1];
        const index = 10 * rowIndex + colIndex;
        allBrick[index] = (<div key={index} className="white-brick"></div>);
        console.log(rowIndex,colIndex)
    }

    //console.log(props.board)
    return (<div className="game-board">
        {allBrick}
    </div>)
}
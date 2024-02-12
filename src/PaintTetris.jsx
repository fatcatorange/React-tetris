import React from "react";
import './TetrisGame.css'

export default function PaintTetris(props){
    let allBrick = [];
    for(let i=0;i<props.board.length;i++)
    {
        let check = true;
        for(let j=0;j<props.board[i].length;j++)
        {
            if(props.board[i][j] === 0 )
            {
                check = false;
                break;
            }
        }
        for(let j=0;j<props.board[i].length;j++)
        {
            if(props.board[i][j] == 0)
                allBrick.push(<div key={i+","+j} className="brick"></div>)
            else
            {
                
                if(check === true)
                    allBrick.push(<div key={i+","+j} className="clean-brick "></div>)
                else
                    allBrick.push(<div key={i+","+j} className="white-brick "></div>)
            }
        }
    }

    for(let i=0;i<props.nowBrick.length;i++)
    {
        const rowIndex = props.nowBrick[i][0];
        const colIndex = props.nowBrick[i][1];
        if(props.board[rowIndex][colIndex] === 0)
        {
            const index = 10 * rowIndex + colIndex;
            allBrick[index] = (<div key={index} className="white-brick"></div>);
        }
        //console.log(rowIndex,colIndex)
    }

    //console.log(props.board)
    return (<div className="game-board">
        {allBrick}
    </div>)
}
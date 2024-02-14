import React from "react";
import './TetrisGame.css'

export default function PaintNextBrick(props){

    let board = []
    for(let i=0;i<6;i++)
    {
        let rowBoard = []
        for(let j=0;j<5;j++)
        {
            rowBoard.push(<div className="brick"></div>)
        }
        board.push(rowBoard)
    }

    let brickType = props.nextBrickType

    if(brickType === 0)
    {
        board[1][2] = (<div className="I-brick"></div>)
        board[2][2] = (<div className="I-brick"></div>)
        board[3][2] = (<div className="I-brick"></div>)
        board[4][2] = (<div className="I-brick"></div>)
    }
    else if(brickType === 1)
    {
        board[2][2] = (<div className="O-brick"></div>)
        board[3][2] = (<div className="O-brick"></div>)
        board[3][3] = (<div className="O-brick"></div>)
        board[2][3] = (<div className="O-brick"></div>)
    }
    else if(brickType === 2)
    {
        board[1][2] = (<div className="J-brick"></div>)
        board[2][2] = (<div className="J-brick"></div>)
        board[3][2] = (<div className="J-brick"></div>)
        board[3][1] = (<div className="J-brick"></div>)
    }
    else if(brickType === 3)
    {
        board[1][2] = (<div className="L-brick"></div>)
        board[2][2] = (<div className="L-brick"></div>)
        board[3][2] = (<div className="L-brick"></div>)
        board[3][3] = (<div className="L-brick"></div>)
    }
    else if(brickType === 4)
    {
        board[2][3] = (<div className="S-brick"></div>)
        board[2][2] = (<div className="S-brick"></div>)
        board[3][2] = (<div className="S-brick"></div>)
        board[3][1] = (<div className="S-brick"></div>)
    }
    else if(brickType === 5)
    {
        board[2][1] = (<div className="Z-brick"></div>)
        board[2][2] = (<div className="Z-brick"></div>)
        board[3][2] = (<div className="Z-brick"></div>)
        board[3][3] = (<div className="Z-brick"></div>)
    }
    else
    {
        board[2][2] = (<div className="T-brick"></div>)
        board[3][1] = (<div className="T-brick"></div>)
        board[3][2] = (<div className="T-brick"></div>)
        board[3][3] = (<div className="T-brick"></div>)
    }


    return (
        <div className="nextBrickDisplay">
            {board}
        </div>
    )
}
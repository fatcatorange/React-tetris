import React from "react";
import PaintTetris from "./PaintTetris";
import './TetrisGame.css'

export default function TetrisGame(){
    const [board,setBoard] = React.useState(()=>{
        let tempBoard = []
        for(let i =0;i<20;i++)
        {
            let tempBoardInside = []
            for(let j=0;j<10;j++)
            {
                tempBoardInside.push(0)
            }
            tempBoard.push(tempBoardInside)
        }
        return tempBoard
    });

    const [nowBrick,setNowBrick] = React.useState([[0,0],[0,1],[0,2],[0,3]])

    let intervalID = ""
    React.useEffect(()=>{
            clearInterval(intervalID)
            intervalID = setInterval(function(){
            dropBrick()
        },1000)
        
    },[])
    
    function dropBrick(){
        setNowBrick((prev)=>{
            let tempBrick = prev.map((element)=>([element[0] + 1, element[1]]))
            return tempBrick
        })
    }

    return (
        <div>
            <PaintTetris board  = {board} nowBrick = {nowBrick}/>
        </div>
    )
}
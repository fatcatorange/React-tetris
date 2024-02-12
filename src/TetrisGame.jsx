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

    const [nowBrick,setNowBrick] = React.useState([[0,4],[1,4],[2,4],[2,5]])
    const [cleaning,setCleaning] = React.useState(false)
    const [brickType,setBrickType] = React.useState([[[0,5],[1,5],[2,5],[3,5]],[[0,4],[0,5],[1,4],[1,5]],
        [[0,5],[1,5],[2,5],[2,4]],[[0,4],[1,4],[2,4],[2,5]],[[0,4],[0,5],[1,4],[1,3]],[[0,4],[0,5],[1,5],[1,6]],[[1,4],[1,5],[1,6],[0,5]]])
    const [nowBrickType,setNowBrickType] = React.useState(3)
    const [nowBrickDir,setNowBrickDir] = React.useState(0)
    const [canRotate,setCanRotate] = React.useState(true)


    let intervalID = ""
    React.useEffect(()=>{
            if(intervalID !== "")
            {
                return;
            }
            clearInterval(intervalID)
            intervalID = setInterval(function(){
                setCleaning((prev) => {
                    if(prev === false)
                    {
                        dropBrick()
                    }
                    return prev;
                })
        },400)
    },[])
    

    function dropBrick(){
        setNowBrick((prev)=>{
            let tempBrick = prev.map((element)=>([element[0] + 1, element[1]]))
            return tempBrick
        })
    }
    
    function setDownBrick(){
        for(let i=0;i<nowBrick.length;i++)
        {
            board[nowBrick[i][0]][nowBrick[i][1]] = 1;
        }
        //console.log(board)
        
    }

    React.useEffect(checkDownBrick,[nowBrick])

    function checkDownBrick(){
        //console.log(nowBrick)
        for(let i=0;i<nowBrick.length;i++)
        {
            if((nowBrick[i][0] === 19 || board[nowBrick[i][0] + 1][nowBrick[i][1]] !== 0) && cleaning === false)
            {
                setCleaning(true)
                setDownBrick();
                setTimeout(setNewBrick,1000)
                break;
            }
        }
    }

    function setNewBrick(){
        cleanBrick();
        setNowBrick(generateNewBrick());
        setCleaning(false)
    }

    function generateNewBrick(){
        //console.log(brickType)
        const randomNumber = Math.floor(Math.random() * brickType.length);
        setNowBrickType(randomNumber)
        setNowBrickDir(0)
        const temp = brickType[randomNumber].map(element=>(element))
        return temp;
    }
    

    React.useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === "ArrowUp" && canRotate === true) {
            console.log(nowBrickDir)
            rotateBrick();
          } else if (event.key === "ArrowDown" && cleaning === false) {
            moveDown();
          } else if (event.key === "ArrowLeft" && cleaning === false ) {
            moveLeft();
          } else if (event.key === "ArrowRight" && cleaning === false) {
            moveRight();
          }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [nowBrick,cleaning,nowBrickDir,nowBrickType]);

    function checkValidRotate(prev,temp,nowBrickDir){
        console.log(prev,temp)
        for(let i=0;i<4;i++)
            {
                if(temp[i][1] < 0 || temp[i][1] > 9 || temp[i][0] >= 19 ||
                    (temp[i][1] >= 0 && board[temp[i][0]][temp[i][1]] !== 0) )
                {
                    return prev
                }
                if(( board[temp[i][0]][temp[i][1]] !== 0))
                {
                    return prev
                }
                if((board[nowBrick[i][0]][nowBrick[i][1]] !== 0))
                {
                    return prev
                }

            }
            
            setNowBrickDir((last)=>{
                if((nowBrickDir + 1)%4 === last )
                {
                    return last;
                }
                else
                {
                    setCanRotate(false)
                    setTimeout(()=>setCanRotate(true),100)
                    return (nowBrickDir + 1)%4
                }
            })
            return temp;
    }

    function IbrickRoatate(prev)
    {
        const nowDir = nowBrickDir;
        if(nowBrickDir%2 === 0)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
    }

    function JbrickRotate(prev){
        const nowDir = nowBrickDir;
        if(nowBrickDir%4 === 0)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 1)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 2)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
    }

    function LbrickRotate(prev){
        const nowDir = nowBrickDir;
        if(nowBrickDir%4 === 0)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 1)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]+2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]+1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]-1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else if(nowBrickDir%4 === 2)
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]-2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]-1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]-1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
        else
        {
            const checkBrick = prev.map((element,index) => {
                if(index === 0)
                {
                    return [element[0]-2,element[1]+2];
                }
                else if(index === 1)
                {
                    return [element[0]-1,element[1]+1];
                }
                else if(index === 2)
                {
                    return element;
                }
                else
                {
                    return [element[0]+1,element[1]+1];
                }
            })
            return checkValidRotate(prev,checkBrick,nowDir)
        }
    }

    function rotateBrick(){
        setNowBrick((prev)=>{
            if(nowBrickType === 0)
            {
                return IbrickRoatate(prev);   
            }
            else if(nowBrickType === 1)
            {
                return prev;
            }
            else if(nowBrickType === 2)
            {
                return JbrickRotate(prev)
            }
            else if(nowBrickType === 3)
            {
                return LbrickRotate(prev)
            }
        })
    }

    

    function moveRight(){
        setNowBrick((prev)=>{
            let temp = prev.map((element)=>[...element]);
            for(let i=0;i<4;i++)
            {
                if(temp[i][1] >= 9 || (temp[i][1] < 9 && board[temp[i][0]][temp[i][1]+1] !== 0))
                {
                    return prev
                }
                temp[i][1]++;
            }
            return temp;
        })
    }  
    function moveLeft(){
        setNowBrick((prev)=>{
            let temp = prev.map((element)=>[...element]);
            for(let i=0;i<4;i++)
            {
                if(temp[i][1] <= 0 || (temp[i][1] > 0 && board[temp[i][0]][temp[i][1]-1] !== 0) )
                {
                    return prev
                }
                temp[i][1]--;
            }
            return temp;
        })
    }  
    function moveDown(){
        setNowBrick((prev)=>{
            let temp = prev.map((element)=>[...element]);
            for(let i=0;i<4;i++)
            {
                temp[i][0]++;
            }
            return temp;
        })
    }  
    
    function cleanBrick(){
        setBoard((prev)=>{
            let newBoard = []
            for(let i=prev.length-1;i>=0;i--)
            {
                let check = true;
                for(let j=0;j<prev[i].length;j++)
                {
                    if(prev[i][j] === 0)
                    {
                        check = false;
                        break;
                    }
                }
                if(check === false)
                {
                    newBoard.push(prev[i]);
                }
            }
            while(newBoard.length < 20)
            {
                let temp = []
                for(let i=0;i<10;i++)
                {
                    temp.push(0);
                }
                newBoard.push(temp);
            }
            return newBoard.reverse()
        })
        
    }

    return (
        <div>
            <PaintTetris board  = {board} nowBrick = {nowBrick}/>
        </div>
    )
}
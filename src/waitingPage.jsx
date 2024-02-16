import React from "react";
import './HomePage.css'
import TetrisLogo from './image/tetris-logo.png'
import waitingPepe from './image/pepe-wait.gif'
import questionMark from './image/question-mark.png'
import { waitingListCollection,gameRoomColloection, db } from "./firebase"
import {
    onSnapshot,
    addDoc,
    doc,
    deleteDoc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
    getDoc
} from "firebase/firestore"

export default function WaitingPage(props){

    let finding = false;

    React.useEffect(()=>{
        let unsub = ()=>{};
        getDocs(collection(db,"waitingList"))
        .then((waitingList)=>{
            if(finding === true)
            {
                return;
            }
            finding = true
            if(waitingList.docs.length === 0)
            {
                const gameRoomItem = {
                    user1:"jimmy",
                    user2:"hank"
                }
                addDoc(collection(db,"gameRoom"),gameRoomItem)
                .then((roomID)=>{
                    const waitingItem = {
                        roomID:roomID.id,
                    }
                    addDoc(collection(db,"waitingList"),waitingItem)
                    .then((waitingRoomID)=>{
                        const unsubscribe = onSnapshot(waitingListCollection, function (snapshot){
                            //console.log(waitingRoomID.id)
                            const findRef = doc(db,"waitingList",waitingRoomID.id)
                            getDoc(findRef)
                            .then((findDoc)=>{
                                if(findDoc.exists() === false)
                                {
                                    unsubscribe();
                                    props.startMultiplayerMode();
                                }
                            })
                        })
                        
                    })
                })
                
            }
            else
            {
                const roomID = waitingList.docs[0].id;
                const docRef = doc(db,"waitingList",roomID)
                deleteDoc(docRef)
                .then(()=>{
                    props.startMultiplayerMode();
                })
            }
        })
        return unsub;
    },[])

    return (
        <div>
            <div className="tetris-title">
                <div className="button-container">
                    <button className="back-button" onClick={props.backToHomePage}>back to home page</button>
                </div>
                <img src={TetrisLogo} className="tetris-logo" />
                <div></div>
            </div>

            <div className="waiting-panel">
                <div className="waiting-image-container">
                    <img src={waitingPepe} className="waiting-image"/>
                </div>
                <div className="waiting-image-container">
                    <img src={questionMark} className="waiting-image"/>
                </div>
            </div>
            
        </div>
    )
}

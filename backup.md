import React from "react"
import clsx from 'clsx';
import { languages } from "./languages"

export default function App (){
    const [currentWorld, setCurrentWorld] = React.useState("fardad")
    const [guessedLetter, setGuessedLetter] = React.useState([])

    const languagesChips = languages.map((item) => {
        const styles = {
        backgroundColor: item.backgroundColor,
        color: item.color
    }
       return <span 
       style={styles}
       key={item.name}
       >
        {item.name}</span>
    })

    const letters = currentWorld.split("").map((letter, index)=> {
        return <span key={index}>{letter.toUpperCase()}</span>
    })
    
    // console.log(letters[0].props.children);
    // console.log(Object.entries(languages[0]));
    
    
    
    function Hand (letter, event){
        const targetElement = event.target;
        console.log(targetElement);
        
        setGuessedLetter(preLetter => {
           return preLetter.includes(letter) ? preLetter : [...preLetter, letter]
         })

        //  if (currentWorld.includes(letter)){
        //     console.log("green");
        //  }else {
        //     console.log("red");
        //  }
        //  clsx(currentWorld.includes(letter) && ".keyboard button.green")
        const newClass = clsx(
            "btn",
            currentWorld.includes(letter) && "green",
            !currentWorld.includes(letter) && "red"
        )

        targetElement.classList = newClass
}
    
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const keyboard = alphabet.split("").map((letter) => {
        return <button id="btnEl" className="btn"
        onClick={(event)=> Hand (letter, event)} key={letter}>
        
            {letter.toUpperCase()}
        

        </button>
    })
    // console.log(keyboard);
    
    
    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attemps to keep the programming world safe from Assembly</p>
            </header>
            <section className="game-status">
                    <h2>You Win</h2>
                    <p>Welldone</p>
            </section>
            <section className="languages-container">
                {languagesChips}
            </section>
            <section className="word-container">
                {letters}
            </section>
            <section className="keyboard">
                {keyboard}
            </section>
            <button className="new-game">New Game</button>
        </main>
    )
}




back up # 2

import React from "react"
import clsx from 'clsx';
import { languages } from "./languages"

export default function App (){
    const [currentWorld, setCurrentWorld] = React.useState("fardad")
    const [guessedLetter, setGuessedLetter] = React.useState([])

    const languagesChips = languages.map((item) => {
        const styles = {
        backgroundColor: item.backgroundColor,
        color: item.color
    }
       return <span 
       style={styles}
       key={item.name}
       >
        {item.name}</span>
    })

    const letters = currentWorld.split("").map((letter, index)=> {
        const rightW = []
        if (currentWorld.includes(letter)){
            rightW.push(letter)
        }
        console.log(rightW);
        
        return <span key={index}>{rightW}</span>
    })
    
    // console.log(letters[0].props.children);
    // console.log(Object.entries(languages[0]));
    
    
    
    function Hand (letter, event){
        const targetElement = event.target;
        // console.log(targetElement);
        
        setGuessedLetter(preLetter => {
           return preLetter.includes(letter) ? preLetter : [...preLetter, letter]
         })

        //  if (currentWorld.includes(letter)){
        //     targetElement.classList.add("green")
        //  }else {
        //     targetElement.classList.add("red")
        //  }
        //  clsx(currentWorld.includes(letter) && ".keyboard button.green")


        // const newClass = clsx(
        //     "btn",
        //     currentWorld.includes(letter) && "green",
        //     !currentWorld.includes(letter) && "red"
        // )

        // targetElement.classList = newClass
}
    
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const keyboard = alphabet.split("").map((letter) => {
        const isGuessed = guessedLetter.includes(letter);
        const isCorrect = isGuessed && currentWorld.includes(letter)
        const isWrong = isGuessed && !currentWorld.includes(letter)
        const classNaame = clsx(
            {
            green: isCorrect,
            red: isWrong
        }

        )
        return <button className={classNaame}
        onClick={(event)=> Hand (letter, event)} key={letter}>
        
            {letter.toUpperCase()}

        </button>
    })
    // console.log(keyboard);
    
    
    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attemps to keep the programming world safe from Assembly</p>
            </header>
            <section className="game-status">
                    <h2>You Win</h2>
                    <p>Welldone</p>
            </section>
            <section className="languages-container">
                {languagesChips}
            </section>
            <section className="word-container">
                {letters}
            </section>
            <section className="keyboard">
                {keyboard}
            </section>
            <button className="new-game">New Game</button>
        </main>
    )
}
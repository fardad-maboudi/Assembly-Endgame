import React from "react"
import clsx from 'clsx';
import { languages } from "./languages"
import { getFarewellText, getARandomWord } from "./utils";
import Confetti from 'react-confetti'
export default function App (){
    
    // state values
    const [currentWorld, setCurrentWord] = React.useState(() =>getARandomWord())
    const [guessedLetter, setGuessedLetter] = React.useState([])

    // derived values
    const filterGuess = guessedLetter.filter(item => {
        return !currentWorld.includes(item)
    })
    let wrongGuessedCount = filterGuess.length;
    
    const isGameWon = currentWorld.split("").every(item => guessedLetter.includes(item))
    const isGameLost = wrongGuessedCount >= (languages.length - 1)
    const isGameOver = isGameWon || isGameLost
    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        notOver: guessedLetter.length > 0 && !isGameOver,
        lost: isGameLost,
    })
    
    function renderGameStatus() {
        if (!isGameOver) {
            let customIndex = wrongGuessedCount -1
            const fareWell = wrongGuessedCount > 0 ? getFarewellText(languages[customIndex].name) : wrongGuessedCount
            if (guessedLetter.length ===0) {
                return null
            }
            if (guessedLetter.length > 0 && !currentWorld.includes(guessedLetter[guessedLetter.length -1])){
            // if(wrongGuessedCount > 0){
                
                return (
                    <p>{fareWell}</p>
                )
            }else { 
                return <p className="notOver">That was Correct! 👏</p>
            }
        }
        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }
    // static values
    const languagesChips = languages.map((item, index) => {
        
        const className2 = index < wrongGuessedCount ? "lost" : "";
    
        const styles = {
        backgroundColor: item.backgroundColor,
        color: item.color
    }
       return <span
       className={`chip ${className2}`}
        // className="chip"
       id="chip"
       style={styles}
       key={item.name}
       >
        {item.name}</span>
    })
    
    const letters = currentWorld.split("").map((letter, index)=> {
        const letterClassName = clsx(
            isGameLost && !guessedLetter.includes(letter) && "missed-letter"
        )
        if(!isGameOver){
            return <span className={letterClassName} key={index}>{(guessedLetter.includes(letter)) ? letter.toUpperCase() : ""}</span>
        }
        if(isGameLost){
            return <span className={letterClassName} key={index}>{letter.toUpperCase()}</span>
        }
        if (isGameWon){
            return <span key={index}>{letter.toUpperCase()}</span>
        }
    })

    function Hand (letter, event){
        const targetElement = event.target;
        setGuessedLetter(preLetter => {
           return preLetter.includes(letter) ? preLetter : [...preLetter, letter]
         })
}
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const isDisabled = isGameOver ? true : false;
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
        return <button 
        disabled={isDisabled}
        className={classNaame}
        aria-disabled={guessedLetter.includes(letter)}
        aria-label={`Letter ${letter}`}
        onClick={(event)=> Hand (letter, event)} key={letter}>
        
            {letter.toUpperCase()}
        </button>
    })
    function newGame () {
        setCurrentWord(getARandomWord())
        setGuessedLetter([])
    }
    return (
        <main>
            {
            isGameWon && 
                <Confetti
                    recycle={false}
                    numberOfPieces={1000 }
                />}
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attemps to keep the programming world safe from Assembly</p>
            </header>
            <section 
            aria-live="polite" 
            role="status" 
            className={gameStatusClass}>
                        {renderGameStatus()}
            </section>
            <section className="languages-container">
                {languagesChips}
            </section>
            <section className="word-container">
                {letters}
            </section>
            <section 
                className="sr-olny" 
                aria-live="polite" 
                role="status"
            >
                <p>Current Word: {currentWorld.split("").map(letter => 
                    guessedLetter.includes(letter) ? letter : "blank"
                ).join(" ")}</p>
            </section>

            <section className="keyboard">
                {keyboard}
            </section>
            {isGameOver && <button onClick={newGame} className="new-game">New Game</button>}
        </main>
    )
}
const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost
    })

    function renderGameStatus() {
        if (!isGameOver) {
            return null
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        } else {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }
    }

    my solution

    let isGameOverStatus = {
        className: "",
        header: "",
        message: ""
    };

    const isGameLostStatus = {
        class: "red",
        header: "Game Over!",
        message: "You lose! Better Start Learn Assembly!"
    }
    const isGameWonStatus = {
        class: "green",
        header: "You Win",
        message: "Welldone!"
    }
    const isGameLost = wrongGuessedCount >= (languages.length - 1)
    const isGameOver = isGameWon || isGameLost
    console.log(isGameLost);
    if(!isGameOver){
        
    }else if (isGameWon){
        isGameOverStatus.className = isGameWonStatus.class;
        isGameOverStatus.header = isGameWonStatus.header;
        isGameOverStatus.message = isGameWonStatus.message
    } else if (isGameLost) {
        isGameOverStatus.className = isGameLostStatus.class;
        isGameOverStatus.header = isGameLostStatus.header;
        isGameOverStatus.message = isGameLostStatus.message
    }

    <section className={`game-status ${isGameOverStatus.className}`}>
                    {
                        isGameOver &&
                        <>
                        <h2>{isGameOverStatus.header}</h2>
                        <p>{isGameOverStatus.message}</p>
                    </>
                    }
            </section>
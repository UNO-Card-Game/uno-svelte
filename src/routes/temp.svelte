<script lang="ts">
    import { onMount } from "svelte";
    import "nes.css/css/nes.min.css";

    let connectionInfo = {
        player_name: "aaaa",
        room_id: 80,
        max_players: 2,
        players: ["aaaa", "bbbbaaa"],
    };

    let gameState = {
        player_name: {
            Name: "aaaa",
            Cards: [
                { Rank: "2", Color: "yellow" },
                { Rank: "5", Color: "green" },
                { Rank: "0", Color: "blue" },
                { Rank: "6", Color: "yellow" },
                { Rank: "1", Color: "green" },
                { Rank: "2", Color: "green" },
                { Rank: "skip", Color: "red" },
            ],
            Counter: 7,
        },
        game: {
            topcard: { Rank: "5", Color: "yellow" },
            turn: "aaaa",
            reverse: false,
        },
    };

    let messages = [
        { Message: "Welcome to the game!" },
        { Message: "Player2 has joined the room." },
    ];

    function drawCard() {
        // Implement the logic to draw a card
        console.log("Draw card button clicked");
    }

    function playCard(card) {
        // Implement the logic to play a card
        console.log("Play card button clicked", card);
    }

    function getCardImage(card) {
        return `/src/assets/cards/${card.Color}-${card.Rank}.svg`;
    }
</script>

<div class="title-container">
    <h1>UNO</h1>
</div>

<div class="container">
    <div class="top">
        <div class="left">
            <section class="box">
                <div class="nes-container with-title">
                    <p class="title">Connection Info</p>
                    <table class="nes-table is-bordered is-centered">
                        <tbody>
                            <tr>
                                <td><strong>Player Name:</strong></td>
                                <td>{connectionInfo.player_name}</td>
                            </tr>
                            <tr>
                                <td><strong>Room ID:</strong></td>
                                <td>{connectionInfo.room_id}</td>
                            </tr>
                            <tr>
                                <td><strong>Max Players:</strong></td>
                                <td>{connectionInfo.max_players}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>

        <div class="right">
            <section class="box">
                <div class="nes-container with-title">
                    <p class="title">Messages</p>
                    {#each messages as message}
                        <div class="nes-balloon from-left">
                            <p>{message.Message}</p>
                        </div>
                    {/each}
                </div>
            </section>
        </div>
    </div>

    <div class="bottom">
        <section class="box">
            <div class="nes-container with-title">
                <p class="title">Game State</p>
                <div class="flex-column flex-wrap">
                    <div class="top-card-container">
                        <div class="arrow-container">
                            <img
                                src="/src/assets/arrow.svg"
                                alt="arrow"
                                class="arrow"
                                style="transform: rotate({gameState.game.reverse ? 180 : 0}deg);"
                            />
                        </div>
                        <table class="nes-table is-bordered is-centered players-table">
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th>Turn</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#each connectionInfo.players as player}
                                    <tr>
                                        <td>{player}</td>
                                        <td>
                                            {#if gameState.game.turn === player}
                                                <i class="nes-mario"></i>
                                            {/if}
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                        <img
                            src={getCardImage(gameState.game.topcard)}
                            alt="{gameState.game.topcard.Rank} {gameState.game
                                .topcard.Color}"
                            class="top-card"
                        />
                        <button
                            class="nes-btn"
                            on:click={drawCard}
                            disabled={gameState.game.turn !==
                                gameState.player_name.Name}>Draw</button
                        >
                    </div>
                    <div class="cards-section">
                        <div style="margin-bottom: 40px;"></div>
                        <h3 style="text-align: center;">Your Cards</h3>
                        <div class="cards-container">
                            {#each gameState.player_name.Cards as card}
                                <img
                                    src={getCardImage(card)}
                                    alt="{card.Rank} {card.Color}"
                                    class="card"
                                    on:click={() => playCard(card)}
                                />
                            {/each}
                        </div>
                        <h5 style="text-align: center;">Count: {gameState.player_name.Counter}</h5>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>

<style>
    .title-container {
        text-align: center;
        margin: 20px 0;
    }

    .container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    .top {
        display: flex;
        flex: 1;
    }

    .bottom {
        flex: 3;
    }

    .left,
    .right {
        flex: 1;
        margin-right: 20px;
    }

    .right {
        margin-right: 0;
    }

    .box {
        margin-bottom: 20px;
    }

    .card {
        width: 100px;
        height: auto;
        margin: 5px;
        cursor: pointer;
    }

    .top-card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    .top-card-container .nes-btn {
        margin-left: 20px;
    }

    .top-card {
        width: 150px;
        height: auto;
    }

    .players-table {
        margin-right: 150px;
    }

    .arrow-container {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    .arrow {
        font-size: 2rem;
    }

    .cards-container {
        display: flex;
        justify-content: center;
    }
</style>

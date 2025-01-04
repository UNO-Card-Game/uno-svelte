<!-- Game.svelte -->

<script lang="ts">
  import { onMount } from "svelte";
  import "nes.css/css/nes.min.css";

  import { websocket } from "../stores/websocketStore";
  // import {ConnectionDTO, InfoDTO } from "../models"
  let gameState: any = null;
  let connectionDTO: any = null;
  let infoDTO: any = null;

  onMount(() => {
    const unsubscribe = websocket.subscribe((socket) => {
      if (socket) {
        socket.onmessage = (event) => {
          const incomingData = JSON.parse(event.data);

          switch (incomingData.type) {
            case "connection":
              connectionDTO = incomingData.obj;
              console.log("Connection", connectionDTO);
              break;
            case "info":
              infoDTO = incomingData.obj;
              console.log("INFO", infoDTO);
              break;
            case "sync":
              gameState = incomingData.obj;
              break;
          }
        };
      }
    });

    return unsubscribe;
  });

  function drawCard() {
    // Implement the logic to draw a card
    console.log("Draw card button clicked");
  }

  function playCard(card, index) {
    console.log("Play card button clicked", card);

    websocket.update((socket) => {
      if (socket) {
        socket.send(
          JSON.stringify({
            type: "PLAY_CARD",
            obj: {
              card_index: index,
            },
          }),
        );
      }
      return socket;
    });
  }

  function getCardImage(card: any) {
    if (card.Rank == "wild" || card.Rank == "draw_4") {
      return `/src/assets/cards/${card.Rank}.svg`;
    } else {
      return `/src/assets/cards/${card.Color}-${card.Rank}.svg`;
    }
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
          <!-- {#if gameState} -->
          <table class="nes-table is-bordered is-centered">
            <tbody>
              <tr>
                <td><strong>Player Name:</strong></td>
                <td>{connectionDTO?.player_name}</td>
              </tr>
              <tr>
                <td><strong>Room ID:</strong></td>
                <td>{connectionDTO?.room_id}</td>
              </tr>
              <tr>
                <td><strong>Max Players:</strong></td>
                <td>{connectionDTO ? connectionDTO.max_players : ""}</td>
              </tr>
            </tbody>
          </table>
          <!-- {/if} -->
        </div>
      </section>
    </div>

    <div class="right">
      <section class="box">
        <div class="nes-container with-title">
          <p class="title">Messages</p>
          <!-- {#if infoDTO && infoDTO.message} -->
          <div class="nes-balloon from-left">
            <p>{infoDTO ? infoDTO.Message : ""}</p>
          </div>
          <!-- {/if} -->
        </div>
      </section>
    </div>
  </div>

  <div class="bottom">
    {#if gameState}
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
                  style="transform: rotate({gameState?.game?.reverse
                    ? 180
                    : 0}deg);"
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
                  {#each gameState?.room?.players as player}
                    <tr>
                      <td>{player}</td>
                      <td>
                        {#if gameState?.game?.turn === player}
                          <i class="nes-mario"></i>
                        {/if}
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
              <img
                src={getCardImage(gameState?.game?.topcard)}
                alt="{gameState?.game?.topcard?.Rank} {gameState?.game?.topcard
                  ?.Color}"
                class="top-card"
              />
              <button
                class="nes-btn"
                on:click={drawCard}
                disabled={gameState?.game?.turn !== gameState?.player?.Name}
                >Draw</button
              >
            </div>
            <div class="cards-section">
              <div style="margin-bottom: 40px;"></div>
              <h3 style="text-align: center;">Your Cards</h3>
              <div class="cards-container">
                {#each gameState?.player?.Cards as card, index}
                  <img
                    src={getCardImage(card)}
                    alt="{card.Rank} {card.Color}"
                    class="card"
                    on:click={() => playCard(card, index)}
                  />
                {/each}
              </div>
              <h5 style="text-align: center;">
                Count: {gameState?.player?.Counter}
              </h5>
            </div>
          </div>
        </div>
      </section>
    {/if}
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

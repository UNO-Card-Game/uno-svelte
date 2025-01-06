<!-- Start.svelte -->

<script lang="ts">
  import { Link } from 'svelte-routing';
</script>

<div class="container">
  <h1 class="title">Uno Multiplayer Game</h1>
  <Link class="nes-btn is-primary button" to="/uno/create-room" style="margin-bottom: 20px;">
    Create Room
  </Link>
  <Link class="nes-btn is-success button" to="/uno/join-room">
    Join Room
  </Link>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }

  .title {
    margin-bottom: 20px;
  }

  .button {
    margin: 10px 0;
  }
</style>

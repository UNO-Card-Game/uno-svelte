<script lang="ts">
  import RoomForm from './RoomForm.svelte';
  let playerName: string = '';
  let numPlayers: number = 2; // default to 2 players

  $: queryParams = `max_players=${numPlayers}&player_name=${playerName}`;
</script>

<div class="container">
  <RoomForm
    title="Create Room"
    endpoint="create"
    bind:playerName
    bind:numPlayers
    {queryParams}
  />
</div>

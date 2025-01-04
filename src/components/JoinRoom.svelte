<script lang="ts">
  import RoomForm from './RoomForm.svelte';
  let playerName: string = '';
  let roomId: string = '';

  $: queryParams = `room_id=${roomId}&player_name=${playerName}`;
</script>

{#if queryParams}
  <RoomForm
    title="Join Room"
    endpoint="join"
    bind:playerName
    bind:roomId
    {queryParams}
  />
{/if}

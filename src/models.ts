
export type Card = {

    Color: string;

    Rank: string;

  };



  export type Player = {

    Name: string;

    Cards: Card[];

    Counter: number;

  };



  export type Game = {

    topcard: Card;

    turn: string;

    reverse: boolean;

  };



  export type Room = {

    id: string;

    max_players: number;

    players: string[];

  };



  export type GameState = {

    obj: {

      player: Player;

      room: Room;

      game: Game;

    };

  };



  export type ConnectionDTO = {

    obj: {
      player_name: string,
      room_id: number,
      max_players: number,
      players:string[],
    };

  };



  export type InfoDTO = {

    obj: {

       Message: string

    };

  };

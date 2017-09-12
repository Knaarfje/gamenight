import { Game } from './game.model';

export interface Edition {
  game?: Game;
  name: string;
  eventDate: number;
}

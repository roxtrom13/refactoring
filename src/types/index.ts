export enum PlayType {
  "tragedy",
  "comedy",
}

export interface Performance {
  playID: string;
  audience: number;
}

export interface Invoice {
  customer: string;
  performances: Array<Performance>;
}

export interface Play {
  name: string;
  type: PlayType | string;
}

export interface Plays {
  key: Play;
}

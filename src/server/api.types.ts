export type CommonInfoResponse = {
  count: number;
  pages: number;
  next: string;
  prev: null;
};

export type CharactersResponse = {
  info: CommonInfoResponse;
  results: CharacterResult[];
};


export type CharacterResult = {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'unknown',
}

export type Location = {
  name: string;
  url: string;
};

export enum Species {
  Alien = 'Alien',
  Human = 'Human',
}

export enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

// Episodes API
export type EpisodesResponse = {
  info: CommonInfoResponse;
  results: EpisodeResult[];
};

export type EpisodeResult = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: Date;
};

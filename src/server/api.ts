import { CharactersResponse, EpisodesResponse } from './api.types';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

// https://rickandmortyapi.com/api

// https://rickandmortyapi.com/api/character/?name=rick&status=alive

export const getCharacter = async (name: string, arbitaryLoadingTime = 0) => {
  try {
    await waitFor(arbitaryLoadingTime);
    const res = await fetch(`${API_BASE_URL}/character/?name=${name}`);
    const data = await res.json();
    return data as CharactersResponse;
  } catch (error) {
    throw new Error('Error fetching character');
  }
};

const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

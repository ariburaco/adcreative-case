'use client';

import { getCharacter } from '@/server/api';
import { CharacterResult } from '@/server/api.types';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { use, useEffect, useRef, useState } from 'react';
import SearchResultPopover from '../SearchResultPopover';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

// To show the loading state while the character is being fetched
// this value can be arbitrarily set
export const DEFAULT_ARBITRARY_LOADING_TIME = 0;

const SearchCharacter = () => {
  const [arbitaryLoadingTime, setArbitaryLoadingTime] = useState(
    DEFAULT_ARBITRARY_LOADING_TIME
  );
  const [searchKey, setSearchKey] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState<
    CharacterResult[]
  >([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    mutate: searchCharacter,
    data: searchedCharacter,
    isPending: isSearching,
  } = useMutation({
    mutationKey: ['searchCharacter'],
    mutationFn: (name: string) => getCharacter(name, arbitaryLoadingTime),
  });

  const handleSearch = (searchKey: string) => {
    if (!searchKey) {
      return;
    }

    // A very basic debounce function
    setTimeout(() => {
      searchCharacter(searchKey);
    }, 200);
  };

  const onRemoveCharacter = (character: CharacterResult) => {
    setSelectedCharacters((prevCharacters) =>
      prevCharacters.filter(
        (prevCharacter) => prevCharacter.id !== character.id
      )
    );
  };

  const onClearSearch = () => {
    setSearchKey('');
    searchInputRef.current?.focus();
  };

  const onArbitaryLoadingTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // validate the input value as a number
    const inputValue = event.target.value;
    if (inputValue === '' || !isNaN(Number(inputValue))) {
      setArbitaryLoadingTime(Number(inputValue));
    } else {
      // reset the input value to the default value
      setArbitaryLoadingTime(DEFAULT_ARBITRARY_LOADING_TIME);
    }
  };

  useEffect(() => {
    handleSearch(searchKey);
  }, [searchKey]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClearSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Backspace' && searchKey === '') {
        const lastSelectedCharacter =
          selectedCharacters[selectedCharacters.length - 1];

        if (lastSelectedCharacter) {
          setSelectedCharacters((prevCharacters) =>
            prevCharacters.filter(
              (prevCharacter) => prevCharacter.id !== lastSelectedCharacter.id
            )
          );
        }
      }
    };

    const inputElement = searchInputRef.current;
    inputElement?.addEventListener('keydown', handleKeyDown);

    return () => {
      inputElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchKey, selectedCharacters]);

  return (
    <div className="flex flex-col bg-secondary items-center justify-center w-full h-full gap-0">
      <div className="flex  p-4 flex-row items-center justify-center w-full h-full">
        <Label htmlFor="arbitaryLoadingTime" className="w-full">
          <span className="text-sm">Arbitary Loading Time (ms)</span>
          <Input
            id="arbitaryLoadingTime"
            value={arbitaryLoadingTime}
            onChange={onArbitaryLoadingTimeChange}
            className="mt-2 w-full"
          />
        </Label>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full h-full">
        <div className="flex p-4 bg-secondary rounded-b-lg flex-col items-start gap-2 justify-start w-full h-full">
          <Label htmlFor="search-input" className="w-full">
            <span className="">Search Characters</span>
            <div className="relative mt-2 flex flex-wrap items-center justify-start gap-2 bg-input p-2 w-full border-border border rounded-lg">
              <div className="flex flex-wrap gap-2 ">
                {selectedCharacters.map((character) => (
                  <Badge
                    key={character.id}
                    variant="default"
                    className="flex items-center gap-1 py-2 select-none cursor-default"
                  >
                    <span>{character.name}</span>
                    <button
                      className="hover:opacity-75 transition-opacity"
                      onClick={() => onRemoveCharacter(character)}
                    >
                      <X className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </Badge>
                ))}
              </div>

              <input
                ref={searchInputRef}
                id="search-input"
                autoComplete="off"
                tabIndex={0}
                className="bg-transparent border-none focus:outline-none px-2 py-2 text-sm"
                placeholder="Start typing to search"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              />

              <AnimatePresence mode="wait">
                {searchKey && (
                  <motion.div
                    key="setSearchKey"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-0 right-2 z-10 flex h-full items-center justify-center"
                  >
                    <Button
                      tabIndex={-1}
                      className="rounded-full h-8 w-8"
                      variant="outline"
                      size="icon"
                      onClick={onClearSearch}
                    >
                      <X className="w-4 h-4 text-foreground" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Label>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {searchKey && (
          <SearchResultPopover
            shownCharacters={searchedCharacter}
            searchKey={searchKey}
            isSearching={isSearching}
            setSelectedCharacters={setSelectedCharacters}
            selectedCharacters={selectedCharacters}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchCharacter;

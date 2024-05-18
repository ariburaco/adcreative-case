'use client';

import useArrowKeyNavigation from '@/hooks/useArrowKeyNavigation';
import { cn } from '@/lib/utils';
import { CharacterResult, CharactersResponse } from '@/server/api.types';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Trash2, TriangleAlert } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import Image from 'next/image';

interface SearchResultPopoverProps {
  searchKey: string;
  shownCharacters?: CharactersResponse | null;
  isSearching: boolean;
  setSelectedCharacters: Dispatch<SetStateAction<CharacterResult[]>>;
  selectedCharacters: CharacterResult[];
}

const SearchResultPopover = ({
  searchKey,
  shownCharacters,
  isSearching,
  setSelectedCharacters,
  selectedCharacters,
}: SearchResultPopoverProps) => {
  const { focusedIndex, setFocusedIndex } = useArrowKeyNavigation({
    itemCount: shownCharacters?.results?.length ?? 0,
  });
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  const highlightMatch = (name: string) => {
    const index = name.toLowerCase().indexOf(searchKey.toLowerCase());
    if (index === -1) {
      return name;
    }
    const before = name.substring(0, index);
    const match = name.substring(index, index + searchKey.length);
    const after = name.substring(index + searchKey.length);
    return (
      <>
        {before}
        <span className="text-primary font-black">{match}</span>
        {after}
      </>
    );
  };

  const onSelectCharacter = (character: CharacterResult) => {
    // Check if the character is already selected
    const isSelected = selectedCharacters.some(
      (selected) => selected.id === character.id
    );

    if (isSelected) {
      // If selected, remove the character from the selection
      setSelectedCharacters((prevCharacters) =>
        prevCharacters.filter((selected) => selected.id !== character.id)
      );
    } else {
      // If not selected, add the character to the selection
      setSelectedCharacters((prevCharacters) => [...prevCharacters, character]);
    }
  };

  const onSelectWithEnterKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement> // Correct type for keyboard event
  ) => {
    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Spacebar'
    ) {
      event.preventDefault();
      // Correct access to the 'key' property
      const selectedCharacter = shownCharacters?.results[focusedIndex];
      if (selectedCharacter) {
        onSelectCharacter(selectedCharacter);
      }
    }
  };

  const onDeselectAllCharacters = () => {
    setSelectedCharacters([]);
  };

  // Focus the item when it becomes the focused index
  useEffect(() => {
    if (itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex]);

  // Prepare ref array
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(
      0,
      shownCharacters?.results?.length
    );
  }, [shownCharacters?.results?.length]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      className="flex max-h-[600px] bg-secondary drop-shadow-xl border border-border rounded-lg flex-col items-start justify-start w-full h-full gap-2 p-4"
    >
      {isSearching && (
        <div className="flex flex-col min-h-[100px] items-center justify-center w-full h-full">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}

      {!isSearching && !shownCharacters?.results?.length && (
        <div className="flex flex-col min-h-[100px] items-center gap-4 justify-center w-full h-full">
          <TriangleAlert className="w-6 h-6 text-destructive" />
          <span className="text-sm">No results found</span>
        </div>
      )}

      <div className="flex flex-row justify-between items-center w-full gap-2 py-2 min-h-[50px] empty:hidden">
        {shownCharacters?.results?.length && (
          <div className="flex flex-row items-center justify-start gap-2">
            <span className="text-sm font-semibold">
              {selectedCharacters?.length} selected.
            </span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {shownCharacters?.results?.length &&
            selectedCharacters?.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  tabIndex={-1}
                  variant="outline"
                  size="sm"
                  onClick={onDeselectAllCharacters}
                  className="gap-2 self-end w-fit"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Deselect All</span>
                </Button>
              </motion.div>
            )}
        </AnimatePresence>
      </div>

      {shownCharacters?.results && (
        <div className="flex flex-col gap-2 w-full h-full overflow-y-auto">
          {shownCharacters?.results?.map((character, index) => {
            const isSelected = selectedCharacters?.find(
              (selectedCharacter) => selectedCharacter.id === character.id
            );
            return (
              <div
                ref={(el) => {
                  itemRefs.current[index] = el;
                }} // Corrected ref assignment
                tabIndex={index + 1}
                key={character.id}
                onClick={() => onSelectCharacter(character)}
                onKeyDown={(event) => onSelectWithEnterKeyDown(event)}
                onFocus={() => setFocusedIndex(index)}
                className={cn(
                  'rounded-lg border-border border bg-background p-4 gap-4 flex flex-row items-center justify-start w-full hover:opacity-70 transition-all cursor-pointer',
                  {
                    'bg-primary/20': isSelected,
                  }
                )}
              >
                <Checkbox checked={!!isSelected} />
                <Image
                  width={64}
                  height={64}
                  src={character.image}
                  alt={character.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex flex-col items-start justify-start">
                  <span className="text-xl font-bold">
                    {highlightMatch(character.name)}
                  </span>
                  <p className="text-xs text-muted-foreground">
                    {character.episode?.length} Episodes
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default SearchResultPopover;

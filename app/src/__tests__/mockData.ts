import { Character } from '../types/character';

export const mockItems: Character[] = [
  {
    id: 1,
    name: 'Rick',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAD0lEQVR4AQEEAPv/AEhCFQF1AKC0Y72XAAAAAElFTkSuQmCC',
    status: 'Alive',
    location: { name: 'Earth', url: '' },
  },
  {
    id: 2,
    name: 'Morty',
    image:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAD0lEQVR4AQEEAPv/AEhCFQF1AKC0Y72XAAAAAElFTkSuQmCC',
    status: 'Alive',
    location: { name: 'Earth', url: '' },
  },
];

export const incompleteCharacter = {
  id: 3,
  name: 'Birdperson',
  status: undefined as unknown as string,
  image:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAD0lEQVR4AQEEAPv/AEhCFQF1AKC0Y72XAAAAAElFTkSuQmCC',
  location: { name: '', url: '' },
};

export const baseCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  image:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAD0lEQVR4AQEEAPv/AEhCFQF1AKC0Y72XAAAAAElFTkSuQmCC',
  location: { name: 'Earth (C-137)', url: '' },
};

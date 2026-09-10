import * as migration_20260910_191654_initial from './20260910_191654_initial';

export const migrations = [
  {
    up: migration_20260910_191654_initial.up,
    down: migration_20260910_191654_initial.down,
    name: '20260910_191654_initial'
  },
];

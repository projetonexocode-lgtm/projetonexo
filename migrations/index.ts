import * as migration_20260910_191654_initial from './20260910_191654_initial';
import * as migration_20260911_154500_site_social_links from './20260911_154500_site_social_links';

export const migrations = [
  {
    up: migration_20260910_191654_initial.up,
    down: migration_20260910_191654_initial.down,
    name: '20260910_191654_initial'
  },
  {
    up: migration_20260911_154500_site_social_links.up,
    down: migration_20260911_154500_site_social_links.down,
    name: '20260911_154500_site_social_links'
  },
];

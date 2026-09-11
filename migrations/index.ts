import * as migration_20260910_191654_initial from './20260910_191654_initial';
import * as migration_20260911_154500_site_social_links from './20260911_154500_site_social_links';
import * as migration_20260911_161500_about_page_fields from './20260911_161500_about_page_fields';

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
  {
    up: migration_20260911_161500_about_page_fields.up,
    down: migration_20260911_161500_about_page_fields.down,
    name: '20260911_161500_about_page_fields'
  },
];

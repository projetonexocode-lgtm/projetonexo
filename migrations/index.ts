import * as migration_20260910_191654_initial from './20260910_191654_initial';
import * as migration_20260911_154500_site_social_links from './20260911_154500_site_social_links';
import * as migration_20260911_161500_about_page_fields from './20260911_161500_about_page_fields';
import * as migration_20260911_180500_site_footer_certificate from './20260911_180500_site_footer_certificate';
import * as migration_20260916_223000_about_page_narrative from './20260916_223000_about_page_narrative';

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
  {
    up: migration_20260911_180500_site_footer_certificate.up,
    down: migration_20260911_180500_site_footer_certificate.down,
    name: '20260911_180500_site_footer_certificate'
  },
  {
    up: migration_20260916_223000_about_page_narrative.up,
    down: migration_20260916_223000_about_page_narrative.down,
    name: '20260916_223000_about_page_narrative'
  },
];

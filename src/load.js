const parsedUrl = new URL(import.meta.url);
const searchParams = new URLSearchParams(parsedUrl.search);
const lang = searchParams.get('lang');
const components = (searchParams.get('components') || '').split(',');

const langModule = (lang === 'fr')
  ? import(`./translations/translations.fr.js`)
  : import(`./translations/translations.en.js`);

Promise
  .all([
    import('./lib/i18n.js'),
    langModule,
  ])
  .then(([{ addTranslations, setLanguage }, { lang, translations }]) => {
    addTranslations(lang, translations);
    setLanguage(lang);
  })
  .then(() => {
    return Promise.all([
      components.includes('cc-addon-admin') && import('./addon/cc-addon-admin.js'),
      components.includes('cc-addon-backups') && import('./addon/cc-addon-backups.js'),
      components.includes('cc-addon-credentials') && import('./addon/cc-addon-credentials.js'),
      components.includes('cc-addon-features') && import('./addon/cc-addon-features.js'),
      components.includes('cc-addon-linked-apps') && import('./addon/cc-addon-linked-apps.js'),
      components.includes('cc-elasticsearch-info') && import('./addon/cc-elasticsearch-info.js'),
      components.includes('cc-elasticsearch-options') && import('./addon/cc-elasticsearch-options.js'),
      components.includes('cc-header-addon') && import('./addon/cc-header-addon.js'),
      components.includes('cc-beta') && import('./atoms/cc-beta.js'),
      components.includes('cc-button') && import('./atoms/cc-button.js'),
      components.includes('cc-datetime-relative') && import('./atoms/cc-datetime-relative.js'),
      components.includes('cc-expand') && import('./atoms/cc-expand.js'),
      components.includes('cc-img') && import('./atoms/cc-img.js'),
      components.includes('cc-input-text') && import('./atoms/cc-input-text.js'),
      components.includes('cc-loader') && import('./atoms/cc-loader.js'),
      components.includes('cc-toggle') && import('./atoms/cc-toggle.js'),
      components.includes('env-var-create') && import('./env-var/env-var-create.js'),
      components.includes('env-var-editor-expert') && import('./env-var/env-var-editor-expert.js'),
      components.includes('env-var-editor-simple') && import('./env-var/env-var-editor-simple.js'),
      components.includes('env-var-form') && import('./env-var/env-var-form.js'),
      components.includes('env-var-full') && import('./env-var/env-var-full.js'),
      components.includes('env-var-input') && import('./env-var/env-var-input.js'),
      components.includes('cc-logsmap') && import('./maps/cc-logsmap.js'),
      components.includes('cc-map') && import('./maps/cc-map.js'),
      components.includes('cc-block') && import('./molecules/cc-block.js'),
      components.includes('cc-block-section') && import('./molecules/cc-block-section.js'),
      components.includes('cc-error') && import('./molecules/cc-error.js'),
      components.includes('cc-header-app') && import('./overview/cc-header-app.js'),
      components.includes('cc-header-orga') && import('./overview/cc-header-orga.js'),
      components.includes('cc-overview') && import('./overview/cc-overview.js'),
      components.includes('cc-tile-consumption') && import('./overview/cc-tile-consumption.js'),
      components.includes('cc-tile-deployments') && import('./overview/cc-tile-deployments.js'),
      components.includes('cc-tile-instances') && import('./overview/cc-tile-instances.js'),
      components.includes('cc-tile-requests') && import('./overview/cc-tile-requests.js'),
      components.includes('cc-tile-scalability') && import('./overview/cc-tile-scalability.js'),
      components.includes('cc-tile-status-codes') && import('./overview/cc-tile-status-codes.js'),
    ]);
  })
  .then(() => {
    console.log('All components were loaded :-)');
  })
  .catch((e) => console.error(e));

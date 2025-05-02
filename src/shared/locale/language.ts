export type Language = 'ru-RU' | 'en-GB';

export const list: ReadonlyArray<Language> = ['ru-RU', 'en-GB'];

export const intlLocales: { [K in Language]: string } = {
  'ru-RU': 'ru-RU',
  'en-GB': 'en-GB',
};

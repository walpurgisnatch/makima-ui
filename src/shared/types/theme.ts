export interface IThemeContext {
  prefersColorScheme: string;
  theme: string;
  switchTheme: (theme: string) => void;
}

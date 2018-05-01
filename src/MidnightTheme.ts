import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";
const cyan = "#5bf1ff";
const yellow = "#fcd435";
const transparent = "#00000000";
const hueAccent2 = 40;

const bgHue = 280;

// TODO
// - All the terminal colors

export default class MidnightTheme extends Theme {
  uno = 160;
  due = 190;
  tre = 320;

  palette: Palette = {
    yellow: yellow,
    orange: "#f79e51",
    blue: "#8cd1ff",
    purple: "#e1a2f9",
    white: white,
    black: black,
    red: "#ff6666",
    cyan: cyan,
    transparent: transparent,
    __NO__: "#ff00ff",
    tBG: this.gray(18),
    tFG: this.hsl(bgHue, 90, 90),
    tBlack: this.gray(35),
    tRed: this.hsl(0, 60, 60),
    tGreen: this.hsl(140, 60, 60),
    tYellow: this.hsl(40, 60, 60),
    tBlue: this.hsl(200, 60, 60),
    tMagenta: this.hsl(330, 60, 60),
    tCyan: this.hsl(80, 60, 60),
    tWhite: white,
    accent0: this.hsl(this.uno, 70, 40),
    accent1: this.hsl(hueAccent2, 100, 60),
    fg: white,
    bg: this.gray(20),
    inputBG: this.gray(20),
    bracketMatchBG: this.dilute(this.hsl(this.tre, 100, 60), 20),
    bracketMatchBorder: this.dilute(this.hsl(this.tre, 100, 60), 80),
    borderSoft: this.dilute(white, 5),
    borderMedium: this.dilute(white, 10),
    borderHard: this.dilute(white, 15),
    shadow: this.dilute(black, 50),
    activeSelectionBG: this.hsl(this.uno, 35, 35),
    inactiveSelectionBG: this.hsl(this.uno, 10, 30),
    accentFocusBG: this.hsl(this.uno, 35, 35),
    statusBarBG: this.gray(20),
    statusBarFG: this.gray(70),
    lineHighlightBG: this.dilute(cyan, 8),
    editorLine: this.dilute(this.gray(80), 10),
    widgetBG: this.gray(30),
    widgetBorder: this.gray(50)
  };

  gray(l: number) {
    return this.hsl(bgHue, 40, l);
  }

  ramp(hue: number) {
    return [
      this.hsl(hue, 90, 65),
      this.hsl(hue + 4, 80, 60),
      this.hsl(hue + 8, 70, 55),
      this.hsl(hue + 12, 50, 50),
      this.hsl(hue + 16, 40, 45)
    ];
  }

  themeType() {
    return ThemeType.DARK;
  }
}

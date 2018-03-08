import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";
const cyan = "#5bf1ff";
const yellow = "#fcd435";
const transparent = "#00000000";
const hueAccent2 = 120;

export default class DarkTheme extends Theme {
  uno = 70;
  due = 30;
  tre = 160;
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
    tFG: this.hsl(this.uno, 90, 90),
    tBlack: this.gray(15),
    tRed: this.hsl(0, 60, 60),
    tGreen: this.hsl(140, 60, 60),
    tYellow: this.hsl(40, 60, 60),
    tBlue: this.hsl(200, 60, 60),
    tMagenta: this.hsl(330, 60, 60),
    tCyan: this.hsl(80, 60, 60),
    tWhite: white,
    uiFG: white,
    uiAccent: this.hsl(this.tre, 70, 40),
    uiAccent2: this.hsl(hueAccent2, 100, 60),
    fg: white,
    bg: this.gray(20),
    inputBG: this.gray(20),
    bracketMatchBG: this.dilute(cyan, 50),
    brackerMatchBorder: transparent,
    borderSoft: this.dilute(white, 5),
    borderMedium: this.dilute(white, 10),
    borderHard: this.dilute(white, 15),
    shadow: this.dilute(black, 50),
    activeSelectionBG: this.hsl(this.tre, 35, 35),
    inactiveSelectionBG: this.hsl(this.tre, 10, 30),
    accentFocusBG: this.hsl(this.tre, 35, 35),
    statusBarBG: this.gray(15),
    lineHighlightBG: this.dilute(yellow, 8),
    widgetBG: this.gray(30),
    widgetBorder: this.gray(50)
  };

  ramp(hue: number) {
    return [
      this.hsl(hue, 90, 65),
      this.hsl(hue + 4, 80, 60),
      this.hsl(hue + 8, 70, 55),
      this.hsl(hue + 12, 50, 50),
      this.hsl(hue + 16, 40, 45)
    ];
  }

  filename() {
    return "dark";
  }

  themeType() {
    return ThemeType.DARK;
  }
}

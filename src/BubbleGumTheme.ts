import Theme, { ThemeType, Palette } from "./Theme";

const white = "#ffffff";
const black = "#000000";
const yellow = "#f1c40f";
const red = "#cc0000";
const cyan = "#00bcd4";
const transparent = "#00000000";

const bgHue = 300;

export default class BubbleGumTheme extends Theme {
  uno = 290;
  due = 330;
  tre = 180;

  palette: Palette = {
    yellow: yellow,
    orange: "#e67e22",
    blue: "#3498db",
    purple: "#9b59b6",
    white: white,
    black: black,
    red: red,
    cyan: cyan,
    transparent: transparent,
    __NO__: "#ff00ff",
    tBG: this.gray(96),
    tFG: this.hsl(bgHue, 80, 25),
    tBlack: "#31364a",
    tRed: "#a91b1c",
    tGreen: "#00a337",
    tYellow: "#cc8410",
    tBlue: "#39b898",
    tMagenta: "#d95278",
    tCyan: "#7f9608",
    tWhite: this.gray(96),
    accent0: this.hsl(this.tre, 70, 40),
    accent1: this.hsl(200, 45, 40),
    fg: this.hsl(bgHue, 80, 25),
    bg: this.gray(94),
    inputBG: this.gray(98),
    bracketMatchBG: this.dilute(cyan, 35),
    bracketMatchBorder: transparent,
    borderSoft: this.gray(88),
    borderMedium: this.gray(84),
    borderHard: this.gray(80),
    shadow: this.dilute(this.gray(10), 25),
    activeSelectionBG: this.hsl(this.tre, 50, 50),
    inactiveSelectionBG: this.hsl(this.tre, 40, 80),
    textSelectionBG: this.hsla(this.tre, 50, 50, 30),
    lineHighlightBG: this.hsla(this.tre, 50, 50, 10),
    accentFocusBG: this.hsl(this.tre, 50, 80),
    statusBarBG: this.gray(94),
    statusBarFG: this.gray(40),
    editorLine: this.dilute(this.gray(30), 10),
    widgetBG: this.gray(98),
    widgetBorder: this.gray(50)
  };

  gray(l: number) {
    return this.hsl(bgHue, 30, l);
  }

  ramp(hue: number) {
    return [
      this.hsl(hue, 95, 35),
      this.hsl(hue, 75, 45),
      this.hsl(hue, 55, 55),
      this.hsl(hue, 35, 65),
      this.hsl(hue, 25, 70)
    ];
  }

  themeType() {
    return ThemeType.LIGHT;
  }
}
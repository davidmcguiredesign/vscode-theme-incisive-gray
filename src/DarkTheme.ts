import { BaseThemeDark } from "./Theme";

export class DarkTheme extends BaseThemeDark {
  colorBG0 = this.hsl(0, 0, 20);
  colorBG1 = this.hsl(0, 0, 16);
  colorBG2 = this.hsl(0, 0, 26);
  colorFG = this.hsl(0, 0, 90);

  colorSubtle = this.hsl(70, 10, 62);
  colorUno = this.hsl(30, 80, 65);
  colorDue = this.hsl(190, 55, 70);
  colorTre = this.hsl(80, 50, 65);

  colorBorder0 = this.hsl(0, 0, 30);
  colorBorder1 = this.hsl(0, 0, 58);
  colorStatusBG = this.hsl(0, 0, 12);
  colorStatusFG = this.colorFG;
  colorWidgetBG = this.hsl(0, 0, 15);
}

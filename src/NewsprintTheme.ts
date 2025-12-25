import { BaseThemeLight } from "./Theme";

export class NewsprintTheme extends BaseThemeLight {
  colorBG0 = this.hsl(60, 0, 83);
  colorBG1 = this.hsl(0, 0, 79);
  colorBG2 = this.hsl(0, 0, 73);
  colorFG = this.hsl(0, 0, 0);

  colorSubtle = this.hsl(322, 10, 49);
  colorUno = this.hsl(322, 100, 30);
  colorDue = this.hsl(215, 100, 33);
  colorTre = this.hsl(125, 100, 20);

  colorBorder0 = this.hsl(0, 0, 60);
  colorBorder1 = this.hsl(0, 0, 20);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.lighten(this.colorBG0, 4);
}

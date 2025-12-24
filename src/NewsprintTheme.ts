import { BaseThemeLight } from "./Theme";

export class NewsprintTheme extends BaseThemeLight {
  colorBG0 = this.hsl(60, 0, 80);
  colorBG1 = this.hsl(0, 0, 76);
  colorBG2 = this.hsl(0, 0, 69);
  colorFG = this.hsl(0, 0, 0);

  colorSubtle = this.hsl(322, 20, 43);
  colorUno = this.hsl(320, 100, 28);
  colorDue = this.hsl(215, 100, 30);
  colorTre = this.hsl(125, 100, 20);

  colorBorder0 = this.hsl(0, 0, 60);
  colorBorder1 = this.hsl(0, 0, 20);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.lighten(this.colorBG0, 4);
}

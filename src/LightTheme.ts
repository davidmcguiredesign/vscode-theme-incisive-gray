import { BaseThemeLight } from "./Theme";

export class LightTheme extends BaseThemeLight {
  colorBG0 = this.hsl(0, 0, 91);
  colorBG1 = this.hsl(0, 0, 87);
  colorBG2 = this.hsl(0, 0, 80);
  colorFG = this.hsl(0, 0, 20);

  colorSubtle = this.hsl(320, 40, 40);
  colorUno = this.hsl(320, 95, 35);
  colorDue = this.hsl(215, 95, 35);
  colorTre = this.hsl(125, 95, 22);

  colorBorder0 = this.hsl(0, 0, 65);
  colorBorder1 = this.hsl(0, 0, 40);
  colorStatusBG = this.colorFG;
  colorStatusFG = this.colorBG0;
  colorWidgetBG = this.colorBG1;
}

import LightTheme from "./LightTheme";
import DarkTheme from "./DarkTheme";
import NatureTheme from "./NatureTheme";
import BubbleGumTheme from "./BubbleGumTheme";
import MidnightTheme from "./MidnightTheme";

console.log(new Date().toString());

new LightTheme().saveAs("light");
new DarkTheme().saveAs("dark");
new NatureTheme().saveAs("nature");
new BubbleGumTheme().saveAs("bubblegum");
new MidnightTheme().saveAs("midnight");

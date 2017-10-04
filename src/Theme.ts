import * as fs from "fs";
import * as tinycolor from "tinycolor2";

export interface Style {
  foreground: string;
  fontStyle: string;
}

export enum ThemeType {
  LIGHT = "light",
  DARK = "dark"
}

export default abstract class Theme {
  // TODO: This kills a lot of type checking, so let's try to remove it later.
  // The way we attach all the properties can't be analyzed by TS.
  [key: string]: any;

  abstract themeType(): ThemeType;
  abstract filename(): string;
  abstract ramp(hue: number): string[];
  abstract activeSelectionBG(): string;
  abstract inactiveSelectionBG(): string;
  abstract accentFocusBG(): string;
  abstract statusBarBG(): string;
  abstract lineHighlightBG(): string;
  abstract widgetBG(): string;
  abstract widgetBorder(): string;

  hsl(h: number, s: number, l: number) {
    return tinycolor({ h, s, l }).toHexString();
  }

  gray(l: number) {
    return this.hsl(0, 0, l);
  }

  dilute(color: string, percent: number) {
    if (percent === 100) {
      return color;
    }
    const scaled = Math.floor(255 * (percent / 100));
    const alpha = (scaled.toString(16) as any).padStart(2, "0");
    return color + alpha;
  }

  config() {
    return {
      type: this.themeType(),
      colors: this.colors(),
      tokenColors: this.tokenColors()
    };
  }

  colors() {
    return {
      focusBorder: this.UI_ACCENT,
      "widget.shadow": this.SHADOW,
      "input.border": this.BORDER_HARDER,
      "input.background": this.INPUT_BG,
      "progressBar.background": this.UI_ACCENT,
      "inputOption.activeBorder": this.UI_ACCENT,
      "list.highlightForeground": this.WHITE,
      "list.activeSelectionBackground": this.activeSelectionBG(),
      "list.inactiveSelectionBackground": this.inactiveSelectionBG(),
      "list.focusBackground": this.accentFocusBG(),
      "list.hoverBackground": this.dilute(this.UI_FG, 5),
      "statusBar.border": this.BORDER_HARDER,
      "statusBar.background": this.statusBarBG(),
      "statusBar.foreground": this.WHITE,
      "activityBar.border": this.BORDER_SOFT,
      "activityBar.background": this.BG,
      "activityBar.foreground": this.UI_FG,
      "activityBarBadge.background": this.UI_ACCENT,
      "activityBarBadge.foreground": this.WHITE,
      "editorWidget.foreground": this.UI_FG,
      "editorWidget.background": this.widgetBG(),
      "editorWidget.border": this.widgetBorder(),
      "editorBracketMatch.background": this.dilute(this.CYAN, 20),
      "editorBracketMatch.border": this.TRANSPARENT,
      "editor.findMatchBackground": this.dilute(this.ORANGE, 50),
      "editor.findMatchHighlightBackground": this.dilute(this.YELLOW, 50),
      "editor.findRangeHighlightBackground": this.dilute(this.NO_, 50),
      "editor.foreground": this.FG,
      "editor.background": this.BG,
      "editor.lineHighlightBackground": this.lineHighlightBG(),
      "editor.rangeHighlightBackground": this.dilute(this.ORANGE, 10),
      "editor.selectionBackground": this.dilute(this.YELLOW, 30),
      "editor.inactiveSelectionBackground": this.dilute(this.YELLOW, 25),
      "editor.wordHighlightBackground": this.dilute(this.BLUE, 15),
      "editor.wordHighlightStrongBackground": this.dilute(this.PURPLE, 20),
      "editorCursor.foreground": this.RED,
      "editorGroupHeader.tabsBackground": this.BG,
      "editorIndentGuide.background": this.BORDER_HARD,
      "editorRuler.foreground": this.BORDER_HARD,
      "editorLineNumber.foreground": this.dilute(this.UI_FG, 30),
      foreground: this.UI_FG,
      "notification.background": this.UI_FG,
      "notification.foreground": this.WHITE,
      "panel.background": this.T_BG,
      "panel.border": this.BORDER_HARD,
      "panelTitle.activeBorder": this.dilute(this.UI_FG, 50),
      "panelTitle.activeForeground": this.UI_FG,
      "panelTitle.inactiveForeground": this.dilute(this.UI_FG, 60),
      "peekViewEditor.matchHighlightBackground": this.dilute(this.YELLOW, 50),
      "peekViewResult.matchHighlightBackground": this.dilute(this.YELLOW, 50),
      "sideBar.border": this.BORDER_SOFT,
      "sideBar.background": this.BG,
      "sideBarSectionHeader.background": this.dilute(this.UI_FG, 3),
      "tab.activeBackground": this.accentFocusBG(),
      "tab.activeForeground": this.UI_FG,
      "tab.inactiveBackground": this.TRANSPARENT,
      "tab.inactiveForeground": this.dilute(this.UI_FG, 50),
      "tab.border": this.TRANSPARENT,
      "titleBar.activeBackground": this.BG,
      "titleBar.activeForeground": this.UI_FG,
      "titleBar.inactiveBackground": this.BG,
      "titleBar.inactiveForeground": this.dilute(this.UI_FG, 70),
      "titleBar.border": this.BORDER_SOFT,
      "terminal.foreground": this.T_FG,
      "terminal.background": this.T_BG,
      "terminal.ansiBlack": this.T_BLACK,
      "terminal.ansiBlue": this.T_BLUE,
      "terminal.ansiBrightBlack": this.T_BLACK,
      "terminal.ansiBrightBlue": this.T_BLUE,
      "terminal.ansiBrightCyan": this.T_CYAN,
      "terminal.ansiBrightGreen": this.T_GREEN,
      "terminal.ansiBrightMagenta": this.T_MAGENTA,
      "terminal.ansiBrightRed": this.T_RED,
      "terminal.ansiBrightWhite": this.T_WHITE,
      "terminal.ansiBrightYellow": this.T_YELLOW,
      "terminal.ansiCyan": this.T_CYAN,
      "terminal.ansiGreen": this.T_GREEN,
      "terminal.ansiMagenta": this.T_MAGENTA,
      "terminal.ansiRed": this.T_RED,
      "terminal.ansiWhite": this.T_WHITE,
      "terminal.ansiYellow": this.T_YELLOW
    };
  }

  tokenColors() {
    return this.scopes().reduce((arr, item) => {
      const [name, scopes] = item;
      const scope = scopes.join(", ");
      const settings = this.namedScopeToSettings(name);
      if (settings) {
        return [...arr, { name, scope, settings }];
      }
      return arr;
    }, []);
  }

  scopes() {
    const data: [string, string[]][] = [
      ["Parameter", ["variable.parameter.function"]],
      ["Comments", ["comment", "punctuation.definition.comment"]],
      [
        "Punctuation",
        [
          "punctuation.definition.string",
          "punctuation.definition.variable",
          "punctuation.definition.string",
          "punctuation.definition.parameters",
          "punctuation.definition.string",
          "punctuation.definition.array",
          "punctuation.terminator"
        ]
      ],
      [
        "Delimiters",
        [
          "punctuation.separator",
          "punctuation.section",
          "meta.brace",
          "meta.delimiter"
        ]
      ],
      ["Operators", ["keyword.operator"]],
      ["Keywords", ["keyword.control"]],
      [
        "Variables",
        ["variable.declaration", "variable.parameter", "variable.other"]
      ],
      ["Search", ["entity.name.filename.find-in-files"]],
      ["Search Line", ["constant.numeric.line-number.match.find-in-files"]],
      [
        "Functions",
        ["entity.name.function", "meta.require", "support.function.any-method"]
      ],
      [
        "Classes",
        [
          "support.class",
          "entity.name.class",
          "entity.name.type.class",
          "entity.name.type.module",
          "entity.other.inherited-class"
        ]
      ],
      ["Methods", ["keyword.other.special-method"]],
      ["Storage", ["storage"]],
      ["Support", ["support"]],
      [
        "Strings",
        [
          "string",
          "punctuation.definition.string",
          "support.constant.property-value"
        ]
      ],
      ["Numbers", ["constant.numeric"]],
      ["Symbols", ["constant.other.symbol"]],
      ["Boolean", ["constant.language.boolean"]],
      ["Constants", ["constant", "support.constant", "variable.language"]],
      ["Tags", ["entity.name.tag", "punctuation.definition.tag"]],
      ["Attributes", ["entity.other.attribute-name"]],
      [
        "Attribute IDs",
        ["entity.other.attribute-name.id", "punctuation.definition.entity"]
      ],
      ["Selector", ["meta.selector", "meta.object-literal.key"]],
      [
        "Headings",
        ["markup.heading punctuation.definition.heading", "entity.name.section"]
      ],
      ["Units", ["keyword.other.unit"]],
      ["Bold", ["markup.bold", "punctuation.definition.bold"]],
      ["Italic", ["markup.italic", "punctuation.definition.italic"]],
      ["Code", ["markup.raw.inline"]],
      ["Link Text", ["string.other.link"]],
      ["Link Url", ["meta.link"]],
      ["Lists", ["markup.list"]],
      ["Quotes", ["markup.quote"]],
      ["Separator", ["meta.separator"]],
      ["Inserted", ["markup.inserted"]],
      ["Deleted", ["markup.deleted"]],
      ["Changed", ["markup.changed"]],
      ["Colors", ["constant.other.color"]],
      ["Regular Expressions", ["string.regexp"]],
      ["Escape Characters", ["constant.character.escape"]],
      ["Embedded", ["punctuation.section.embedded", "variable.interpolation"]],
      ["Illegal", ["invalid", "invalid.illegal"]],
      ["Broken", ["invalid.broken"]],
      ["Deprecated", ["invalid.deprecated"]],
      ["Unimplemented", ["invalid.unimplemented"]]
    ];
    return data;
  }

  namedScopeToSettings(name: string) {
    const [uno1, uno2, uno3, uno4, uno5] = this.ramp(this.UNO);
    const [due1, due2, due3] = this.ramp(this.DUE);
    const [tre1] = this.ramp(this.TRE);
    const obj: { [key: string]: Style } = {
      Call: this.style(uno2),
      Parameter: this.style(due3),
      Comments: this.style(uno5),
      Punctuation: this.style(uno4),
      Delimiters: this.style(uno5),
      Operators: this.style(uno3),
      Search: this.style(uno2, "bold"),
      "Search Line": this.style(due1, "bold"),
      Keywords: this.style(uno1, "bold"),
      Variables: this.style(due3),
      Functions: this.style(due2, "bold"),
      Classes: this.style(due2, "bold"),
      Methods: this.style(due2),
      Storage: this.style(uno1, "bold"),
      Strings: this.style(tre1),
      Symbols: this.style(due1),
      Numbers: this.style(due1),
      Boolean: this.style(due1),
      Constants: this.style(due1),
      Support: this.style(uno2),
      Tags: this.style(due1),
      Attributes: this.style(due1),
      "Attribute IDs": this.style(due1),
      Selector: this.style(uno2),
      Headings: this.style(due1, "bold"),
      Units: this.style(due3),
      Bold: this.style(uno2, "bold"),
      Italic: this.style(uno2, "italic"),
      Code: this.style(uno3),
      "Link Text": this.style(uno4, "bold"),
      "Link Url": this.style(due1),
      Lists: this.style(due3),
      Quotes: this.style(uno4),
      Separator: this.style(uno4),
      Inserted: this.style(due2),
      Deleted: this.style(this.RED),
      Changed: this.style(uno4),
      Colors: this.style(due3),
      "Regular Expressions": this.style(uno3),
      "Escape Characters": this.style(uno3),
      Embedded: this.style(uno2),
      Broken: this.style(this.RED, "bold"),
      Deprecated: this.style(this.RED, "bold"),
      Unimplemented: this.style(this.RED, "bold"),
      Illegal: this.style(this.RED, "bold")
    };
    return obj[name];
  }

  style(color: string, ...fontStyle: string[]): Style {
    return {
      foreground: color,
      fontStyle: fontStyle.join(" ")
    };
  }

  build() {
    const json = JSON.stringify(this.config(), null, 2);
    const d = new Date().toString();
    console.log(`Saving theme "${this.filename()}" (${d})`);
    fs.writeFileSync(`themes/${this.filename()}.json`, json);
  }
}
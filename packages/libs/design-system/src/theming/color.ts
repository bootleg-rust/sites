export class Color {
  name: string;
  code: string;

  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }

  varDefinition(): string {
    return `--${this.name}: ${this.code};`;
  }

  var(): string {
    return `var(--${this.name}, ${this.code})`;
  }
}

type ThemeType = "light" | "dark";

export class SemanticColor {
  name: string;
  lightColor: Color;
  darkColor?: Color;
  fallback: ThemeType;
  code: string;
  colorName: string;
  var: string;

  constructor(
    name: string,
    light: Color,
    dark?: Color,
    fallback: ThemeType = "light",
  ) {
    this.name = name;
    this.lightColor = light;
    this.darkColor = dark;
    this.fallback = fallback;
    this.code = this._colorCode();
    this.colorName = this._colorName();
    this.var = this._var();
  }

  _colorName() {
    const fallbackName =
      this.fallback === "dark"
        ? this.darkColor?.name || this.lightColor.name
        : this.lightColor.name;
    return fallbackName;
  }

  _colorCode(): string {
    const fallbackCode =
      this.fallback === "dark"
        ? this.darkColor?.code || this.lightColor.code
        : this.lightColor.code;
    return fallbackCode;
  }

  _var(): string {
    return `var(--${this.name}, --${this.colorName}, ${this.code})`;
  }

  varDefinition(theme: ThemeType): string {
    const code =
      theme === "dark" ? this.darkColor?.code || "" : this.lightColor.code;
    return `--${this.name}: ${code};`;
  }

  redefine(semanticColor: SemanticColor) {
    return `--${this.name}: ${semanticColor.var};`;
  }
}

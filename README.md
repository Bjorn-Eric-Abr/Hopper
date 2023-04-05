# Hopper Extension for Visual Studio Code

## Feature Overview

Hopper provides fast cursor movement, inspired by Atom's package of the same name.

![hopper-preview](https://cloud.githubusercontent.com/assets/2899448/19660934/0481c44c-9a32-11e6-87cc-1f8913922ccb.gif)

## Commands

When Hopper is activated, decorations (two-letter codes) are created in the area around your cursor. Then simply type in a two letter code to jump to that position.

Where the decorations are created is dependent on the command you use:

-   `extension.hopper-word` (Hopper Word Mode): creates decorations for words in the area around your cursor
-   `extension.hopper-line` (Hopper Line Mode): creates decorations for non-empty lines in the area around your cursor

No default keybindings have been provided with this extension to avoid conflicts. Instructions for setting up your own keybindings are [here](https://code.visualstudio.com/docs/customization/keybindings)

To exit `Hopper mode`, press a non-`a-z` key such as `space` or `enter`.

To set up the keybindings like Atom (`Shift+Enter`), add the following to your `keybindings.json` (File/Code -> Preferences -> Keyboard Shortcuts):

```
    {
        "key": "shift+enter",
        "command": "extension.hopper-word",
        "when": "editorTextFocus"
    }
```

You can also set up a special keybinding to exit `Hopper mode`, for example `ESC`:

```
    {
        "key": "Escape",
        "command": "extension.hopper-exit",
        "when": "editorTextFocus && hopper.isHopperMode"
    }
```

## Settings

Hopper settings can be configured by adding entries into your `settings.json` (File -> Preferences -> User Settings). The following settings are available:

`"hopper.wordRegexp"`: The Regexp to use to match words in `Hopper Word Mode`. The default is `"\\w{2,}"` which matches a string of characters `[A-Za-z0-9_]`, length two or more. To match individual words inside camel case, for example, override with `"([A-Z]+([0-9a-z])*)|[a-z0-9]{2,}"`.

`"hopper.lineRegexp"`: The Regexp to use to match empty lines (Hopper won't create decorations for empty lines). The default is `"^\\s*$"`

`"hopper.fontFamily"`: Font used in Hopper decorations, defaults to font from settings

`"hopper.fontSize"`: Font size used in Hopper decorations, defaults to font size from settings - 1

`"hopper.darkThemeBackground"`: Background of Hopper decoration in dark themes

`"hopper.darkThemeForeground"`: Text color of Hopper decoration in dark themes

`"hopper.lightThemeBackground"`: Background of Hopper decoration in light themes

`"hopper.lightThemeForeground"`: Text color of Hopper decoration in light themes

## Support

[Create an issue](https://github.com/wmaurer/vscode-hopper/issues)

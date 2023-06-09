# Hopper Extension for Visual Studio Code

## Feature Overview

Hopper provides fast cursor movement using only your keyboard! It's like Vim's easymotion, or NeoVim's Leap - but for VSCode.

_This extension is a fork of [Jumpy](https://github.com/wmaurer/vscode-jumpy)_

![hopper-preview](https://user-images.githubusercontent.com/1815203/230308347-860d621e-135e-42e3-a04e-e482e42b7bca.gif)

## Commands

When Hopper is activated, decorations (two-letter codes) are created in active editor. Type in a two letter code to jump to that position.

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

`"hopper.selectWord"`: Select the jumped to word

`"hopper.fontFamily"`: Font used in Hopper decorations, defaults to font from settings

`"hopper.fontSize"`: Font size used in Hopper decorations, defaults to font size from settings - 1

`"hopper.background"`: Background of Hopper decoration

`"hopper.foreground"`: Text color of Hopper decoration

`"hopper.wordRegexp"`: The Regexp to use to match words in `Hopper Word Mode`. The default is `"\\w{2,}"` which matches a string of characters `[A-Za-z0-9_]`, length two or more. To match individual words inside camel case, for example, override with `"([A-Z]+([0-9a-z])*)|[a-z0-9]{2,}"`.

`"hopper.lineRegexp"`: The Regexp to use to match empty lines (Hopper won't create decorations for empty lines). The default is `"^\\s*$"`

## Support

[Create an issue](https://github.com/Bjorn-Eric-Abr/Hopper/issues)

------

#### Credits

Forked from [Jumpy VSCode Extension](https://github.com/wmaurer/vscode-jumpy)

Hopper logo image by [Larry George II](https://unsplash.com/@itslarryg)

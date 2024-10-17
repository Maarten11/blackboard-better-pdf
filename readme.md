# Blackboard Better PDF

A browser extension that allows you to open BlackBoard PDF's in an external tab.

## Installation

Extract the zip into a folder on your computer.

Go to your browser's extensions and select `load unpacked` (you might need to enable developer mode for this to work).
Select the folder you just created (it should have the `manifest.json` file inside it).

## Using the extension

### Keyboard

When looking at a Blackboard PDF view, press Ctrl+B (Command + B on Mac)

### Manually

When looking at a Blackboard PDF view, click the extension in the extensions menu.

A popup will appear with a button that allows you to fetch all pdf links

## Issues

Feel free to point out any issues with this extension here on GitHub

## Developing

For developing, typescript is used, because who uses javascript nowadays.

### Before developing run:

```bash
$ npm i
```
To get the correct types

### Before pushing run:
```bash
$ tsc
```
As this will compile the ts files into plain js

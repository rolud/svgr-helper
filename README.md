# **SVGR Helper**

Tool to quick convert multiple svg files in React or ReactNative components

Based on [SVGR](https://react-svgr.com/)

## Usage

Create `input` folder and put inside it svg files. Then run command: 

```
npm start [-- options]
```

### Options
- `-icon`: Replace SVG width and height with 1em to make SVG inherit text size.
- `-native`: Modify all SVG nodes with uppercase and use react-native-svg template.
- `-typescript`: Generate .tsx files with TypeScript bindings.
- `-prefix <prefix-value>`: Add a prefix to components and files name.
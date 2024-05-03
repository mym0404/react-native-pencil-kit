<p align="center">
  <a href="https://github.com/mym0404/react-native-pencil-kit">
    <img width="160px" src="https://raw.githubusercontent.com/mym0404/image-archive/master/202405040314257.webp"><br/>
  </a>
  <h1 align="center">React Native Pencil Kit</h1>
  <p align="center">
  <a href="https://www.npmjs.com/package/react-native-pencil-kit"><img src="https://img.shields.io/npm/dm/react-native-pencil-kit.svg?style=flat-square" alt="NPM downloads"></a>
  <a href="https://www.npmjs.com/package/react-native-pencil-kit"><img src="https://img.shields.io/npm/v/react-native-pencil-kit.svg?style=flat-square" alt="NPM version"></a>
  <a href="/LICENSE"><img src="https://img.shields.io/npm/l/react-native-pencil-kit.svg?style=flat-square" alt="License"></a>
  <h3 align="center">iOS Easy & Robust Pencil Kit Porting</h3>
  </p>
</p>

**React Native Pencil Kit** is a full API support iOS PencilKit framework porting.

![preview](https://raw.githubusercontent.com/mym0404/image-archive/master/202405040325760.webp)

## Getting Started

```shell
yarn add react-native-pencil-kit
```

Link `PencilKit.framework`

![xcode](https://raw.githubusercontent.com/mym0404/image-archive/master/202405040319998.webp)

> With Fabric, we should access c++ functions and we should use objective-c++.
> This prevents us from Apple SDK framework module importing and we cannot link PencilKit automatically at now.

## Usage

```tsx
import PencilKitView, { type PencilKitRef, type PencilKitTool } from 'react-native-pencil-kit';

<PencilKitView style={{ flex: 1 }} />
```

> [!NOTE]
> You can expand to show full example!
<details>
<summary>Full Example</summary>

```tsx
const allPens = [
  'pen',
  'pencil',
  'marker',
  'crayon',
  'monoline',
  'watercolor',
  'fountainPen',
] satisfies PencilKitTool[];

const allErasers = [
  'eraserBitmap',
  'eraserVector',
  'eraserFixedWidthBitmap',
] satisfies PencilKitTool[];

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

export default function App() {
  const ref = useRef<PencilKitRef>(null);

  const path = `${DocumentDirectoryPath}/drawing.dat`;

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <PencilKitView
        ref={ref}
        style={{ flex: 1 }}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        drawingPolicy={'anyinput'}
        backgroundColor={'#aaaaff22'}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 4,
          padding: 8,
          paddingBottom: 120,
        }}
      >
        <Btn onPress={() => ref.current?.showToolPicker()} text={'show'} />
        <Btn onPress={() => ref.current?.hideToolPicker()} text={'hide'} />
        <Btn onPress={() => ref.current?.clear()} text={'clear'} />
        <Btn onPress={() => ref.current?.undo()} text={'undo'} />
        <Btn onPress={() => ref.current?.redo()} text={'redo'} />
        <Btn onPress={() => ref.current?.saveDrawing(path).then(console.log)} text={'save'} />
        <Btn onPress={() => ref.current?.loadDrawing(path)} text={'load'} />
        <Btn onPress={() => ref.current?.getBase64Data().then(console.log)} text={'get base64'} />
        <Btn onPress={() => ref.current?.loadBase64Data('')} text={'load base64'} />
        {allPens.map((p) => (
          <Btn
            key={p}
            variant={1}
            onPress={() =>
              ref.current?.setTool({
                toolType: p,
                width: 3 + Math.random() * 5,
                color: getRandomColor(),
              })
            }
            text={p}
          />
        ))}
        {allErasers.map((p) => (
          <Btn
            variant={2}
            key={p}
            onPress={() =>
              ref.current?.setTool({
                toolType: p,
                width: 3 + Math.random() * 5,
                color: getRandomColor(),
              })
            }
            text={p}
          />
        ))}
      </View>
    </View>
  );
}
```

</details>

## Props

| Props                             | Description                                                                                                                    | Default |
|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------------|---------|
| alwaysBounceVertical              | A Boolean value that determines whether bouncing always occurs when vertical scrolling reaches the end of the content.         | true    |
| alwaysBounceHorizontal            | A Boolean value that determines whether bouncing always occurs when horizontal scrolling reaches the end of the content view.  | true    |
| isRulerActive                     | A Boolean value that indicates whether a ruler view is visible on the canvas.                                                  | true    |
| drawingPolicy                     | The policy that controls the types of touches allowed when drawing on the canvas. This properties can be applied from iOS 14.0 | default |
| backgroundColor                   | The canvas background color                                                                                                    | none    |
| isOpaque                          | Whether the canvas is opaque                                                                                                   | true    |
| toolPickerVisibilityDidChange     | Tells the delegate that the tool picker UI changed visibility.                                                                 |         |
| toolPickerIsRulerActiveDidChange  | Tells the delegate that the ruler active state was changed by the user.                                                        |         |
| toolPickerFramesObscuredDidChange | Tells the delegate that the frames the tool picker obscures changed.                                                           |         |
| toolPickerSelectedToolDidChange   | Tells the delegate that the selected tool was changed by the user.                                                             |         |
| canvasViewDidBeginUsingTool       | Called when the user starts using a tool, eg. selecting, drawing, or erasing.                                                  |         |
| canvasViewDidEndUsingTool         | Called when the user stops using a tool, eg. selecting, drawing, or erasing.                                                   |         |
| canvasViewDrawingDidChange        | Called after the drawing on the canvas did change.                                                                             |         |
| canvasViewDidFinishRendering      | Called after setting `drawing` when the entire drawing is rendered and visible.                                                |         |

## Commands


| Method                                                                                      | Description                                            |
|---------------------------------------------------------------------------------------------|--------------------------------------------------------|
| clear()                                                                                     | Clear canvas                                           |
| showToolPicker()                                                                            | Show Palette                                           |
| hideToolPicker()                                                                            | Hide Palette                                           |
| redo()                                                                                      | Redo last drawing action                               |
| undo()                                                                                      | Undo last drawing action                               |
| saveDrawing: (path: string) => Promise<string>;                                             | Save drawing data into file system, return base64 data |
| loadDrawing: (path: string) => void;                                                        | Load drawing data from file system                     |
| getBase64Data: () => Promise<string>;                                                       | Get current drawing data as base64 string form         |
| loadBase64Data: (base64: string) => void;                                                   | Load base64 drawing data into canvas                   |
| setTool: (params: { toolType: PencilKitTool; width?: number; color?: ColorValue }) => void; | Set `PencilKitTool` type with width and color          |

## Tools

```tsx
- pen
- pencil
- marker
- monoline // ios 17
- fountainPen // ios 17
- watercolor // ios 17
- crayon // ios 17
- eraserVector // width is supported from 16.4
- eraserBitmap // width is supported from 16.4
- eraserFixedWidthBitmap // ios 16.4
```

## Utils

Use `PencilKitUtil` for using utilty functions.

- `getAvailableTools(): string[]`
- `isPencilKitAvailable(): boolean`

## Troubleshooting

- Pencilkit is not rendered
  - This package supports only equal or greater than 14.0 version.
  - This package supports only Fabric.

## Contributing

- [Contributing](https://github.com/mym0404/react-native-pencil-kit/blob/main/CONTRIBUTING.md)
- [Issues](https://github.com/mym0404/react-native-pencil-kit/issues)
- [PRs](https://github.com/mym0404/react-native-pencil-kit/pulls)
- [Code of Conduct](https://github.com/mym0404/react-native-pencil-kit/blob/main/CODE_OF_CONDUCT.md)

## License

- See [LICENSE](/LICENSE)

---

<p align="center">
  <a href="https://mjstudio.net/">
    <img width="75px" src="https://raw.githubusercontent.com/mym0404/image-archive/master/202404201239152.webp">
  </a>
  <p align="center">
    Built and maintained by <a href="https://mjstudio.net/">MJ Studio</a>.
  </p>
</p>

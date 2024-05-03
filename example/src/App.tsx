import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PencilKitView, { type PencilKitRef, type PencilKitTool } from 'react-native-pencil-kit';
import { DocumentDirectoryPath } from '@dr.pogodin/react-native-fs';

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
        <Btn onPress={() => ref.current?.saveDrawing(path)} text={'save'} />
        <Btn onPress={() => ref.current?.loadDrawing(path)} text={'load'} />
        <Btn onPress={() => ref.current?.getBase64Data()} text={'get base64'} />
        <Btn onPress={() => ref.current?.loadBase64Data('')} text={'load base64'} />
        {allPens.map((p) => (
          <Btn
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
        {allErasers.map((p) => (
          <Btn
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

const Btn = ({ onPress, text }: { onPress: () => void; text: string }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ padding: 8, backgroundColor: 'black', borderRadius: 4 }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{text.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PencilKitView, { type PencilKitRef } from 'react-native-pencil-kit';
import { DocumentDirectoryPath } from '@dr.pogodin/react-native-fs';

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
        backgroundColor={'blue'}
      />
      <View
        style={{
          height: 300,
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 4,
          padding: 8,
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
        <Btn
          onPress={() =>
            ref.current?.setTool({
              toolType: 'pen',
              width: 2,
              color: 'red',
            })
          }
          text={'pen'}
        />
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

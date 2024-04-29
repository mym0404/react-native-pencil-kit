import type { ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeProps extends ViewProps {
  alwaysBounceVertical?: boolean;
}

export default codegenNativeComponent<NativeProps>('RNPencilKit');

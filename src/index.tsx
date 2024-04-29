import { type ForwardedRef, forwardRef, useImperativeHandle } from 'react';
import type { ViewProps } from 'react-native';

import NativePencilKitView from './PencilKitViewNativeComponent';

export type PencilKitProps = {} & ViewProps;
export type PencilKitCommands = {};
function PencilKit({ ...rest }: PencilKitProps, ref: ForwardedRef<PencilKitCommands>) {
  useImperativeHandle(
    ref,
    () => {
      return {};
    },
    [],
  );

  return <NativePencilKitView {...rest} />;
}

const PencilKitView = forwardRef(PencilKit);
export default PencilKitView;
export { PencilKitView as PencilKit };

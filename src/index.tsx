import { type ForwardedRef, forwardRef } from 'react';

import type { PencilKitProps, PencilKitRef, PencilKitTool } from './component/PencilKit';
import { PencilKit } from './component/PencilKit';
import { PencilKitUtil } from './util/PencilKitUtil';

export const PencilKitView = forwardRef(
  (props: PencilKitProps, ref: ForwardedRef<PencilKitRef>) => {
    return <PencilKit {...props} ref={ref} />;
  },
);
export default PencilKitView;

export type { PencilKitProps, PencilKitRef, PencilKitTool };
export { PencilKitUtil };

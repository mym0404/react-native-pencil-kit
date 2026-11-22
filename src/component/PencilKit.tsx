import {
  type ForwardedRef,
  forwardRef,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { type CodegenTypes, type ColorValue, Text, type ViewProps } from 'react-native';

export type PencilKitProps = {
  alwaysBounceVertical?: boolean;
  alwaysBounceHorizontal?: boolean;
  isRulerActive?: boolean;
  backgroundColor?: ColorValue;
  drawingPolicy?: CodegenTypes.WithDefault<'default' | 'anyinput' | 'pencilonly', 'default'>;
  isOpaque?: boolean;

  onToolPickerVisibilityDidChange?: CodegenTypes.DirectEventHandler<{}>;
  onToolPickerIsRulerActiveDidChange?: CodegenTypes.DirectEventHandler<{}>;
  onToolPickerFramesObscuredDidChange?: CodegenTypes.DirectEventHandler<{}>;
  onToolPickerSelectedToolDidChange?: CodegenTypes.DirectEventHandler<{}>;
  onCanvasViewDidBeginUsingTool?: CodegenTypes.DirectEventHandler<{}>;
  onCanvasViewDidEndUsingTool?: CodegenTypes.DirectEventHandler<{}>;
  onCanvasViewDrawingDidChange?: CodegenTypes.DirectEventHandler<{}>;
  onCanvasViewDidFinishRendering?: CodegenTypes.DirectEventHandler<{}>;
} & ViewProps;
export type PencilKitTool =
  | 'pen'
  | 'pencil'
  | 'marker'
  | 'monoline'
  | 'fountainPen'
  | 'watercolor'
  | 'crayon'
  | 'reed'
  | 'eraserVector'
  | 'eraserBitmap'
  | 'eraserFixedWidthBitmap'
  | 'lasso';
export type PencilKitRef = {
  clear: () => void;
  showToolPicker: () => void;
  hideToolPicker: () => void;
  redo: () => void;
  undo: () => void;
  setTool: (params: { toolType: PencilKitTool; width?: number; color?: ColorValue }) => void;
  saveDrawing: (path: string) => Promise<string>;
  loadDrawing: (path: string) => Promise<void>;
  getBase64Data: () => Promise<string>;
  getBase64PngData: (params?: { scale?: number }) => Promise<string>;
  getBase64JpegData: (params?: { scale?: number; compression?: number }) => Promise<string>;
  loadBase64Data: (base64: string) => Promise<void>;
};
export type PencilKitComponentType = ForwardRefExoticComponent<
  PencilKitProps & RefAttributes<PencilKitRef>
>;

export const PencilKit: PencilKitComponentType = forwardRef(
  (_props: PencilKitProps, _ref: ForwardedRef<PencilKitRef>) => {
    return <Text>{"This platform doesn't support pencilkit"}</Text>;
  },
);

import { type ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { type ColorValue, processColor, type ViewProps } from 'react-native';
import type { DirectEventHandler, WithDefault } from 'react-native/Libraries/Types/CodegenTypes';

import NativePencilKitView, { Commands } from './spec/RNPencilKitNativeComponent';

export type PencilKitProps = {
  alwaysBounceVertical?: boolean;
  alwaysBounceHorizontal?: boolean;
  isRulerActive?: boolean;
  backgroundColor?: ColorValue;
  drawingPolicy?: WithDefault<'default' | 'anyinput' | 'pencilonly', 'default'>;
  isOpaque?: boolean;

  onToolPickerVisibilityDidChange?: DirectEventHandler<{}>;
  onToolPickerIsRulerActiveDidChange?: DirectEventHandler<{}>;
  onToolPickerFramesObscuredDidChange?: DirectEventHandler<{}>;
  onToolPickerSelectedToolDidChange?: DirectEventHandler<{}>;
  onCanvasViewDidBeginUsingTool?: DirectEventHandler<{}>;
  onCanvasViewDidEndUsingTool?: DirectEventHandler<{}>;
  onCanvasViewDrawingDidChange?: DirectEventHandler<{}>;
  onCanvasViewDidFinishRendering?: DirectEventHandler<{}>;
} & ViewProps;
export type PencilKitTool =
  | 'pen'
  | 'pencil'
  | 'marker'
  | 'monoline'
  | 'fountainPen'
  | 'watercolor'
  | 'crayon'
  | 'eraserVector'
  | 'eraserBitmap'
  | 'eraserFixedWidthBitmap';
export type PencilKitRef = {
  clear: () => void;
  showToolPicker: () => void;
  hideToolPicker: () => void;
  redo: () => void;
  undo: () => void;
  saveDrawing: (path: string) => void;
  loadDrawing: (path: string) => string;
  getBase64Data: () => void;
  loadBase64Data: (base64: string) => void;
  setTool: (params: { toolType: PencilKitTool; width?: number; color?: ColorValue }) => void;
};
function PencilKit(
  {
    alwaysBounceHorizontal = true,
    alwaysBounceVertical = true,
    isRulerActive = false,
    drawingPolicy = 'default',
    backgroundColor,
    isOpaque = true,
    onToolPickerFramesObscuredDidChange,
    onToolPickerIsRulerActiveDidChange,
    onToolPickerSelectedToolDidChange,
    onToolPickerVisibilityDidChange,
    onCanvasViewDidBeginUsingTool,
    onCanvasViewDidEndUsingTool,
    onCanvasViewDidFinishRendering,
    onCanvasViewDrawingDidChange,
    ...rest
  }: PencilKitProps,
  ref: ForwardedRef<PencilKitRef>,
) {
  const nativeRef = useRef(null);
  useImperativeHandle(
    ref,
    () => ({
      clear: () => Commands.clear(nativeRef.current!),
      showToolPicker: () => Commands.showToolPicker(nativeRef.current!),
      hideToolPicker: () => Commands.hideToolPicker(nativeRef.current!),
      redo: () => Commands.redo(nativeRef.current!),
      undo: () => Commands.undo(nativeRef.current!),
      saveDrawing: (path) => Commands.saveDrawing(nativeRef.current!, path),
      loadDrawing: (path) => Commands.loadDrawing(nativeRef.current!, path),
      getBase64Data: () => Commands.getBase64Data(nativeRef.current!),
      loadBase64Data: (base64) => Commands.loadBase64Data(nativeRef.current!, base64),
      setTool: ({ color, toolType, width }) => {
        console.log(color, processColor(color));
        Commands.setTool(
          nativeRef.current!,
          toolType,
          width ?? 0,
          color ? (processColor(color) as number) : 0,
        );
      },
    }),
    [],
  );

  return (
    <NativePencilKitView
      ref={nativeRef}
      {...{
        alwaysBounceHorizontal,
        alwaysBounceVertical,
        isRulerActive,
        drawingPolicy,
        backgroundColor: processColor(backgroundColor) as number,
        isOpaque,
        onToolPickerFramesObscuredDidChange,
        onToolPickerIsRulerActiveDidChange,
        onToolPickerSelectedToolDidChange,
        onToolPickerVisibilityDidChange,
        onCanvasViewDidBeginUsingTool,
        onCanvasViewDidEndUsingTool,
        onCanvasViewDidFinishRendering,
        onCanvasViewDrawingDidChange,
      }}
      {...rest}
    />
  );
}

const PencilKitView = forwardRef(PencilKit);
export default PencilKitView;
export { PencilKitView as PencilKit };

import { type ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { processColor, Text } from 'react-native';
import { type PencilKitProps, type PencilKitRef, PencilKitUtil } from 'react-native-pencil-kit';

import NativePencilKitView, { Commands } from '../spec/RNPencilKitNativeComponent';

function PencilKitComponent(
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
      setTool: ({ color, toolType, width }) =>
        Commands.setTool(
          nativeRef.current!,
          toolType,
          width ?? 0,
          color ? (processColor(color) as number) : 0,
        ),
    }),
    [],
  );

  if (!PencilKitUtil.isPencilKitAvailable()) {
    return (
      <Text>{"This iOS version doesn't support pencilkit. The minimum requirement is 14.0"}</Text>
    );
  }

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

export const PencilKit = forwardRef(PencilKitComponent);

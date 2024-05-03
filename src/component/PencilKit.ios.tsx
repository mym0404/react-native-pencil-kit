import { type ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react';
import { processColor, Text } from 'react-native';
import { type PencilKitProps, type PencilKitRef, PencilKitUtil } from 'react-native-pencil-kit';

import NativePencilKitView, { Commands } from '../spec/RNPencilKitNativeComponent';
import { useLazyPromise } from '../util/useLazyPromise';

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
  const {
    resolve: resolveGetBase64Data,
    reject: rejectGetBase64Data,
    resetPromise: resetGetBase64DataPromise,
  } = useLazyPromise<string>();

  const {
    resolve: resolveSaveDrawing,
    reject: rejectSaveDrawing,
    resetPromise: resetSaveDrawingPromise,
  } = useLazyPromise<string>();

  useImperativeHandle(
    ref,
    () => ({
      clear: () => Commands.clear(nativeRef.current!),
      showToolPicker: () => Commands.showToolPicker(nativeRef.current!),
      hideToolPicker: () => Commands.hideToolPicker(nativeRef.current!),
      redo: () => Commands.redo(nativeRef.current!),
      undo: () => Commands.undo(nativeRef.current!),
      saveDrawing: (path) => {
        const promise = resetSaveDrawingPromise();
        Commands.saveDrawing(nativeRef.current!, path);

        return promise;
      },
      loadDrawing: (path) => Commands.loadDrawing(nativeRef.current!, path),
      getBase64Data: () => {
        const promise = resetGetBase64DataPromise();
        Commands.getBase64Data(nativeRef.current!);

        return promise;
      },
      loadBase64Data: (base64) => Commands.loadBase64Data(nativeRef.current!, base64),
      setTool: ({ color, toolType, width }) =>
        Commands.setTool(
          nativeRef.current!,
          toolType,
          width ?? 0,
          color ? (processColor(color) as number) : 0,
        ),
    }),
    [resetSaveDrawingPromise, resetGetBase64DataPromise],
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
        onGetBase64Data: ({ nativeEvent: { success, base64 } }) => {
          if (success) {
            resolveGetBase64Data.current?.(base64 ?? '');
          } else {
            rejectGetBase64Data.current?.();
          }
        },
        onSaveDrawing: ({ nativeEvent: { base64, success } }) => {
          if (success) {
            resolveSaveDrawing.current?.(base64 ?? '');
          } else {
            rejectSaveDrawing.current?.();
          }
        },
      }}
      {...rest}
    />
  );
}

export const PencilKit = forwardRef(PencilKitComponent);

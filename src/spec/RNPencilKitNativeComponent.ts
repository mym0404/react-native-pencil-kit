import type React from 'react';
import {
  codegenNativeCommands,
  codegenNativeComponent,
  type CodegenTypes,
  type HostComponent,
  type ViewProps,
} from 'react-native';

export interface NativeProps extends ViewProps {
  alwaysBounceVertical: boolean;
  alwaysBounceHorizontal: boolean;
  isRulerActive: boolean;
  canvasBackgroundColor: CodegenTypes.Int32;
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
}

interface NativeCommands {
  clear: (ref: React.ComponentRef<HostComponent<NativeProps>>) => void;
  showToolPicker: (ref: React.ComponentRef<HostComponent<NativeProps>>) => void;
  hideToolPicker: (ref: React.ComponentRef<HostComponent<NativeProps>>) => void;
  redo: (ref: React.ComponentRef<HostComponent<NativeProps>>) => void;
  undo: (ref: React.ComponentRef<HostComponent<NativeProps>>) => void;
  setTool: (
    ref: React.ComponentRef<HostComponent<NativeProps>>,
    toolType: string,
    width?: CodegenTypes.Double,
    color?: CodegenTypes.Int32,
  ) => void;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['clear', 'showToolPicker', 'hideToolPicker', 'redo', 'undo', 'setTool'],
});
export default codegenNativeComponent<NativeProps>('RNPencilKit');

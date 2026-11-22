import { type CodegenTypes, type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isPencilKitAvailable(): boolean;
  isiOSEqualsOrGreaterThan17(): boolean;
  isiOSEqualsOrGreaterThan16_4(): boolean;
  getAvailableTools(): string[];
  getBase64Data(viewId: CodegenTypes.Double): Promise<string>;
  getBase64PngData(viewId: CodegenTypes.Double, scale: CodegenTypes.Double): Promise<string>;
  getBase64JpegData(
    viewId: CodegenTypes.Double,
    scale: CodegenTypes.Double,
    compression: CodegenTypes.Double,
  ): Promise<string>;
  saveDrawing(viewId: CodegenTypes.Double, path: string): Promise<string>;
  loadDrawing(viewId: CodegenTypes.Double, path: string): Promise<void>;
  loadBase64Data(viewId: CodegenTypes.Double, base64: string): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNPencilKitUtil');

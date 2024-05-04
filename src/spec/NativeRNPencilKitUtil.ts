import { type TurboModule, TurboModuleRegistry } from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  isPencilKitAvailable(): boolean;
  isiOSEqualsOrGreaterThan17(): boolean;
  isiOSEqualsOrGreaterThan16_4(): boolean;
  getAvailableTools(): string[];
  getBase64Data(viewId: Double): Promise<string>;
  saveDrawing(viewId: Double, path: string): Promise<string>;
  loadDrawing(viewId: Double, path: string): Promise<void>;
  loadBase64Data(viewId: Double, base64: string): Promise<void>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNPencilKitUtil');

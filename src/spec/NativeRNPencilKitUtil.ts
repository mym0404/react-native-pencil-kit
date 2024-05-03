import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  isPencilKitAvailable(): boolean;
  isiOSEqualsOrGreaterThan17(): boolean;
  isiOSEqualsOrGreaterThan16_4(): boolean;
  getAvailableTools(): string[];
}

export default TurboModuleRegistry.getEnforcing<Spec>('RNPencilKitUtil');

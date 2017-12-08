import { UnlockData, ActionCart, DeviceDetail } from './unlock.model';

/**
 * Application Store for state management
 */
export interface AppStore {
  cms: UnlockData;
  deviceDetail: DeviceDetail;
}

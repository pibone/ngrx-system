import { localStorageSync } from 'ngrx-store-localstorage';
import { NgrxSystemConfig } from '../../models';
export const localStorageMeta = (config: NgrxSystemConfig<any>) =>
  localStorageSync(config.storage);

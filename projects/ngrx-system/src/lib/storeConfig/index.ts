import { StoreConfig } from '@ngrx/store/src/store_module';
import { AppState } from 'app/models/store/AppState';
import { metaReducers } from './system.metareducers';

export const storeConfig: StoreConfig<AppState> = {
  metaReducers,
};

import { NgModule, ModuleWithProviders } from '@angular/core';
import { defaultConfig } from './config';
import { NgrxSystemConfig } from './models';
import { NgrxSystemService } from './ngrx-system.service';
import { metaReducers as defaultMetaReducers } from './storeConfig/system.metareducers';
import { StoreDevtoolsModule } from './ngrx-platform/modules/store-devtools';
import { StoreModule, StoreRootModule } from './ngrx-platform/modules/store';
import { EffectsModule } from './ngrx-platform/modules/effects';
import { EffectsRootModule } from './ngrx-platform/modules/effects/src/effects_root_module';

@NgModule({
  imports: [StoreRootModule, EffectsRootModule]
})
export class NgrxSystemRootModule {
  constructor(private systemService: NgrxSystemService) {}
}

@NgModule({})
export class NgrxSystemModule {
  static forRoot<T>(
    config: NgrxSystemConfig<T> = defaultConfig,
    metaReducers = defaultMetaReducers
  ): ModuleWithProviders {
    const devtoolsModule = StoreDevtoolsModule.instrument(config.devTools);
    const effectsModule = EffectsModule.forRoot(config.effects);
    const storeModule = StoreModule.forRoot(config.rootReducers, {
      initialState: config.initialState,
      metaReducers: metaReducers.map(mr => mr(config))
    });
    return {
      providers: [
        ...(storeModule.providers ? storeModule.providers : []),
        ...(effectsModule.providers ? effectsModule.providers : []),
        ...(devtoolsModule.providers ? devtoolsModule.providers : []),
        NgrxSystemService
      ],
      ngModule: NgrxSystemRootModule
    };
  }
}
/* TODO:
custom decryption could be based on a system state
rememberMe could skip saving the data if not setted to true
encrypt could say to library user that current state is already encrypted

{
  encrypt: boolean // do not save, default true if decryption is
  // activated, false if customDecrypt: true
  rememberMe: boolean
}

it could skip standard decryption if customDecrypt is true, it will wait until
the decryption key is given and save it locally to avoid the possibility to be read
action to decrypt
{
  type: SYSTEM_DECRYPT,
  payload: 'encryption key (must not be logged nor passed to reducers)'
}

*/

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { EffectSources } from '@ngrx/effects';

export class EffectsRunner implements OnDestroy {
  private effectsSubscription: Subscription | null = null;

  constructor() {}

  // start() {
  //   if (!this.effectsSubscription) {
  //     this.effectsSubscription = (<any>this.effectSources)
  //       .toActions()
  //       .subscribe(this.store);
  //   }
  // }

  ngOnDestroy() {
    if (this.effectsSubscription) {
      this.effectsSubscription.unsubscribe();
      this.effectsSubscription = null;
    }
  }
}

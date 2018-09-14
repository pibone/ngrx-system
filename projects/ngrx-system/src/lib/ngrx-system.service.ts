import { Injectable, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from './ngrx-platform/modules/store';
import { throttleTime, map } from 'rxjs/operators';
import { SYSTEM_EXCEPTION } from './storeConfig/system.actions';

@Injectable({
  providedIn: 'root',
})
export class NgrxSystemService {
  private store: Store<{}>;
  private commit$: Subject<Error> = new Subject<Error>();
  constructor(private injector: Injector) {
    setTimeout(() => {
      this.store = this.injector.get(Store);
      this.commit$
        .pipe(
          throttleTime(0),
          map(SYSTEM_EXCEPTION),
        )
        .subscribe(a => this.store.dispatch(a));
    }, 0);
  }
  handleError(error: Error) {
    this.commit$.next(error);
  }
}

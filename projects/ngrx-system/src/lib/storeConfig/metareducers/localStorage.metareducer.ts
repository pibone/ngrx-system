import { localStorageSync } from 'ngrx-store-localstorage';
export const localStorageMeta = localStorageSync({
  keys: [{ auth: ['token', 'username'] }, 'lang'],
  rehydrate: true,
});

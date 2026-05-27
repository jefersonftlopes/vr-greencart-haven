import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cartReducer } from "./cartSlice";
import { filtersReducer } from "./filtersSlice";
import { langReducer } from "./langSlice";
import { productsApi } from "./productsApi";

const cartPersistConfig = {
  key: "greencart-cart",
  version: 1,
  storage,
  whitelist: ["items", "lastOrderId"],
};

const langPersistConfig = {
  key: "greencart-lang",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  filters: filtersReducer,
  lang: persistReducer(langPersistConfig, langReducer),
  [productsApi.reducerPath]: productsApi.reducer,
});

export function createAppStore() {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(productsApi.middleware),
  });
  setupListeners(store.dispatch);
  return store;
}

export const store = createAppStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof createAppStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

import { combineReducers, configureStore } from '@reduxjs/toolkit'
/* gán thư mục (.slides/counterSlice) vào tên (counterReducer) */
import productReducer from './slides/productSlide'
import userReducer from './slides/userSlide'
import orderProduct from './slides/orderSlide'

// thư viện dùng để duy trì cái state khi reload lại ----
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER

} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// --------------

// ------
// đoạn hàm xử lý việc duy trì state
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // này dùng để ko cho cái thằng nào lưu vào sotre để duy trì
  blacklist: ['product', 'user']
}

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  order: orderProduct
})

const persistedReducer = persistReducer(persistConfig, rootReducer)



// --------------






export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
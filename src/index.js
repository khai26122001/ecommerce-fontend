import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* import thư viện của css vào để xử dụng */
import 'antd/dist/reset.css';

/* import thư viện của redux vào để xử dụng */
import { Provider } from 'react-redux'
/* Sửa ./app/store lại thành .redux/store  */
import { persistor, store } from './redux/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';



// thư viện để duy trì cái state kết hợp với bên phía --store.js--
import { PersistGate } from 'redux-persist/integration/react'

// dùng để lấy được dữ liệu bên backend
const root = ReactDOM.createRoot(document.getElementById('root'));

// Create a client
// dùng để lấy được dữ liệu bên backend
const queryClient = new QueryClient()

root.render(
  // <React.StrictMode>
  // dùng để lấy được dữ liệu bên backend
  <QueryClientProvider client={queryClient}>
    {/* dùng để lấy được dữ liệu bên backend */}
    <Provider store={store}>
      {/* để duy trì cái state kết hợp với bên phía --store.js-- */}
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    {/* dùng để lấy được dữ liệu bên backend */}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

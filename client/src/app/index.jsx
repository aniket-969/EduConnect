import { ToastContainer } from 'react-toastify';
import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
  return (
    <AppProvider>
      <AppRouter />
      <ToastContainer/>
    </AppProvider>
  );
};
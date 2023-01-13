import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import { store } from './store/store';
import AppRouter from './router/AppRouter';
import { Footer } from './components';


export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}
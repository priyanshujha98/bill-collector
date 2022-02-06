
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoute } from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles/app.scss"
import { Toaster } from 'react-hot-toast';
import { ToastComponent } from './components/Common/TostComponent';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" reverseOrder={false}></Toaster>
      <AppRoute/>
      <ToastComponent></ToastComponent>
    </BrowserRouter>
  );
}

export default App;

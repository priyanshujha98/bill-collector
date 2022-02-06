
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRoute } from './routes/routes';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./styles/app.scss"

function App() {
  return (
    <BrowserRouter>
      <AppRoute/>
    </BrowserRouter>
  );
}

export default App;

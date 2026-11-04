import Header from './components/Header';
import Footer from './components/Footer';
import Bot from './components/Bot';
import {Outlet} from 'react-router-dom';
export default function App() {
  return (
    <div >
      <Header />
      <Outlet />
      <Footer />
      <Bot />
    </div>
  );
 }
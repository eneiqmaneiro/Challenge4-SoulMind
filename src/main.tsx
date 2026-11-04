import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './globals.css'


import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Avatar from './pages/Avatar/index.tsx';
import Contato from './pages/Contato/index.tsx';
import PaginaErro from './pages/Error/index.tsx';
import Faq from './pages/Faq/index.tsx';
import Home from './pages/Home/index.tsx';
import Contas from './pages/Contas/index.tsx';
import DetalhesConta from './pages/DetalhesConta/index.tsx';
import QuemSomos from './pages/QuemSomos/index.tsx';
import Sobre from './pages/Sobre/index.tsx';
import Tour from './pages/Tour/index.tsx';

const router = createBrowserRouter([
   {path: "/", element: <App />, 
    errorElement: <PaginaErro />, children: [
      { path: "/", element: <Home /> },
      { path: "/tour", element: <Tour /> },
      { path: "/avatar", element: <Avatar /> },
      { path: "/contato", element: <Contato /> },
      { path: "/faq", element: <Faq /> },
      { path: "/contas", element: <Contas /> },
      { path: "/contas/:id", element: <DetalhesConta /> },
      { path: "/quem-somos", element: <QuemSomos /> },
      { path: "/sobre", element: <Sobre /> } ,
  ]
}]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)


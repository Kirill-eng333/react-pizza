import Loadable from 'react-loadable';
import React, { Suspense } from 'react'
import{Routes, Route,} from "react-router-dom"

import Home from './pages/Home';

import './scss/app.scss';
import {MainLayout} from './loyauts/MainLayout';


const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>ХУЙ ТЕБЕ</div>
});



const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))


function App() {
  return (
          <Routes>
            <Route path = "/" element={<MainLayout />}>

                 <Route path="/" element= {<Home />} />
                 <Route path="cart" element= {<Suspense fallback ={<div>Кирилл работает...</div>}> 
                  <Cart /> 
                  </Suspense>} />
                 <Route path="pizza/:id" element= {<Suspense fallback ={<div>Кирилл работает...</div>}> 
                  <FullPizza /> 
                  </Suspense>} />
                 <Route path="*" element={<Suspense fallback ={<div>Кирилл работает...</div>}> 
                  <NotFound /> 
                  </Suspense>} />

            </Route>
          </Routes>  
  )
}

export default App;
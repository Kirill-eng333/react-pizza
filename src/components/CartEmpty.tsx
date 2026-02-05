import React from 'react';
import {Link} from "react-router-dom"



 export const CartEmpty: React.FC = () => (
    <div className="cart cart--empty">
    <h2>Корзина пустая <span>😕</span></h2>
    <p>
      Вероятней всего, вы не заказывали ещё пиццу.
      <br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src="https://s00.yaplakal.com/pics/pics_preview/8/5/5/14043558.jpg" alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Вернуться назад</span>
    </Link>
  </div>
 )


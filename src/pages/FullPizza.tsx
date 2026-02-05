import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../scss/components/FullPizza.scss"

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
    description?: string;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://6894d1a6be3700414e149f70.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return (
      <div className="full-pizza__loading">
        <div className="spinner"></div>
        <p>Загрузка пиццы...</p>
      </div>
    );
  }

  return (
    <div className="full-pizza">
      <div className="full-pizza__content">
        <img
          src={pizza.imageUrl}
          alt={pizza.title}
          className="full-pizza__image"
        />
        <div className="full-pizza__info">
          <h1 className="full-pizza__title">{pizza.title}</h1>
          <p className="full-pizza__description">
            {pizza.description || "Описание временно недоступно."}
          </p>
          <h4 className="full-pizza__price">{pizza.price} $</h4>
          <button
            className="full-pizza__button"
            onClick={() => navigate("/")}
          >
            Назад к списку
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;

import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/Slices/filter/slice';
import Sort, { list as sortList } from '../components/Sort';
import { Skeleton, PizzaBlock, Categories, Pagination} from '../components';
import { fetchPizzas, Status } from '../redux/Slices/pizzas/slice';
import { useAppDispatch, useAppSelector } from '../redux/store';


const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { categoryId, sort, currentPage, searchValue } = useAppSelector((state) => state.filter);
  const { items, status } = useAppSelector(state => state.pizzas);



  const onChangeCategory = React.useCallback((id:number) => {
    dispatch(setCategoryId(id));
  }, [])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  // синхронизируем фильтры в URL
  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  // при первом рендере читаем параметры из URL 
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortObj = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort: sortObj || sortList[0],
        }),
      );
    }
  }, [dispatch]);

  // всегда делаем запрос при изменении фильтров или поиска
  React.useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  const pizzas = items.map((obj: any) => (
     <PizzaBlock key={obj.id} {...obj} />
     ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === Status.ERROR ? (
        <div className="content__error-info">
          <h2>Нету пицц братишка 😕</h2>
          <p>Дядя кирилл починет сайт и возращайся свинья фасфудовская</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

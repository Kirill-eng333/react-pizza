import React from 'react';
import styles from './Search.module.scss';
import { setSearchValue } from '../../redux/Slices/filter/slice';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

export const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [ value, setValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
  debounce ((str: string) => {
    dispatch(setSearchValue(str))
  }, 1000),
  [],
);

const onChangeInput = (event: React.ChangeEvent <HTMLInputElement>) => {
  setValue(event.target.value)
  updateSearchValue(event.target.value)
}


  return (
    <div className={styles.root}>
      <input 
      ref = {inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input} 
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg 
          onClick={ onClickClear } 
          className={styles.clearIcon} 
          height="512px" 
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9
            c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5
            c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6
            c-14.1,14.1-14.1,36.8,0,50.9c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6
            c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"
          />
        </svg>
      )}
      <svg 
        className={styles.icon}
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14
          c0-5.514-4.486-10-10-10S4,8.486,4,14s4.486,10,10,10c2.035,0,3.928-0.614,
          5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0 
          C28.195,26.633,28.195,25.367,27.414,24.586z 
          M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
        />
      </svg>
    </div>
  );
};



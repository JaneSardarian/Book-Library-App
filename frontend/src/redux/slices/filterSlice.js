import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action) => {
      // You can mutate state thanks to Immer library
      // есть 2 варианта в ридакс слайс
      // return { ...state, title: action.payload };
      state.title = action.payload;
      //в традиционном ридакс нельзя так делать,
      // потому что поменяется изначальное состояние,
      //  а здесь это не изначальное состояние а уже другое,
      //  засчет того что в слайсах есть пакет иммер и поэтому
      //   создается новое состояние, хоть и выглядит как будто
      //   старое изменяешь. Иммер отслеживает изменение объекта,
      // поэтому ретурн здесь тоже не нужен
    },
    resetFilters: (state) => {
      return initialState;
    },
  },
});

export const { setTitleFilter, resetFilters } = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;

export default filterSlice.reducer;

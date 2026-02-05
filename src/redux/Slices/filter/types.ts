export type Sort = {
  name: string;
  sortProperty: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
}


export interface FilterSliceState {
searchValue: string;
categoryId: number;
currentPage: number;
sort: Sort;
}

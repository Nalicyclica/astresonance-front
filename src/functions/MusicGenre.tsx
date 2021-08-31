type idList = {
  id: number
  name: string
};


export const genreList: idList[] = [
  { id: 0, name: "その他の音楽"},
  { id: 1, name: "ポップス"},
  { id: 2, name: "ロック"},
  { id: 3, name: "ジャズ"},
  { id: 4, name: "クラシック"},
  { id: 5, name: "アフリカン"},
  { id: 6, name: "アジア"},
  { id: 7, name: "ヨーロッパ"},
  { id: 8, name: "ラテンアメリカ"},
  { id: 9, name: "アラビアン"},
];

export const categoryList: idList[] = [
  { id: 0, name: "曲/歌以外の音楽"},
  { id: 1, name: "曲"},
  { id: 2, name: "歌"},
];

export const genreItems = genreList.map((genre) =>
  <option value={genre.id}>{genre.name}</option>
);

export const categoryItems = categoryList.map((category) =>
  <option value={category.id}>{category.name}</option>
);

export const getGenreName = (genreId: number): string => {
  let thisGenreName: string = "";
  genreList.map((genre) =>{
    if(genre.id == genreId){
      thisGenreName = genre.name;
      return;
    }
  });
  return thisGenreName;
};

export const getCategoryName = (categoryId: number): string => {
  let thisCategoryName: string = "";
  categoryList.map((category) =>{
    if(category.id == categoryId){
      thisCategoryName = category.name;
      return;
    }
  })
  return thisCategoryName;
};

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32873967-2df471ca69613a4b365a872ae';

export const fetchApi = async (searchText, page) => {
  const res = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchText}&page=${page}&per_page=12`
  );
  return await res.json();
};

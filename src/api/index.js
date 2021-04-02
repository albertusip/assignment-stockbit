import axios from 'axios';

const API_KEY = 'faf7e5bb';
const END_POINT = 'https://www.omdbapi.com/';

const getMovies = async (value) => {
    const { searchValue, page } = value;
    try {
        let url = `${END_POINT}?apikey=${API_KEY}&s=${searchValue}&page=${page}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

const getDetailMovie = async (value) => {
    const { id } = value;
    try {
        const response = await axios.get(`${END_POINT}?apikey=${API_KEY}&i=${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export {
    getMovies,
    getDetailMovie
};
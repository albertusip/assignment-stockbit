import { createContext } from "react";

const SearchMovies = createContext({
    searchMovies: {},
    setSearchMovies: () => {}
});

export default SearchMovies;

import React from 'react';
import MovieRollIcon from 'mdi-react/MovieRollIcon';
import { LoadingStyle, iconLoading } from './styles';

const Loading = () => {
    return (
        <LoadingStyle>
            <MovieRollIcon className={iconLoading} />
        </LoadingStyle>
    )
};

export default Loading;
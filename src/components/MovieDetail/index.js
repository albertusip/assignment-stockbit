import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ButtonText, Col, mb1, mb3, Row, Wrapper, btnIconText, textCenter, fontWeight600 } from '../../styles';
import { rowDetail, wrapperInfo, wrapperDetail, wrapperImage } from './styles';
import Loading from '../Loading/index';
import { getDetailMovie } from '../../api/index';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';


const MovieDetail = () => {
    let history = useHistory();
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        getMovie(id);
    }, [id]);

    const getMovie = async (id) => {
        setLoading(true);
        await getDetailMovie({ id }).then((res) => {
            if (res.Response === 'True') {
                setMovie(res);
            }
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        });
    }
    
    return (
        <>
            {
                <Wrapper fillHeight className={wrapperDetail}>
                    {
                    loading ? <Loading /> :
                        <Row className={rowDetail}>
                            <Col sm="12" className={`${mb3}`}>
                                <ButtonText
                                    className={`${btnIconText}`}
                                    onClick={() => history.replace('/')}
                                >
                                    <ChevronLeftIcon size={18} />
                                    Back
                                </ButtonText>
                            </Col>
                            <Col sm="12" className={`${mb3} ${textCenter}`}>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <h2 className="title">
                                        {movie?.Title}
                                    </h2>
                                </div>
                            </Col>
                            <Col sm="12" md="4" className={`${wrapperImage} ${mb3}`}>
                                <img src={movie?.Poster} alt={movie?.Title}></img>
                            </Col>
                            <Col sm="12" md="8">
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                            Director:
                                    </div>
                                    <div className="content">
                                        {movie?.Director}
                                        </div>
                                </div>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        Genre:
                                    </div>
                                    <div className="content">
                                        {movie?.Genre}
                                    </div>
                                </div>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        Language:
                                    </div>
                                    <div className="content">
                                        {movie?.Language}
                                    </div>
                                </div>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        Year:
                                    </div>
                                    <div className="content">
                                            {movie?.Year}
                                    </div>
                                </div>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        Runtime:
                                    </div>
                                    <div className="content">
                                            {movie?.Runtime}
                                    </div>
                                </div>
                            </Col>
                            <Col sm="12">
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        Type:
                                    </div>
                                    <div className="content">
                                        {movie?.Type}
                                    </div>
                                </div>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        Released:
                                    </div>
                                    <div className="content">
                                        {movie?.Released}
                                    </div>
                                </div>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        Writers:
                                    </div>
                                    <div className="content">
                                        {movie?.Writer}
                                    </div>
                                </div>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        Actors:
                                    </div>
                                    <div className="content">
                                        {movie?.Actors}
                                    </div>
                                </div>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        Plot:
                                    </div>
                                    <div className="content">
                                        {movie?.Plot}
                                    </div>
                                </div>
                                <div className={`${wrapperInfo} ${mb3}`}>
                                    <div className={`${fontWeight600} ${mb1}`}>
                                        IMDB Rating / Votes:
                                    </div>
                                    <div className="content">
                                        {movie?.imdbRating} / {movie?.imdbVotes}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    }
                </Wrapper>
            }
        </>
    );
};

export default MovieDetail;
import React, { useState, useEffect, useContext } from 'react';
import { cardMovie, rowMovieList, wrapperCardImage, wrapperCardValue, wrapperMovieList, Popup } from './styles';
import { Button, Card, Col, Row, Wrapper, w100, dflex, justifyCenter, alignCenter, textCenter, mb3, my3, overflowHidden, cursorPointer } from '../../styles';
import { capitalize } from '../../helper/index';
import { NavLink } from 'react-router-dom';
import ListContext from '../../contexts/SearchMovies';
import Loading from '../Loading/index';
import { getMovies } from '../../api/index';

const MovieList = () => {
	const { searchMovies, setSearchMovies } = useContext(ListContext);
	const [movieList, setMovieList] = useState([]);
	const [page, setPage] = useState(1);
	const [noData, setNoData] = useState(false);
	const [imagePopUp, setImagePopUp] = useState('');
	const [positionListScreen, setPositionListScreen] = useState(0);

	useEffect(() => {
		loadMovieList(searchMovies.name, 1, 'search');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchMovies.isSearch]);

	const handleScroll = () => {
		const elListMovies = document.getElementById('ListMovies')?.getBoundingClientRect();
		const elWrapperListMovies = document.getElementById('WrapperListMovies')?.getBoundingClientRect();

		const bottomValueElement = elListMovies.bottom;
		const heightElementWrapperListMovies = elWrapperListMovies.height;
		const topWrapperListMovies = elWrapperListMovies.top;
		const yListMovies = elListMovies.top;
		const getPositionListScreen = (bottomValueElement - (bottomValueElement - (- yListMovies))) + topWrapperListMovies + 1;

		setPositionListScreen(getPositionListScreen);
		if (bottomValueElement < heightElementWrapperListMovies + 155) { // plus 155px
			if (!searchMovies.loading && !noData) {
				loadMovieList(searchMovies.name, page, 'load');
			}
		}
	};

	const loadMovieList = async (searchValue, page, type) => {
		setSearchMovies({
			...searchMovies,
			loading: true
		});
		await getMovies({ searchValue, page }).then((res) => {
			if (res.Response === 'True') {
				const newPage = page + 1;
				const newList = movieList.concat(res.Search);
				if (type === 'load') {
					setSearchMovies({
						...searchMovies,
						loading: false
					});
					setMovieList(newList);
					setPage(newPage);
				} else {
					setSearchMovies({
						...searchMovies,
						loading: false
					});
					setMovieList(res.Search);
					setPage(newPage);
				}
			} else {
				setNoData(true);
			}

			if (res.Search?.length > 0) {
				setNoData(false);
			}
		}).catch((err) => {
			console.log(err);
			setSearchMovies({
				...searchMovies,
				isSearch: false,
				loading: false
			});
		}).finally(() => {
			setSearchMovies({
				...searchMovies,
				isSearch: false,
				loading: false
			});
		});
	};

	const showImage = (image) => {
		setImagePopUp(image);
	};

	return (
		<>
			<Wrapper id="WrapperListMovies" className={`${wrapperMovieList} ${imagePopUp ? overflowHidden : ''}`} fillHeight onScroll={() => handleScroll()}>
				{
					<Row id="ListMovies" className={rowMovieList}>
						{
							movieList.map((item, index) => (
								<Col key={index} sm="6" md="6">
									<Card className={cardMovie}>
										<Wrapper>
											<Row>
												<Col sm="12" className={`${wrapperCardImage} ${dflex} ${justifyCenter} ${alignCenter} ${mb3}`}>
													{
														item?.Poster && item?.Poster !== 'N/A' ?
															<img
																className={`${w100} ${cursorPointer}`}
																src={item?.Poster}
																alt={item?.Title || 'No Title'}
																onClick={() => showImage(item?.Poster)}
															></img> : 'No Image'
													}
												</Col>
												<Col sm="12" className={`${wrapperCardValue}`}>
													<div className={`${mb3}`}>
														<div className="title">{item?.Title || 'No Title'}</div>
														<div>Type : {capitalize(item?.Type) || 'No Type'}</div>
														<div>Year : {item?.Year || 'No Year'}</div>
													</div>
													<NavLink to={`/detail/${item?.imdbID}`}>
														<Button fluid>Detail</Button>
													</NavLink>
												</Col>
											</Row>
										</Wrapper>
									</Card>
								</Col>
							))
						}
					</Row>
				}
				{ searchMovies.loading && !noData && <Loading /> }
				{ noData && <div className={`${textCenter} ${my3}`}>No more Movies !!</div> }
				{
					imagePopUp &&
					<Popup
						className={`${cursorPointer}`}
						position={positionListScreen}
						onClick={() => setImagePopUp(null)}
					>
						<Col xs="7" sm="8" md="6">
							<img
								src={imagePopUp}
								className={`${w100}`}
								alt="Pop Up"
							></img>
						</Col>
					</Popup>
				}
			</Wrapper>
		</>
	);
};

export default MovieList;
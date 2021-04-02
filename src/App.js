import React, { useState } from 'react';
import { Card, Col, fluid, Footer, Header, Main, Row, Wrapper, max100vh } from './styles.js';
import MovieIcon from 'mdi-react/MovieIcon';
import ArchIcon from 'mdi-react/ArchIcon';
import Autocomplete from './components/Autocomplete/index';
import MovieDetail from './components/MovieDetail/index';
import MovieList from './components/MovieList/index';
import Anagram from './components/Anagram/index';
import ListContext from './contexts/SearchMovies';
import {
	BrowserRouter as Router,
	Route,
	NavLink
} from 'react-router-dom';
import './App.css';

const App = () => {
	const [searchMovies, setSearchMovies] = useState({
		isSearch: true,
		loading: true,
		name: 'school'
    });

	return (
		<Router>
			<Main>
				<ListContext.Provider value={{ searchMovies, setSearchMovies}}>
					<Wrapper className={max100vh} minWidth="270">
						<Header>
							<div className="header-title">
								Movies App
							</div>
						</Header>
						
						<Row>
							<Col sm="12" className={fluid}>
								<Card flexWrap>
									<Route exact path="/">
										<div className="greeting">
											<span className="path">
												Welcome, Let's find some Movies !!
										</span>
										</div>
										<div className="info">
											<Autocomplete />
										</div>
									</Route>
									<Route exact path="/detail/:id">
										<div className="info">
											<MovieDetail />
										</div>
									</Route>
									<Route exact path="/anagram-quiz">
										<Anagram />
									</Route>
								</Card>
							</Col>
						</Row>
						<Route exact path="/">
							<MovieList />
						</Route>
						
						<Footer>
							<Wrapper flexWrap alignHorizontal="space-around">
								<NavLink exact to="/" activeClassName="selected" className="footer-menu">
									<MovieIcon size={18} />
									Movie list
								</NavLink>
								<NavLink exact to="/anagram-quiz" activeClassName="selected" className="footer-menu">
									<ArchIcon size={18} />
									Anagram Quiz
								</NavLink>
							</Wrapper>
						</Footer>
					</Wrapper>
				</ListContext.Provider>
			</Main>
		</Router>
	);
};

export default App;

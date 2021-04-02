import { css }  from '@emotion/css';
import styled from '@emotion/styled';
import { colorBorder, colorWhite } from '../../color';

export const cardMovie = css`
	margin: 5px;
`;

export const wrapperNavigation = css`
	display: flex;
    justify-content: space-between;
`;

export const wrapperMovieList = css`
	background-color: ${colorWhite};
    border: 1px solid ${colorBorder};
    border-radius: 5px;
    margin: 10px 0px 20px 0px;
	max-height: calc(100vh - 220px);
	overflow-y: auto;
    padding: 0px 10px;
`;

export const rowMovieList = css`
	padding: 10px 10px;
`;

export const wrapperCardImage = css`
	text-align: center;
`;

export const wrapperCardValue = css`
	display: flex;
    flex-wrap: wrap;
    flex-direction: column;
	text-align: left;
    justify-content: space-between;

	.title {
		margin-bottom: 14px;
	}
`;

export const Popup = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(204,204,204,0.9);

    ${props => props.position && ({
        top: `${props.position}px`
    })}
`;
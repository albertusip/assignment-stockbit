import styled from '@emotion/styled';
import { colorPrimary, colorWhite } from '../../color';

export const Ul = styled.ul`
    display: contents;
`;

export const Li = styled.li`
    width: 100%;
    padding: 10px;
    background: ${colorWhite};
    display: block;
    border-bottom: 1px solid ${colorWhite};
    &:hover {
        cursor: pointer;
        color: ${colorWhite};
        background-color: ${colorPrimary};
    }
`;

export const SuggestContainer = styled.div`
    position: absolute;
    z-index: 5;
    max-height: 240px;
    width: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;
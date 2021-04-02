import { css } from '@emotion/css';

export const wrapperDetail = css`
    margin: 10px 0px;
    max-height: calc(100vh - 210px);
`;

export const wrapperImage = css`
    text-align: center;

    img {
        width: 150px;
    }
`;

export const header = css`
    font-weight: 600;
`;

export const wrapperInfo = css`
    .content {
        display: inline-block;
    }
`;

export const wrapperChips = css`
    &.wrapperMoves {
        height: 100%;
        overflow: auto;
    }
`;

export const rowDetail = css`
    height: 100%;
    align-content: baseline;
    overflow: auto;

    .colCustomHeight {

    }
`;
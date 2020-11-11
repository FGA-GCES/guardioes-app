import styled from 'styled-components';

import { scale, percentage } from '../../../utils/scallingUtils';

export const ScrollViewStyled = styled.ScrollView.attrs({
    contentContainerStyle: {
        backgroundColor: '#f8f8f8',
        flexGrow: 1,
        paddingVertical: percentage(7),
        paddingHorizontal: percentage(7),
    }
})``;

export const Terms = styled.Text`
    font-family: ArgentumSans;
    font-size: ${scale(14)}px;
    color: #2b3d51;
`;
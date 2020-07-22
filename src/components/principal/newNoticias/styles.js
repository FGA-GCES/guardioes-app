import styled from 'styled-components/native';
import { scale } from '../../../utils/scallingUtils';

export const Container = styled.View`
  background-color: #348eac;
  flex: 1;
`;

export const ScrollNoticias = styled.ScrollView`
    background-color: white;
    border-top-right-radius: 35px;
    border-top-left-radius: 35px;
    padding: ${scale(22)}px;
`;

export const NoticiasTitle = styled.Text`
    font-size: ${scale(20)}px;
    color: black;
    font-weight: bold;
    margin-bottom: ${scale(5)}px;
`;

export const FeedTitle = styled.Text`
    font-size: ${scale(16)}px;
    color: #a8a8a7;
    font-weight: bold;
    margin-bottom: ${scale(22)}px;
`;

export const NoticeContainer = styled.View.attrs({
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 4.65,

    elevation: 6,
})`
    flex: 1;
    background-color: white;
    border-radius: 20px;
    padding: ${scale(16)}px;
    max-width: 100%; 
    margin-bottom: ${scale(25)}px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const TwitterInfo = styled.View`
`;

export const TwitterName = styled.Text`
    font-size: ${scale(16)}px;
    color: #348eac;
    font-weight: bold;
`;

export const TwitterArroba = styled.Text`
    font-size: ${scale(14)}px;
    color: #a8a8a7;
    font-weight: 600;
`;

export const Data = styled.Text`
    font-size: ${scale(14)}px;
    color: #a8a8a7;
    font-weight: 500;
`;

export const NoticiaText = styled.Text` 
    font-size: ${scale(14)}px;
    color: black;
    margin-top: ${scale(10)}px;
`;

export const Imagem = styled.Image`
    margin-top: ${scale(8)}px;
    width: ${scale(275)}px;
    height: ${scale(80)}px;
    border-radius: 10px;
`;

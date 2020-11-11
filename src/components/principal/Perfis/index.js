import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import ScreenLoader from '../../userData/ScreenLoader';
import { ScrollViewStyled, User, AvatarWrapper, InfoContainer, InfoWrapper, Name, Relation, ButtonsWrapper } from './styles';
import { Button, HouseholdWrapper, HouseholdTitle, Household, HouseholdName, HouseholdRelation } from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import RNSecureStorage from 'rn-secure-storage';
import { Avatar } from 'react-native-elements';
import { handleAvatar, getInitials } from '../../../utils/constUtils';
import { scale } from '../../../utils/scallingUtils';
import {API_URL} from 'react-native-dotenv';
import translate from '../../../../locales/i18n';

Feather.loadFont();

let todayDate = new Date();

class Perfis extends Component {
    static navigationOptions = {
        title: "Perfis"
    }
    constructor(props) {
        super(props)
        this.props.navigation.addListener('willFocus', payload => {
            this.fetchData();
        })
        this.state = {
            userData: {},
            householdData: {},
            isLoading: true
        }
    }

    fetchData = async () => { //Get user info
        const userID = await AsyncStorage.getItem('userID')
        const userName = await AsyncStorage.getItem('userName')
        const userAvatar = await AsyncStorage.getItem('userAvatar')
        const userToken = await RNSecureStorage.get('userToken')

        this.setState({ userName, userID, userToken, userAvatar })
        await this.getAllUserInfos()

        this.setState({ isLoading: false })
        this.getHouseholds()
        this.getHouseholdAvatars()
    }

    getAllUserInfos = async () => {
        return fetch(`${API_URL}/users/${this.state.userID}`, {
            method: 'GET',
            headers: {
                Authorization: `${this.state.userToken}`
            }
        })
        .then((response) => {
            if (response.status == 200) {
                //console.warn(response.status)
                return response.json()
            } else {
                console.warn(response.status)
            }
        })
        .then(async (responseJson) => {
            const userName = responseJson.user.user_name
            const userAvatar = this.state.userAvatar

            // Trata data de nascimento do user no formato correto
            if (!responseJson.user.birthdate) {
                responseJson.user.birthdate = JSON.stringify(todayDate)
            }
            responseJson.user.birthdate = responseJson.user.birthdate.split('T', 1).toString()

            let birthDate = responseJson.user.birthdate.split('-')
            birthDate = birthDate[2] + '-' + birthDate[1] + '-' + birthDate[0]

            const userData = {
                userID: this.state.userID,
                userToken: this.state.userToken,

                Name: responseJson.user.user_name,
                Avatar: userAvatar,
                Birth: birthDate,
                Country: responseJson.user.country,
                Gender: responseJson.user.gender,
                Race: responseJson.user.race,
                Group: responseJson.user.group_id,
                IdCode: responseJson.user.identification_code,
                Email: responseJson.user.email,
                isProfessional: responseJson.user.is_professional,
                RiskGroup: responseJson.user.risk_group,
                State: responseJson.user.state,
                City: responseJson.user.city,
            }

            this.setState({ userName, userData })
        })
    }

    getHouseholds = () => {//Get households
        //console.warn("UserID " + this.state.userID + " Token " + this.state.userToken)
        return fetch(`${API_URL}/users/${this.state.userID}/households`, {
            headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `${this.state.userToken}`
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: responseJson.households,
                })
            })
    }

    getHouseholdAvatars = async () => {
        let householdAvatars = JSON.parse(await AsyncStorage.getItem('householdAvatars'))
        
        if (!householdAvatars) {
            householdAvatars = {}
        }

        this.setState({ householdAvatars })
    }

    loadHouseholdInfo = async (household) => {
        const householdAvatar = this.state.householdAvatars[household.id]

        // Trata a data de nascimento do household para o formato apropriado
        if (!household.birthdate) {
            household.birthdate = JSON.stringify(todayDate)
        }
        household.birthdate = household.birthdate.split('T', 1).toString()

        let birthDate = household.birthdate.split('-')
        birthDate = birthDate[2] + '-' + birthDate[1] + '-' + birthDate[0]

        const householdData = {
            userID: this.state.userID,
            userToken: this.state.userToken,
            householdID: household.id,

            Name: household.description,
            Avatar: householdAvatar,
            Birth: birthDate,
            Country: household.country,
            Gender: household.gender,
            Race: household.race,
            Group: household.group_id,
            IdCode: household.identification_code,
            Kinship: household.kinship,
            RiskGroup: household.risk_group,
        }

        this.setState({ householdData })
    }

    render() {
        if (this.state.isLoading) {
            return <ScreenLoader />
        }
        
        const { navigate } = this.props.navigation
        const householdsData = this.state.dataSource
        const householdAvatars = this.state.householdAvatars

        return (
            <ScrollViewStyled>
                <User>
                    <AvatarWrapper>
                        <Avatar
                            containerStyle={styles.Avatar}
                            size={scale(58)}
                            source={handleAvatar(this.state.userAvatar)}
                            title={getInitials(this.state.userName)}
                            rounded
                        />
                    </AvatarWrapper>
                    <InfoContainer>
                        <InfoWrapper>
                            <Name>{this.state.userName}</Name>
                            <Relation>Proprietário</Relation>
                        </InfoWrapper>
                        <ButtonsWrapper>
                            <Button
                                onPress={() => {
                                    navigate('EditarPerfil', {
                                        isUser: true,
                                        data: this.state.userData
                                    });
                                }
                            }>
                                <Feather name="edit" size={scale(25)} color='#ffffff' />
                            </Button>
                        </ButtonsWrapper>
                    </InfoContainer>
                </User>

                <HouseholdWrapper>
                    <HouseholdTitle>{translate("profiles.households")}</HouseholdTitle>
                </HouseholdWrapper>

                {householdsData != null ?
                    householdsData.map((household) => {
                        return (
                            <Household key={household.id}>
                                <AvatarWrapper>
                                    <Avatar
                                        size={scale(58)}
                                        source={handleAvatar(householdAvatars[household.id])}
                                        title={getInitials(household.description)}
                                        rounded
                                    />
                                </AvatarWrapper>
                                <InfoContainer>
                                    <InfoWrapper>
                                        <HouseholdName>{household.description}</HouseholdName>
                                        <HouseholdRelation>{household.kinship}</HouseholdRelation>
                                    </InfoWrapper>
                                    <ButtonsWrapper>
                                        <Button
                                            onPress={async () => {
                                                await this.loadHouseholdInfo(household);
                                                navigate('EditarPerfil', {
                                                    isUser: false,
                                                    data: this.state.householdData
                                                });
                                            }
                                        }>
                                            <Feather name="edit" size={scale(25)} color='#348EAC' />
                                        </Button>
                                    </ButtonsWrapper>
                                </InfoContainer>
                            </Household>
                        )
                    })
                : null}
            </ScrollViewStyled>
        )
    }
}

const styles = StyleSheet.create({
    Avatar: {
        borderColor: '#ffffff',
        borderWidth: 3
    },
})

export default Perfis

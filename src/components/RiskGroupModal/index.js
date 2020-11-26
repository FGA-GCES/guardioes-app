import React, { Component } from 'react'
import { Modal } from 'react-native'


import { ModalContainer, ModalBox, ModalTitle, ModalText, Button, ModalButton, ModalButtonText } from '../../styled/NormalForms'

import translate from '../../../../locales/i18n'


export default class RiskGroupModal extends Component { 
    
    setRiskGroupModalVisible(visible) {
        this.setState({ modalVisibleRiskGroup: visible })
    }

    render() {
        return(
        <Modal //Modal View for Risk Group Message
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisibleRiskGroup}
            onRequestClose={() => {
                this.setRiskGroupModalVisible(!this.state.modalVisibleRiskGroup)
            }
        }>
            <ModalContainer>
                <ModalBox>
                    <ModalTitle>
                        {translate("register.riskGroupTitle")}
                    </ModalTitle>

                    <ModalText>
                        {translate("register.riskGroupMessage")}
                    </ModalText>

                    <Button onPress={() => {
                        this.setRiskGroupModalVisible(!this.state.modalVisibleRiskGroup)
                        }
                    }>
                        <ModalButton>
                            <ModalButtonText>
                                {translate("register.riskGroupButton")}
                            </ModalButtonText>
                        </ModalButton>
                    </Button>
                </ModalBox>
            </ModalContainer>
        </Modal>
        )
    }
}
import { useState } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Modal, Text, TextInput, KeyboardAvoidingView } from "react-native";

import Styles from '../../styles'
import AppInputField from '../AppInputField';
import AppButton from '../AppButton'


const EditNameModal = ({showModal, setShowModal, name, setName, onConfirm, onCancel, errorMessage }) => {
    const closeModal = () => {
        onCancel()
        setShowModal(!showModal);
    }

    return (
        <Modal
            animationType="slide"
            visible={showModal}
            transparent={true} 
            onRequestClose={() => {
                setShowModal(!showModal);
            }}
        >
            <View 
                style={[
                    { 
                        backgroundColor: 'transparent', 
                        position: 'relative', 
                        width: '100%',
                        flex: 1,
                        justifyContent: 'flex-end',
                    }
                ]}
                >
                <KeyboardAvoidingView 
                    style={{ 
                        width: '100%', 
                    }}
                    behavior='position'
                    keyboardVerticalOffset={0}
                >
                    <View
                        style={{ 
                            width: '100%', 
                            backgroundColor: '#e1a3ba', 
                            borderTopLeftRadius: 30,
                            borderTopRightRadius: 30,
                            height: 290,
                            paddingHorizontal: 24, 
                            paddingBottom: 0, 
                            paddingTop: 42, 
                        }}
                    >

                        <Text style={[Styles.h2, { color: '#fff', }]}>Workoutplan name:</Text>
                        {errorMessage &&
                            <View style={{ marginBottom: 4, }}>
                                <Text>{errorMessage}</Text>
                            </View>
                        }
                        <AppInputField 
                            handleChange={(text) => setName(text)}
                            value={name}
                        />
                        <View style={{ width: '100%', marginVertical: 20, }}>
                            <AppButton onPress={onConfirm} title="Confirm" />
                        </View>
                        <View style={{ width: '100%', }}>
                            <AppButton onPress={closeModal} title="Cancel" />
                        </View>
                    </View>
                </KeyboardAvoidingView>

            </View>
        </Modal>
    )
}

export default EditNameModal
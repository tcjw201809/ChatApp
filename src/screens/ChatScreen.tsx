import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, TextInput, View, Button, Alert } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import firebase from 'firebase';
import { getMessageDocRef } from '../lib/firebase';
import { Message } from '../types/message';

export const ChatScreen = () => {
    const [text, setText] = useState<string>('');
    
    const sendMessage = async (value: string) => {
        if (value != '') {
             const docRef = await getMessageDocRef();
             const newMessage = {
                 text: value,
                 createdAt: firebase.firestore.Timestamp.now(),
                 userId: ''
             } as Message;
             await docRef.set(newMessage);
             setText('');
        } else {
            Alert.alert('エラー','メッセージを入力してください')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ExpoStatusBar style="light"/>
            <View style={styles.inputTextContainer}>
                <TextInput
                    style={styles.inputText}
                    onChangeText={(value) => {
                        setText(value);
                    }}
                    value={text}
                    placeholderTextColor='#777'
                    autoCapitalize='none'
                    autoCorrect={false}
                    returnKeyType='done' 
                />
            </View>
            <Button title='send' onPress={()=>{
                sendMessage(text);
            }}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputTextContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: {
        color: '#fff',
        borderWidth: 1,
        borderColor: '#999',
        height: 32,
        flex: 1,
        borderRadius: 5,
        paddingHorizontal: 10
    },
});
import React from 'react';
import { View } from 'react-native';
import { KEY_AUTH } from '../../../utility/constants';
import LoginModule from '../../modules/AuthModule';

const LoginScreen = ({ route }) => {
    return (
        <View style={{ flex: 1 }} >
            <LoginModule from={KEY_AUTH} />
        </View>
    )
}

export default LoginScreen;
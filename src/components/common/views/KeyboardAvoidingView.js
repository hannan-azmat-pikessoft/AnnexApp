import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { spacing } from '../../../styles/spacing';
import VirtualizedView from '../VirtualizedView';

const CommonKeyboardAvoidingView = ({ children, style }) => {
    return (
        <KeyboardAvoidingView
            style={[style, { flex: 1, }]}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={true}
            keyboardVerticalOffset={spacing.HEIGHT_40}
        >
            <VirtualizedView
                style={{ flex: 1, }}
                contentContainerStyle={{
                    paddingBottom: spacing.PADDING_16
                }}
            >
                {children}
            </VirtualizedView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

});

export default CommonKeyboardAvoidingView;
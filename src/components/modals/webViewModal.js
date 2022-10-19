import React from 'react';
import {
    Modal, SafeAreaView, StyleSheet,
    TouchableOpacity, View
} from 'react-native';
import { WebView } from 'react-native-webview';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import colors from '../../utility/colors';
import CommonHeader from '../common/headers/CommonHeader';

const WebViewModal = ({
    visible,
    onClose,
    link,
    title = ''
}) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onClose()
            }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.WHITE }} >
                <TouchableOpacity
                    style={styles.modalMainContainer}
                    activeOpacity={1}
                    onPress={() => onClose()}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>
                        <View style={{ width: spacing.FULL_WIDTH }} >
                            <CommonHeader
                                title={title}
                                onBack={() => onClose()}
                            />
                        </View>
                        <View style={{ height: spacing.FULL_HEIGHT, width: spacing.FULL_WIDTH }} >
                            {link != '' &&
                                <WebView
                                    containerStyle={{}}
                                    // scalesPageToFit
                                    // scrollEnabled={true}
                                    nestedScrollEnabled
                                    onLoadEnd={() => {
                                        // this.setState({ isLoading: false });
                                    }}
                                    style={{}}
                                    source={{ uri: link }}
                                    onError={(error) => { }}
                                />
                            }
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </SafeAreaView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalMainContainer: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    visibleViewStyle: {
        backgroundColor: colors.white,
        width: spacing.FULL_WIDTH,
        alignItems: "center",
        // paddingVertical: spacing.PADDING_32,
        paddingHorizontal: spacing.PADDING_12,
        borderRadius: spacing.RADIUS_8,
        flex: 1
    },
    title: {
        fontSize: textScale(12),
        color: colors.grey500,
        // flex: 1
    },
    value: {
        // flex: 1
    },
    itemView: {
        flexDirection: 'row',
        width: spacing.FULL_WIDTH - spacing.MARGIN_30,
        justifyContent: 'space-between'
    }
})

export default WebViewModal;
import React from 'react';
import {
    FlatList, Modal, StyleSheet, TextInput, TouchableOpacity,
    View
} from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { Images } from '../../utility/imageRes';
import SpringAnimation from '../common/animation/spring';
import CommonImage from '../common/CommonImage';
import RegularText from '../common/RegularText';
import ItemPickerModalRow from '../rows/itemPickerModalRow';

const ItemPickerModal = ({
    visible,
    onClose,
    data,
    onPressItem,
    displayKey,
    searchText,
    onChangeSearch,
    showSearch
}) => {

    return (
        <Modal
            animationType='slide'
            visible={visible}
            onRequestClose={() => onClose()}
            transparent={true}
        >
            <TouchableOpacity style={styles.modalMainContainer} onPress={() => onClose()} activeOpacity={1} >
                <View style={styles.visibleViewStyle} activeOpacity={1}  >
                    <View style={styles.headerView} >
                        {showSearch == true &&
                            <View style={styles.searchContainer} >
                                <CommonImage source={Images.IMG_SEARCH} />
                                <TextInput
                                    placeholder={Strings.search}
                                    onChangeText={(text) => onChangeSearch(text)}
                                    style={styles.searchInput}
                                    value={searchText}
                                />
                            </View>
                        }
                        <View style={{ alignItems: 'flex-end' }}>
                            <TouchableOpacity style={{ marginLeft: spacing.MARGIN_8, }} onPress={() => onClose()} >
                                <RegularText title={Strings.done} textStyle={{ color: colors.theme }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <FlatList
                            data={data}
                            keyExtractor={(item, index) => String(index)}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            style={{ flexGrow: 1, marginBottom: spacing.MARGIN_32 }}
                            keyboardShouldPersistTaps={"always"}
                            renderItem={({ item }) =>
                                <SpringAnimation
                                    childComponent={
                                        <ItemPickerModalRow
                                            item={item}
                                            onPressItem={onPressItem}
                                            displayKey={displayKey}
                                        />
                                    }
                                />
                            }
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Modal >
    );
}

const styles = StyleSheet.create({
    modalMainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'center',
        width: spacing.FULL_WIDTH,
        backgroundColor: colors.transparentBlack,
    },
    visibleViewStyle: {
        flex: 1,
        backgroundColor: colors.white,
        maxHeight: spacing.FULL_HEIGHT / 2,
        minHeight: spacing.FULL_WIDTH / 1.5,
        width: spacing.FULL_WIDTH,
        paddingHorizontal: spacing.PADDING_12,
        borderTopLeftRadius: spacing.RADIUS_8,
        borderTopRightRadius: spacing.RADIUS_8,
    },
    textInputView: {
        marginTop: spacing.MARGIN_16,
        marginHorizontal: spacing.MARGIN_24
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        marginHorizontal: spacing.MARGIN_24,
        borderRadius: spacing.RADIUS_8
    },
    inputLable: {
        fontSize: textScale(13),
        color: colors.grey700,
        marginTop: spacing.MARGIN_12
    },
    title: {
        fontSize: textScale(15)
    },
    createButtonStyle: {
        paddingHorizontal: spacing.PADDING_12,
    },
    titleStyle: {
        fontSize: textScale(16),
        color: colors.theme
    },
    headerView: {
        paddingVertical: spacing.PADDING_12,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.MARGIN_12,
        justifyContent: 'flex-end'
    },
    searchContainer: {
        backgroundColor: colors.appBackground,
        borderRadius: spacing.RADIUS_90,
        paddingHorizontal: spacing.PADDING_16,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    searchInput: {
        height: spacing.HEIGHT_34,
        marginLeft: spacing.MARGIN_8,
        flex: 1
    },
})

export default ItemPickerModal;
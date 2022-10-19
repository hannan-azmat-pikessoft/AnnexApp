import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import CardsListRow from '../rows/CardsListRow';
import * as Animatable from 'react-native-animatable';
import { ANIMATION_TYPES, EASING_TYPE, SCREEN_ADD_CARD } from '../../utility/constants';
import CardMenuOptionsModel from '../modals/cardMenuOptionsModel';
import CommonImage from '../common/views/CommonImage';
import RegularText from '../common/RegularText';
import colors from '../../utility/colors';
import { Images } from '../../utility/imagePaths';
import Strings from '../../translation/language';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import { textScale } from '../../styles/responsiveStyles';
import { navigate } from '../../utility/commonFunctions';

const RenderOnEmptyList = ({ onPressAddAddress }) => {
    return (
        <>
            <TouchableOpacity onPress={() => onPressAddAddress()} style={styles.emptyListMainContainer} >
                <CommonImage source={Images.IMG_ADD} style={{ tintColor: colors.theme }} />
                <RegularText style={styles.emptyListTextStyle} >{Strings.add_a_new_card}</RegularText>
            </TouchableOpacity>
            <View style={styles.emptyListSeprator} />
        </>
    )
}



const CardsListComponent = () => {

    const [selectedCard, setSelectedCard] = useState(false)
    const [showCardMenuOptions, setShowCardMenuOptions] = useState(false)

    function onPressCard() {
        setShowCardMenuOptions(true)
    }
    function onPressEditCard() {
        navigate(SCREEN_ADD_CARD)
    }
    function onPressSetDefaultCard() {
        setSelectedCard(true)
    }
    function oncloseCardMenuModel() {
        setShowCardMenuOptions(false)
    }
    function onPressAddCard() {
        navigate(SCREEN_ADD_CARD)
    }

    return (
        <View key={"CardsListComponentFlatlist"} style={styles.mainContainer}>
            <FlatList
                data={[1, 1]}
                renderItem={({ item, index }) => {
                    return (
                        <Animatable.View
                            animation={ANIMATION_TYPES.SLIDE_IN_UP}
                            duration={500}
                            easing={EASING_TYPE.EASE_IN_OUT}>
                            <CardsListRow
                                key={"CardsListComponentRow" + index}
                                item={item}
                                onPressCard={onPressCard}
                                index={index}
                                selectedCard={selectedCard} />
                        </Animatable.View>
                    )
                }}
                listKey="CardsListComponent"
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                keyExtractor={(item, index) => String(index)}
                ListEmptyComponent={<RenderOnEmptyList onPressAddAddress={onPressAddCard} />}
            />
            <CardMenuOptionsModel
                visible={showCardMenuOptions}
                onPressEdit={onPressEditCard}
                onPressSetDefault={onPressSetDefaultCard}
                onClose={oncloseCardMenuModel}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    emptyListMainContainer: {
        flexDirection: "row",
        paddingHorizontal: spacing.PADDING_18,
        paddingVertical: spacing.PADDING_24,
        alignItems: "center",
    },
    emptyListTextStyle: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        color: colors.theme,
        marginLeft: spacing.MARGIN_6,
    },
    emptyListSeprator: {
        height: spacing.HEIGHT_1,
        backgroundColor: colors.grey300,
        marginHorizontal: spacing.MARGIN_18
    },
})

export default CardsListComponent;
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import RegularText from './RegularText';

const RenderSlider = ({ item, index, value, title, selectedItem, onPressSliderItem }) => {
    return (
        <TouchableOpacity onPress={() => onPressSliderItem(value)} style={[styles.renderSliderContainer,
        index == 0 && { marginLeft: spacing.MARGIN_14, },
        selectedItem == value && {
            borderColor: colors.theme
        }
        ]} >
            <RegularText textStyle={[styles.renderSliderContainer_text,
            selectedItem == value && {
                color: colors.theme
            }
            ]} fontFamily={fontNames.FONT_FAMILY_SEMI_BOLD} title={title} />
        </TouchableOpacity>
    )
}

const CommonSliderPicker = ({
    label,
    displayKey,
    error,
    data,
}) => {
    const [isPickerVisible, setIsPickerVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState("");

    function onPressSliderItem(value) {
        if (selectedItem == "") {
            setSelectedItem(value)
        } else if (selectedItem != value) {
            setSelectedItem(value)
        } else {
            setSelectedItem("")
        }
    }


    return (
        <View style={[styles.mainView, {}]}>
            <RegularText
                title={label}
                fontFamily={fontNames.FONT_FAMILY_SEMI_BOLD}
                textStyle={styles.labelStyle}
            />
            <FlatList
                data={data}
                listKey={"sliderPickerList"}
                renderItem={({ item, index }) => <RenderSlider
                    key={"sliderPickerList_row_" + index}
                    item={item}
                    index={index}
                    title={item[displayKey]}
                    value={item[displayKey]}
                    selectedItem={selectedItem}
                    onPressSliderItem={onPressSliderItem}
                />}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
            {
                error != '' &&
                < RegularText
                    title={error}
                    textStyle={styles.errorStyle}
                />
            }

        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {

    },
    renderSliderContainer: {
        paddingHorizontal: spacing.PADDING_8,
        paddingVertical: spacing.PADDING_8,
        backgroundColor: colors.secondaryColor,
        alignSelf: "flex-start",
        borderRadius: spacing.RADIUS_4,
        borderWidth: spacing.WIDTH_2,
        borderColor: colors.white,
        marginHorizontal: spacing.MARGIN_8
    },
    renderSliderContainer_text: {
        fontSize: textScale(14),
        color: colors.grey800,
        marginLeft: spacing.MARGIN_4
    },
    labelStyle: {
        fontSize: textScale(14),
        color: colors.grey800,
        marginLeft: spacing.MARGIN_16
    },
    errorStyle: {
        fontSize: textScale(10),
        color: colors.red500,
        marginTop: spacing.MARGIN_2,
        marginLeft: spacing.MARGIN_4
    },
});

export default CommonSliderPicker;
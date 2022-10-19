import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';
import { textScale } from '../../../styles/responsiveStyles';
import { spacing } from '../../../styles/spacing';
import { fontNames } from '../../../styles/typography';
import { Images } from '../../../utility/imageRes';
import CommonImage from '../CommonImage';
import RegularText from '../RegularText';

const CommonMenuList = ({
    menuData,
    selectedMenu,
    onSelectMenu
}) => {

    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);

    function RenderMenuButton() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: spacing.PADDING_12,
                }}
                onPress={() => showMenu()}
            >
                <RegularText
                    title={selectedMenu.label}
                    textStyle={{ fontSize: textScale(10) }}
                />
                <CommonImage
                    source={Images.IMG_ARROW_LEFT}
                    style={{
                        transform: [{ rotate: '270deg' }],
                        marginLeft: spacing.MARGIN_8
                    }}
                />
            </TouchableOpacity>
        )
    }

    function selectMenu(item) {
        onSelectMenu(item)
        hideMenu()
    }

    return (
        <View style={{ alignSelf: 'flex-end' }}>
            <Menu
                visible={visible}
                anchor={<RenderMenuButton />}
                onRequestClose={hideMenu}
                animationDuration={200}
            >
                {
                    menuData.map((item, index) => {
                        return (
                            <View key={`menu_${item.label}_${index}`} >
                                <MenuItem
                                    onPress={() => selectMenu(item)}
                                    textStyle={{ fontFamily: fontNames.FONT_FAMILY_REGULAR, fontSize: textScale(10), }}
                                    key={`menu_subcontainer_${item.label}_${index}`}
                                >
                                    {item.label}
                                </MenuItem>
                                <MenuDivider />
                            </View>
                        )
                    })
                }
            </Menu>
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        marginHorizontal: spacing.MARGIN_14,
    },
});

export default CommonMenuList;
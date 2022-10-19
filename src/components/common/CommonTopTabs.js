import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NetworkContext } from '../../context';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';

const Tab = createMaterialTopTabNavigator();

const tabActiveColor = colors.theme
const tabLabelActiveColor = colors.white
const tabInActiveColor = colors.grey400
const tabLabelInActiveColor = colors.grey500
const tabColor = colors.white

const CommonTopTabs = ({ tabsData, scrollEnabled, activeColor, inActiveColor, tabsColor, isCustom, initialRouteName, route }) => {
    return (
        <NetworkContext.Provider value={route} >
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: scrollEnabled == true ? textScale(12) : textScale(12), textTransform: 'none', fontFamily: fontNames.FONT_FAMILY_BOLD, zIndex: 999 },
                    tabBarStyle: { backgroundColor: isCustom ? tabsColor : tabColor, elevation: 0, marginHorizontal: spacing.MARGIN_16, marginTop: spacing.MARGIN_12, borderRadius: spacing.RADIUS_4, borderWidth: spacing.WIDTH_1, borderColor: colors.grey300, height: spacing.HEIGHT_40, justifyContent: "center", },
                    tabBarContentContainerStyle: { justifyContent: "center", alignItems: "center", },
                    tabBarItemStyle: {},
                    tabBarIndicatorContainerStyle: { marginVertical: spacing.MARGIN_2, width: "99%", alignSelf: "center", marginLeft: spacing.MARGIN_2, zIndex: -1 },
                    tabBarIndicatorStyle: { backgroundColor: isCustom ? activeColor : tabActiveColor, height: spacing.HEIGHT_34, borderRadius: spacing.RADIUS_4, width: "49%" },
                    tabBarActiveTintColor: isCustom ? activeColor : tabLabelActiveColor,
                    tabBarInactiveTintColor: isCustom ? inActiveColor : tabLabelInActiveColor,
                    tabBarAllowFontScaling: scrollEnabled == true ? false : true,
                    tabBarScrollEnabled: scrollEnabled ? scrollEnabled : false,
                    lazy: true,
                }}
                backBehavior='initialRoute'
                initialRouteName={initialRouteName}
            >
                {
                    tabsData.map((item, index) => {
                        return (
                            <Tab.Screen
                                name={item.tabName}
                                options={{ title: item.label, }}
                                component={item.component}
                                key={index.toString() + '_' + item.tabName}
                            />
                        )
                    })
                }
            </Tab.Navigator>
        </NetworkContext.Provider>
    )
}


const styles = StyleSheet.create({
    buttonStyle: {
        height: spacing.HEIGHT_50,
        borderRadius: spacing.RADIUS_12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.PADDING_16,
        flexDirection: 'row'
    },
    textStyle: {
        color: colors.white,
        fontSize: textScale(16)
    }
});

export default React.memo(CommonTopTabs);
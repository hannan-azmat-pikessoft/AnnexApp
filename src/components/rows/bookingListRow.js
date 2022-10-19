import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { convertDateTime, getImage } from '../../utility/commonFunctions';
import { Images } from '../../utility/imagePaths';
import RegularText from '../common/RegularText';
import CommonImage from '../common/views/CommonImage';
import WebViewModal from '../modals/webViewModal';

const image = "https://media.istockphoto.com/photos/young-woman-getting-tested-for-coronaviruscovid19-at-medical-clinic-picture-id1310644715?b=1&k=20&m=1310644715&s=170667a&w=0&h=QYy9ZSIJkOOxRoVZb4suPVnGLbaMOOzL5n6SaJFiTBA="

const BookingListRow = ({ item, index, onPressCard, isLoading }) => {
    const [showReport, setShowReport] = useState(false)
    const [reportLink, setReportLink] = useState("")

    function openReport() {
        setShowReport(true)
    }

    function closeReport() {
        setShowReport(false)
    }

    return (
        <>
            {
                isLoading ?
                    <SkeletonPlaceholder>
                        <View style={{ flexDirection: "row", marginTop: spacing.MARGIN_12, paddingHorizontal: spacing.PADDING_12, paddingVertical: spacing.PADDING_12 }} >
                            <View style={styles.imageStyle} />
                            <View style={styles.rightContainer} >
                                <View style={styles.rightContainer_primaryView}>
                                    <View>
                                        <View style={{ width: spacing.FULL_WIDTH / 1.9, height: spacing.HEIGHT_10, borderRadius: spacing.RADIUS_10 }} />
                                        <View style={{ width: spacing.FULL_WIDTH / 1.8, height: spacing.HEIGHT_8, borderRadius: spacing.RADIUS_10, marginTop: spacing.MARGIN_4 }} />
                                        <View style={{ width: spacing.FULL_WIDTH / 1.9, height: spacing.HEIGHT_8, borderRadius: spacing.RADIUS_10, marginTop: spacing.MARGIN_4 }} />
                                        <View style={{ width: spacing.FULL_WIDTH / 2, height: spacing.HEIGHT_8, borderRadius: spacing.RADIUS_10, marginTop: spacing.MARGIN_4 }} />
                                    </View>
                                    <View style={styles.dateAndTimeView} >
                                        <View style={[styles.dateAndTimeView_view, { flex: 1, marginRight: spacing.MARGIN_20 }]}  >
                                            <View style={{ width: spacing.HEIGHT_12, height: spacing.HEIGHT_12, borderRadius: spacing.RADIUS_2, marginRight: spacing.MARGIN_6 }} />
                                            <View style={{ height: spacing.HEIGHT_10, width: spacing.FULL_WIDTH / 3.8, borderRadius: spacing.RADIUS_30 }} />
                                        </View>
                                        <View style={[styles.dateAndTimeView_view]}  >
                                            <View style={{ width: spacing.HEIGHT_12, height: spacing.HEIGHT_12, borderRadius: spacing.RADIUS_2, marginRight: spacing.MARGIN_6 }} />
                                            <View style={{ height: spacing.HEIGHT_10, width: spacing.FULL_WIDTH / 3.8, borderRadius: spacing.RADIUS_30 }} />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </SkeletonPlaceholder>
                    :
                    <View style={styles.mainView} >
                        <TouchableOpacity style={[styles.secondaryView,]} onPress={() => onPressCard()} >
                            <CommonImage
                                source={getImage(image)}
                                style={[styles.imageStyle]}
                                resizeMode={"cover"}
                            />
                            <View style={styles.rightContainer} >
                                <View style={styles.rightContainer_primaryView} >
                                    <View>
                                        <RegularText style={styles.title} numberOfLines={1} >{item && item.service && item.service.name}</RegularText>
                                        <RegularText style={styles.description} numberOfLines={2} >{item && item.service && item.service.description ? item.service.description : " "}</RegularText>
                                    </View>
                                    <View style={styles.dateAndTimeView} >
                                        <View style={[styles.dateAndTimeView_view, { flex: 1 }]}  >
                                            <CommonImage source={Images.IMG_CALENDER} />
                                            <RegularText style={styles.dateAndTimeView_view_text}>{convertDateTime(item && item.created, 'MMMM Do')}</RegularText>
                                        </View>
                                        <View style={styles.dateAndTimeView_view} >
                                            <CommonImage source={Images.IMG_CLOCK_SMALL} />
                                            <RegularText style={styles.dateAndTimeView_view_text}>{item && item.slot && item.slot.start_time.substring(0, item.slot.start_time.length - 3) + "-" + item.slot.end_time.substring(0, item.slot.end_time.length - 3)}</RegularText>
                                        </View>
                                    </View>
                                </View>
                                {/* <CommonImage source={Images.IMG_DOWN_ARROW} viewStyle={styles.rightArrowView} /> */}
                            </View>
                        </TouchableOpacity>
                        {
                            (item.result_attachment || item.result_link) &&
                            <>
                                <View style={styles.seprator} />
                                <View style={styles.secondaryView}>
                                    <TouchableOpacity style={{ flex: 1 }} onPress={() => openReport()}  >
                                        <RegularText style={styles.viewReportText} >{Strings.view_report}</RegularText>
                                    </TouchableOpacity>
                                    {/* <CommonImage source={Images.IMG_SHARE} style={{ marginHorizontal: spacing.MARGIN_12 }} /> */}
                                </View>
                            </>
                        }
                    </View>
            }
            <WebViewModal
                visible={showReport}
                onClose={closeReport}
                link={item.result_attachment ? item.result_attachment : item.result_link ? item.result_link : ""}
                title={Strings.view_report}
            />
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: colors.white,
        borderRadius: spacing.RADIUS_8,
        paddingHorizontal: spacing.PADDING_12,
        paddingVertical: spacing.PADDING_12,
        marginTop: spacing.MARGIN_12,
    },
    secondaryView: {
        flexDirection: "row",
        alignItems: "center",
    },
    imageStyle: {
        width: spacing.WIDTH_68,
        height: spacing.HEIGHT_68,
        borderRadius: spacing.RADIUS_4
    },
    rightContainer: {
        flex: 1,
        flexDirection: "row",
        marginLeft: spacing.MARGIN_10,
    },
    rightContainer_primaryView: {
        flex: 1,
        justifyContent: 'space-between'
    },
    dateAndTimeView: {
        flexDirection: "row",
        marginTop: spacing.MARGIN_8
    },
    dateAndTimeView_view: {
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM
    },
    description: {
        fontSize: textScale(9),
        color: colors.grey600,
        marginTop: spacing.MARGIN_2
    },
    dateAndTimeView_view_text: {
        fontSize: textScale(9),
        fontFamily: fontNames.FONT_FAMILY_MEDIUM,
        marginLeft: spacing.MARGIN_4,
        color: colors.grey400,
        marginRight: spacing.MARGIN_10
    },
    rightArrowView: {
        marginHorizontal: spacing.MARGIN_12,
        justifyContent: "center",
        transform: [{ rotate: '270deg' }],
    },
    seprator: {
        height: spacing.HEIGHT_1,
        backgroundColor: colors.grey100,
        marginVertical: spacing.MARGIN_12,
        marginHorizontal: -spacing.PADDING_12
    },
    viewReportText: {
        color: colors.theme,
        fontSize: textScale(12)
    },
});

export default BookingListRow;
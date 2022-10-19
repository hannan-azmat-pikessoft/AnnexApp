import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { spacing } from '../../styles/spacing';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { convertDateTime } from '../../utility/Utils';
import RegularText from '../common/RegularText';

const DateTimePickerModal = ({
    visible,
    onClose,
    onChange,
    maximumDate,
    minimumDate,
    value,
    mode
}) => {

    const [pickerMode, setPickerMode] = useState(mode)
    const [pickerCurrentMode, setPickerCurrentMode] = useState('date')
    const [selectedAndroidDate, setSelectedAndroidDate] = useState(new Date())
    const [selectedAndroidTime, setSelectedAndroidTime] = useState(new Date())
    const [selectedAndroidDateTime, setSelectedAndroidDateTime] = useState(new Date())

    function onChangeAndroidDate(event, selectedDate) {
        if (event.type == 'dismissed') {
            onPressAndroidCancel()
            return
        }
        if (Platform.OS == 'android' && mode == 'datetime') {
            if (pickerCurrentMode == 'date') {
                if (selectedDate) {
                    let year = convertDateTime(selectedDate, 'YYYY', true)
                    let month = convertDateTime(selectedDate, 'MM', true)
                    let date = convertDateTime(selectedDate, 'DD', true)
                    setSelectedAndroidDate(`${year}-${month}-${date}`)
                    setPickerCurrentMode('time')
                }
            }
        }
    }

    function onChangeAndroidTime(event, selectedTime) {
        let hour = convertDateTime(selectedTime, 'HH', true)
        let minute = convertDateTime(selectedTime, 'mm', true)
        let second = convertDateTime(selectedTime, 'ss', true)
        let miliSecond = convertDateTime(selectedTime, 'ms', true)
        setSelectedAndroidTime(`T${hour}:${minute}:${second}Z`)
        setSelectedAndroidDateTime(`${selectedAndroidDate}T${hour}:${minute}:${second}Z`)
        onChange(event, `${selectedAndroidDate}T${hour}:${minute}:${second}Z`)
        setPickerCurrentMode('date')
    }

    function onPressAndroidCancel() {
        setPickerMode(mode)
        setPickerCurrentMode('date')
        setSelectedAndroidDate(new Date())
        setSelectedAndroidTime(new Date())
        setSelectedAndroidDateTime(new Date())
        onClose()
    }

    return (
        <View>
            {
                Platform.OS == 'ios' ?
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={visible}
                        onRequestClose={() => {
                            onClose()
                        }}>
                        <TouchableOpacity
                            style={[styles.modalMainContainer, {
                                backgroundColor: Platform.OS == 'ios' ? colors.transparentBlack : colors.transparent
                            }]}
                            activeOpacity={1}
                            onPress={() => onClose()}
                        >
                            <TouchableOpacity
                                activeOpacity={1}
                                style={[styles.visibleViewStyle, {
                                    // minHeight: spacing.FULL_WIDTH / 2,
                                    paddingVertical: spacing.PADDING_32,
                                }]}
                            >
                                <View style={{ alignItems: 'flex-end', marginHorizontal: spacing.MARGIN_12, marginBottom: spacing.MARGIN_12 }}>
                                    <TouchableOpacity style={{ marginLeft: spacing.MARGIN_8, }} onPress={() => onClose()} >
                                        <RegularText title={Strings.done} textStyle={{ color: colors.theme }} />
                                    </TouchableOpacity>
                                </View>
                                {
                                    visible == true &&
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={value.value || new Date()}
                                        mode={mode}
                                        is24Hour={true}
                                        maximumDate={maximumDate}
                                        minimumDate={minimumDate}
                                        onChange={onChange}
                                        onTouchCancel={(date) => { }}
                                        display={'spinner'}
                                        themeVariant={'light'}
                                    />
                                }
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </Modal>
                    :
                    <View>
                        {
                            visible == true && mode == 'datetime' &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={value.value || new Date()}
                                mode={pickerCurrentMode}
                                is24Hour={true}
                                display="default"
                                maximumDate={maximumDate}
                                minimumDate={minimumDate}
                                onChange={pickerCurrentMode == 'date' ? onChangeAndroidDate : onChangeAndroidTime}
                                style={{ flex: 1, }}
                                onTouchCancel={(date) => onPressAndroidCancel()}
                            />
                        }
                        {visible == true && mode != 'datetime' &&
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={value.value || new Date()}
                                mode={mode}
                                is24Hour={true}
                                // display=""
                                maximumDate={maximumDate}
                                minimumDate={minimumDate}
                                onChange={onChange}
                                style={{ flex: 1, }}
                                onTouchCancel={(date) => onPressAndroidCancel()}
                            />
                        }
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    modalMainContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack,
        // position: "absolute",
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // width: spacing.FULL_WIDTH,
        // height: spacing.FULL_HEIGHT,
        // zIndex: -1
    },
    visibleViewStyle: {
        backgroundColor: colors.white,
        width: spacing.FULL_WIDTH,
        // height: spacing.FULL_WIDTH / 2,
        justifyContent: 'center',
        paddingVertical: spacing.PADDING_32,
        paddingHorizontal: spacing.PADDING_12,
        borderRadius: spacing.RADIUS_8,

        // position: "absolute",
        // bottom: 0,
        // left: 0,
        // right: 0,
    },
})

export default DateTimePickerModal;
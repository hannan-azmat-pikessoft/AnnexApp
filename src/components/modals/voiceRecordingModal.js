import React, { useState } from 'react';
import {
    Modal, PermissionsAndroid, Platform, StyleSheet,
    TouchableOpacity, View
} from 'react-native';
import AudioRecorderPlayer, { AudioEncoderAndroidType, AudioSet, AudioSourceAndroidType, AVEncoderAudioQualityIOSType, AVEncodingOption, RecordBackType } from 'react-native-audio-recorder-player';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import Strings from '../../translation/language';
import colors from '../../utility/colors';
import { getFileExt, getFileNameFromUrl } from '../../utility/commonFunctions';
import CommonButton from '../common/buttons/CommonButton';
import RegularText from '../common/RegularText';
import AudioAttachmentRow from '../rows/audioAttachmentRow';
import * as Animatable from 'react-native-animatable';
import { ANIMATION_TYPES, EASING_TYPE } from '../../utility/constants';

const audioRecorderPlayer = new AudioRecorderPlayer();

const VoiceRecordingModal = ({
    visible,
    onClose,
    onFinishRecording
}) => {

    const [isRecording, setIsRecording] = useState(false)
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [recordedFile, setRecordedFile] = useState(undefined)
    const [audioUri, setAudioUri] = useState(undefined)
    const [recordingPosition, setRecordingPosition] = useState("00:00:00")

    async function onPressStartRecording() {
        setIsRecording(true)
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);
                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
                ) {

                } else {
                    return;
                }
            } catch (err) {
                return;
            }
        }

        const audioSet: AudioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        const uri = await audioRecorderPlayer.startRecorder(undefined, audioSet);
        audioRecorderPlayer.addRecordBackListener((e: RecordBackType) => {
            let recordTime = audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition),
            )
            setRecordingPosition(recordTime)
        });
        setAudioUri(uri)
    }

    async function onPressStopRecording() {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setIsRecording(false)
        setRecordedFile({ uri: audioUri })
        // playRecording()
        setIsAudioPlaying(true)
    }

    async function playRecording() {
        setIsAudioPlaying(true)
        try {
            await audioRecorderPlayer.startPlayer(audioUri);
            audioRecorderPlayer.addPlayBackListener((e) => {
                if (e.currentPosition == e.duration) {
                    stopAudioPlay()
                }
                return;
            });
        } catch (error) {

        }
    }

    function stopAudioPlay() {
        setIsRecording(false)
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    }

    function onPressSubmitRecording() {
        setIsAudioPlaying(false)
        stopAudioPlay()
        let obj = {
            name: getFileNameFromUrl(audioUri),
            filename: getFileNameFromUrl(audioUri),
            type: 'audio/' + getFileExt(audioUri),
            uri: audioUri,
        }
        onFinishRecording(obj)
        onCloseRecording()
    }

    function onCloseRecording() {
        setIsAudioPlaying(false)
        setIsRecording(false)
        setAudioUri(undefined)
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        onClose()
    }

    function onPressRemoveAudio() {
        setIsRecording(false)
        setIsAudioPlaying(false)
        setAudioUri(undefined)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                onCloseRecording()
            }}>
            <TouchableOpacity
                style={styles.modalMainContainer}
                activeOpacity={1}
                onPress={() => onCloseRecording()}
            >
                <Animatable.View
                    animation={ANIMATION_TYPES.SLIDE_IN_UP}
                    duration={200}
                    easing={EASING_TYPE.EASE_IN_OUT}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.visibleViewStyle}>
                        <View style={{}} >
                            <RegularText style={[styles.inputLable, { fontFamily: fontNames.FONT_FAMILY_BOLD, color: colors.black }]} >{Strings.add_voice_instructions}</RegularText>
                        </View>
                        <View style={{}} >
                            {
                                !isRecording && !isAudioPlaying ?
                                    // <View style={{ borderWidth: 2 }}>
                                    <CommonButton
                                        title={Strings.start}
                                        buttonStyle={styles.createButtonStyle}
                                        marginTop={spacing.MARGIN_30}
                                        backgroundColor={colors.theme}
                                        textStyle={{ color: colors.white, fontSize: textScale(14) }}
                                        onPressButton={() => onPressStartRecording()}
                                    />
                                    // </View>
                                    : null
                            }
                            {
                                isRecording && !isAudioPlaying ?
                                    <View style={{ alignItems: 'center', marginTop: spacing.MARGIN_30 }} >
                                        <RegularText style={[styles.inputLable, { color: colors.grey500, fontFamily: fontNames.FONT_FAMILY_REGULAR, marginBottom: spacing.MARGIN_20 }]} >{Strings.recording + ' ' + recordingPosition}</RegularText>
                                        <CommonButton
                                            title={Strings.stop}
                                            buttonStyle={[styles.createButtonStyle, {}]}
                                            backgroundColor={colors.red200}
                                            marginTop={spacing.MARGIN_6}
                                            textStyle={{ color: colors.white, fontSize: textScale(14) }}
                                            onPressButton={() => onPressStopRecording()}
                                        />
                                    </View>
                                    : null
                            }
                            {
                                !isRecording && isAudioPlaying == true && audioUri ?
                                    <View style={{ alignItems: "center", alignSelf: "center", }} >
                                        <AudioAttachmentRow
                                            item={recordedFile}
                                            containerStyle={{ width: spacing.FULL_WIDTH - spacing.MARGIN_30 }}
                                            onPressRemove={onPressRemoveAudio} />
                                        <CommonButton
                                            title={Strings.submit}
                                            buttonStyle={[styles.createButtonStyle, {}]}
                                            textStyle={{ fontSize: textScale(14) }}
                                            onPressButton={() => onPressSubmitRecording()}
                                            marginTop={spacing.MARGIN_12}
                                        />
                                    </View>
                                    : null
                            }
                        </View>
                    </TouchableOpacity>
                </Animatable.View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalMainContainer: {
        backgroundColor: colors.white,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.transparentBlack
    },
    visibleViewStyle: {
        backgroundColor: colors.white,
        width: spacing.FULL_WIDTH,
        alignItems: "center",
        paddingTop: spacing.PADDING_24,
        paddingBottom: spacing.PADDING_44,
        paddingHorizontal: spacing.PADDING_16,
        borderTopLeftRadius: spacing.RADIUS_12,
        borderTopRightRadius: spacing.RADIUS_12,
        // minHeight: spacing.FULL_HEIGHT / 4,
    },
    inputLable: {
        fontSize: textScale(16),
        color: colors.grey800,
    },
    createButtonStyle: {
        // marginTop: spacing.MARGIN_30,
        width: spacing.FULL_WIDTH - spacing.MARGIN_36,
    },
    closeContainer: {
        alignSelf: 'flex-end',
        marginBottom: spacing.MARGIN_24,
        marginHorizontal: spacing.MARGIN_20
    }
})

export default VoiceRecordingModal;
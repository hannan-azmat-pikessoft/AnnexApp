import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native"
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import { textScale } from '../../styles/responsiveStyles'
import { spacing } from '../../styles/spacing'
import colors from '../../utility/colors'
import { getFileNameFromUrl } from '../../utility/commonFunctions'
import { Images } from '../../utility/imagePaths'
import RegularText from '../common/RegularText'
import CommonImage from '../common/views/CommonImage'

const audioRecorderPlayer = new AudioRecorderPlayer();


const AudioAttachmentRow = ({ item, index, onPressRemove, onPressAttachment, containerStyle }) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentPositionSec, setCurrentPositionSec] = useState(0)
    const [currentDurationSec, setCurrentDurationSec] = useState(0)

    const playWidth = (currentPositionSec / currentDurationSec) * 100
    async function playRecording() {
        setIsPlaying(true)
        try {
            await audioRecorderPlayer.startPlayer(item.uri);
            audioRecorderPlayer.addPlayBackListener((e) => {
                if (e.currentPosition == e.duration) {
                    stopAudioPlay()
                }
                setCurrentPositionSec(e.currentPosition)
                setCurrentDurationSec(e.duration)
                return;
            });
        } catch (error) {

        }
    }

    function stopAudioPlay() {
        setIsPlaying(false)
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
    }

    return (
        <TouchableOpacity style={[styles.container, containerStyle,]} activeOpacity={1} onPress={() => {
            if (onPressAttachment) {
                onPressAttachment(item, index)
            }
        }
        } >
            <View style={{ marginRight: spacing.MARGIN_6 }} >
                {!isPlaying && <TouchableOpacity onPress={() => playRecording()} >
                    <CommonImage source={Images.IMG_PLAY} style={{}} />
                </TouchableOpacity>}
                {isPlaying && <TouchableOpacity onPress={() => stopAudioPlay()}>
                    <CommonImage source={Images.IMG_PAUSE} style={{}} />
                </TouchableOpacity>}
            </View>
            <View style={styles.viewBar}>
                <View style={[styles.viewBarPlay, { width: playWidth + "%" }]} />
            </View>
            <TouchableOpacity style={{
                backgroundColor: colors.secondaryColor,
                borderRadius: spacing.RADIUS_50,
                width: spacing.WIDTH_24,
                height: spacing.WIDTH_24,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: "flex-end",
                marginLeft: spacing.MARGIN_6,
            }}
                onPress={() => onPressRemove(item, index)} >
                <CommonImage source={Images.IMG_CLOSE} style={{ tintColor: colors.white, width: spacing.WIDTH_8, height: spacing.WIDTH_8 }} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.PADDING_12,
        paddingVertical: spacing.PADDING_8,
        marginHorizontal: spacing.MARGIN_18,
        borderRadius: spacing.RADIUS_8,
        marginTop: spacing.MARGIN_8,
        // width: spacing.FULL_WIDTH - spacing.MARGIN_36,
        // justifyContent: "space-between",
    },
    name: {
        fontSize: textScale(12),
    },
    viewBar: {
        backgroundColor: colors.grey400,
        height: spacing.HEIGHT_4,
        width: "80%",
        borderRadius: spacing.RADIUS_10,
        // marginHorizontal: spacing.MARGIN_12
    },
    viewBarPlay: {
        backgroundColor: colors.theme,
        height: spacing.HEIGHT_4,
        borderRadius: spacing.RADIUS_10,
        width: 0,

    },
});

export default AudioAttachmentRow
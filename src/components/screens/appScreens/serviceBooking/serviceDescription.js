import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { textScale } from '../../../../styles/responsiveStyles';
import { spacing } from '../../../../styles/spacing';
import { fontNames } from '../../../../styles/typography';
import Strings from '../../../../translation/language';
import colors from '../../../../utility/colors';
import { OpenGallary } from '../../../../utility/commonFunctions';
import { Images } from '../../../../utility/imagePaths';
import CommonButton from '../../../common/buttons/CommonButton';
import CommonLabelDescInput from '../../../common/inputBoxes/CommonLabelDescInput';
import RegularText from '../../../common/RegularText';
import CommonImage from '../../../common/views/CommonImage';
import VirtualizedView from '../../../common/views/VirtualizedView';
import VoiceRecordingModal from '../../../modals/voiceRecordingModal';
import AudioAttachmentRow from '../../../rows/audioAttachmentRow';

const image = "https://media.istockphoto.com/photos/young-woman-getting-tested-for-coronaviruscovid19-at-medical-clinic-picture-id1310644715?b=1&k=20&m=1310644715&s=170667a&w=0&h=QYy9ZSIJkOOxRoVZb4suPVnGLbaMOOzL5n6SaJFiTBA="

const RenderImages = ({ item, index, onPressDeleteImage }) => {
    return (
        <View style={{ borderRadius: spacing.RADIUS_4, marginLeft: index == 0 ? spacing.MARGIN_18 : 0, marginRight: spacing.MARGIN_18, marginVertical: spacing.MARGIN_24 }}>

            <CommonImage
                source={{ uri: item.uri }}
                style={{
                    height: spacing.HEIGHT_90,
                    width: spacing.HEIGHT_90,
                    borderRadius: spacing.RADIUS_4
                }}
                resizeMode={"cover"}
            />
            <TouchableOpacity
                onPress={() => onPressDeleteImage(index)}
                activeOpacity={1}
                style={{
                    backgroundColor: colors.secondaryColor,
                    borderRadius: spacing.RADIUS_50,
                    position: "absolute",
                    top: -spacing.HEIGHT_6,
                    right: -spacing.HEIGHT_6,
                    width: spacing.WIDTH_24,
                    height: spacing.WIDTH_24,
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                <CommonImage source={Images.IMG_CLOSE} style={{ tintColor: colors.white, width: spacing.WIDTH_8, height: spacing.WIDTH_8 }} />
            </TouchableOpacity>
        </View>
    )
}

const SelectedImagesComponent = ({ data, onPressDeleteImage }) => {
    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item, index }) => <RenderImages item={item} index={index} onPressDeleteImage={onPressDeleteImage} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

const ServiceDescription = ({ description, setDescription, descriptionError, voiceNote, setVoiceNote, selectedImage, setSelectedImage }) => {

    const [render, setRender] = useState()
    const [isPicturePicked, setIsPicturePicked] = useState(false)
    const [hasVoiceNote, setHasVoiceNote] = useState(false)
    const [showVoiceNoteModel, setShowVoiceNoteModel] = useState(false)

    const { serviceInCart, totalServicePriceWithVAT } = useSelector(state => state.bookServiceReducer)

    function onPressVoiceNote() {
        setShowVoiceNoteModel(true)
    }
    function closeVoiceNoteModel() {
        setShowVoiceNoteModel(false)
    }
    function
        onFinishRecording(obj) {
        setHasVoiceNote(true)
        setVoiceNote(obj)
    }
    function onPressFile() {
        onPressGallery()
    }

    function onPressGallery() {
        OpenGallary(handleImageSelection, { cropping: true, multiple: true })
    }

    function handleImageSelection(image) {
        setIsPicturePicked(true)
        setSelectedImage([...selectedImage, ...image])
    }
    function onPressDeleteImage(index) {
        selectedImage.splice(index, 1)
        setRender(!render)
    }
    function onPressDeleteAudio() {
        setHasVoiceNote(false)
    }
    return (
        <VirtualizedView style={styles.mainContainer} >
            <View style={styles.infoContainer} >
                <RegularText style={styles.infoContainer_heading} >{serviceInCart.service.name}</RegularText>
                <RegularText style={styles.infoContainer_description} >{serviceInCart.service.description}</RegularText>
            </View>
            <View style={styles.descriptionContainer} >
                <RegularText style={styles.descriptionContainer_title} >{Strings.please_add_any_specific_instruction}</RegularText>
                <CommonLabelDescInput
                    showCounter={true}
                    maxChar={180}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    onSubmitEditing={() => { }}
                    error={descriptionError}
                />
            </View>
            <View style={styles.buttonContainer} >
                <CommonButton
                    leftImage={Images.IMG_MICROPONE}
                    title={Strings.voice_note}
                    leftImageStyle={styles.buttonLeftImageStyle}
                    buttonStyle={[styles.buttonStyle, { marginRight: spacing.MARGIN_6 }]}
                    backgroundColor={hasVoiceNote ? colors.grey500 : colors.theme}
                    onPressButton={onPressVoiceNote}
                    textStyle={{ fontSize: textScale(10) }}
                    disabled={hasVoiceNote}
                />
                <CommonButton
                    leftImage={Images.IMG_PAPERCLIP}
                    title={Strings.file}
                    leftImageStyle={styles.buttonLeftImageStyle}
                    buttonStyle={[styles.buttonStyle, { marginLeft: spacing.MARGIN_6 }]}
                    onPressButton={onPressFile}
                    textStyle={{ fontSize: textScale(10) }}
                />
            </View>
            {
                isPicturePicked &&
                <SelectedImagesComponent data={selectedImage} onPressDeleteImage={onPressDeleteImage} />
            }
            {
                hasVoiceNote &&
                <AudioAttachmentRow item={voiceNote} onPressRemove={onPressDeleteAudio} containerStyle={{ marginTop: spacing.MARGIN_20 }} />
            }
            <VoiceRecordingModal
                visible={showVoiceNoteModel}
                onClose={closeVoiceNoteModel}
                onFinishRecording={onFinishRecording}
            />
        </VirtualizedView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.appBackgroundColor
    },
    infoContainer: {
        backgroundColor: colors.grey200,
        paddingHorizontal: spacing.PADDING_30,
        paddingVertical: spacing.PADDING_18
    },
    infoContainer_heading: {
        fontSize: textScale(12),
        fontFamily: fontNames.FONT_FAMILY_BOLD
    },
    infoContainer_description: {
        fontSize: textScale(10),
        fontFamily: fontNames.FONT_FAMILY_LIGHT,
        marginTop: spacing.MARGIN_4
    },
    descriptionContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.PADDING_30,
        paddingVertical: spacing.PADDING_18
    },
    descriptionContainer_title: {
        fontSize: textScale(12),
        color: colors.black,
        marginBottom: spacing.MARGIN_20,
    },
    buttonContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: spacing.MARGIN_18,
        marginTop: spacing.MARGIN_20
    },
    buttonLeftImageStyle: {
        marginRight: spacing.MARGIN_12
    },
    buttonStyle: {
        flex: 1,
        height: spacing.HEIGHT_54
    },
})

export default ServiceDescription; 
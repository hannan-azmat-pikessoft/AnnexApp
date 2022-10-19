import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { navigate } from '../../../utility/commonFunctions';
import { SCREEN_COMMON_WEBVIEW } from '../../../utility/constants';

const CommonImage = ({
    source,
    style,
    resizeMode,
    showFull,
    viewStyle
}) => {

    function onPressImage(link) {
        if (showFull && showFull == true) {
            navigate(SCREEN_COMMON_WEBVIEW, { link: link })
        }
    }

    return (
        <View style={viewStyle} >
            {source.uri == undefined ?
                <Image
                    source={source}
                    resizeMode={resizeMode ? resizeMode : 'contain'}
                    style={[style, {}]}
                />
                :
                showFull && showFull == true ?
                    <TouchableOpacity activeOpacity={1} onPress={() => onPressImage(source.uri)} >
                        <FastImage
                            source={source}
                            resizeMode={resizeMode ? resizeMode : 'contain'}
                            style={[style, {}]}
                        />
                    </TouchableOpacity>
                    :
                    <FastImage
                        source={source}
                        resizeMode={resizeMode ? resizeMode : 'contain'}
                        style={[style, {}]}
                    />
            }
        </View>
    )
}

export default CommonImage;
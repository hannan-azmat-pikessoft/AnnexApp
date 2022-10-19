import React from 'react';
import { StyleSheet, View } from 'react-native';
import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';
import { isImage, isPdf } from '../../../utility/commonFunctions';
import CommonImage from './CommonImage';

const CommonDocumentViewer = ({
    source,
    style,
    resizeMode,
}) => {

    return (
        <View  >
            {
                source.uri == undefined ?
                    isImage(source.uri) ?
                        <CommonImage source={source.uri} style={style} />
                        :
                        isPdf(source.uri) ?
                            <Pdf
                                source={source.uri}
                                onLoadComplete={(numberOfPages, filePath) => { }}
                                onPageChanged={(page, numberOfPages) => { }}
                                onError={(error) => { }}
                                onPressLink={(uri) => { }}
                                style={style}
                            />
                            :
                            <WebView
                                containerStyle={style}
                                scalesPageToFit
                                onLoadEnd={() => { }}
                                style={style}
                                source={{ uri: source.uri }}
                                onError={(error) => { }}
                            />
                    : null
            }
        </View>
    )
}


const styles = StyleSheet.create({

});

export default CommonDocumentViewer;
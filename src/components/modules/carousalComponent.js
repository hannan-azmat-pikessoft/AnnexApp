import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from "react-native"
import { spacing } from '../../styles/spacing'
import colors from '../../utility/colors'

let currentIndex = 0

const CarousalComponent = ({
    dataArray,
    rowComponent,
    dotStyle,
    autoScroll,
    scrollDuration
}) => {

    let carousalRef = useRef()
    let intervalId

    const [currentViewItem, setCurrentViewItem] = useState(undefined)

    const onViewRef = React.useRef((viewableItems) => { setCurrentViewItem(viewableItems.viewableItems) })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    useEffect(() => {
        if (autoScroll == true && dataArray.length > 0) {
            let timeoutId = setTimeout(() => {
                moveScroll()
            }, 2000);
            return (() => {
                clearTimeout(timeoutId)
                clearInterval(intervalId)
            })
        }
    }, [])

    function moveScroll() {
        intervalId = setInterval(() => {
            if (currentIndex < dataArray.length - 1) {
                scrollCarousal(currentIndex + 1)
            }
            else {
                scrollCarousal(0)
            }
        }, scrollDuration ? scrollDuration : 2000);
    }

    function scrollCarousal(index) {
        carousalRef?.current?.scrollToIndex({ animated: true, index: index })
        currentIndex = index
    }

    return (
        <View style={{ alignItems: 'center' }} >
            <FlatList
                ref={carousalRef}
                data={dataArray}
                snapToAlignment='start'
                initialNumToRender={0}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled={true}
                decelerationRate={'fast'}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                renderItem={({ item, index }) => rowComponent(item, index)}
            />
            {currentViewItem && currentViewItem[0] &&
                <FlatList
                    data={dataArray}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    style={[{ flexDirection: 'row', marginTop: spacing.MARGIN_8, }, dotStyle,]}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                borderColor: currentViewItem[0].index == index ? colors.white : colors.white,
                                borderWidth: currentViewItem[0].index == index ? 1 : 1,
                                backgroundColor: currentViewItem[0].index == index ? colors.white : colors.transparent,
                                height: spacing.HEIGHT_8,
                                width: spacing.HEIGHT_8,
                                borderRadius: spacing.RADIUS_90,
                                marginHorizontal: spacing.MARGIN_2
                            }} />
                        )
                    }}
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({

});

export default CarousalComponent
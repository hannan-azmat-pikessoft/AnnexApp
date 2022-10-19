import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import colors from '../utility/colors';

async function notiListeners() {
    messaging().onMessage(async remoteMessage => {
        PushNotification.localNotification({
            /* Android Only Properties */
            autoCancel: remoteMessage.data.autoCancel || false,
            bigLargeIconUrl: remoteMessage.data.picture || "",
            largeIconUrl: remoteMessage.data.picture || "",
            vibrate: remoteMessage.data.vibrate || true,
            group: remoteMessage.data.group || '',
            channelId: remoteMessage.data.channelId,

            /* iOS and Android properties */
            title: remoteMessage.data.title,
            message: remoteMessage.data.message,
            subText: remoteMessage.data.subText || '',
            subtitle: remoteMessage.data.subtitle || '',
            playSound: remoteMessage.data.playSound || true,
            soundName: remoteMessage.data.soundName || 'default',
            number: parseInt(remoteMessage.data.number) || 1,
            picture: remoteMessage.data.picture || undefined,
            ignoreInForeground: false,
            color: remoteMessage.data.color || "black",
            invokeApp: true,

            data: remoteMessage.data || {},
        });
    });
};

export function getDeliveredNotifications() {
    PushNotification.getDeliveredNotifications(number => { })
    PushNotification.setApplicationIconBadgeNumber(100)
}

export default notiListeners;
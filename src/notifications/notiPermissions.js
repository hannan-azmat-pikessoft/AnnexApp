import PushNotification from 'react-native-push-notification';
import { NOTI_CHANNEL_DESC, NOTI_CHANNEL_ID, NOTI_CHANNEL_NAME } from '../utility/constants';

export async function createNotiChannel(params) {
    PushNotification.createChannel({
        channelId: NOTI_CHANNEL_ID,
        channelName: NOTI_CHANNEL_NAME,
        channelDescription: NOTI_CHANNEL_DESC,
        soundName: "default",
        importance: 5,     // <- POPUP NOTIFICATION CHANNEL
        vibrate: true,
    });
}
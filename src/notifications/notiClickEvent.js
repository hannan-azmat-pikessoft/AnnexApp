import PushNotification from 'react-native-push-notification';

async function notiClickEvent() {
    PushNotification.configure({
        onNotification: function (notification) {
            const { data, foreground } = notification;
            // setTimeout(() => {
            //     notificationNavigate(data.type, data.id, data.user_role, data.external_link)
            // }, 1000);
        }
    });
};

export function notificationNavigate(type, id, role, link) {
    switch (type) {

        default:
            break;
    }
}

export default notiClickEvent;
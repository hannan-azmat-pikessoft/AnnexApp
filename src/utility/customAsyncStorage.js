import AsyncStorage from "@react-native-async-storage/async-storage";

export async function retrieveItem(key) {
    try {
        const retrievedItem = await AsyncStorage.getItem(key);
        const item = JSON.parse(retrievedItem);
        return item;
    } catch (error) {
    }
    return
}

export async function storeItem(key, item) {
    try {
        var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
        return jsonOfItem;
    } catch (error) {
    }
}

export async function clearAsyncKeyData(key) {
    await AsyncStorage.removeItem(key)
}

export async function clearData() {
    try {
        await AsyncStorage.clear();
    } catch (error) {
    }
}
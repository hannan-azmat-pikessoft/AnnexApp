import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import { Platform } from "react-native";
import DeviceInfo from 'react-native-device-info';
import flashMessage from "../../components/common/CustomFlashAlert";
import { clearUserData } from "../../utility/commonFunctions";
import { KEY_USER_TOKEN } from "../../utility/constants";
import { retrieveItem } from "../../utility/customAsyncStorage";
import { requestTrackingPermission } from 'react-native-tracking-transparency';

const ourRequest = axios.CancelToken.source()
export default async (method) => {
    let networkStatus = undefined;
    await NetInfo.fetch().then(state => {
        networkStatus = state.isConnected;
    });
    if (networkStatus != undefined && networkStatus) {
        return new Promise((resolve, reject) => {
            callApi(method, resolve, reject)
        })
    } else {
        return flashMessage("You are offline.", "danger");
    }

}

export async function callApi(method, resolve, reject) {

    let headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        AppVersion: await DeviceInfo.getVersion(),
        Platform: 'mobile',
        OsVersion: await DeviceInfo.getSystemVersion(),
        Os: Platform.OS,
    }

    const trackingStatus = await requestTrackingPermission();
    if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
        headers.DeviceId = await DeviceInfo.getUniqueId()
        headers.IpAddress = await DeviceInfo.getIpAddress()
        headers.MacAddress = await DeviceInfo.getMacAddress()
        headers.DeviceName = await DeviceInfo.getDeviceName()
    }

    // console.log(headers);

    await retrieveItem(KEY_USER_TOKEN)
        .then(token => {
            if (token) {
                headers.Authorization = `token ${token}`
            }
        })

    let axiosData = {
        method: method.apiType,
        headers: headers,
        url: method.type,
        // cancelToken: ourRequest.token
    }

    // console.log(JSON.stringify(headers));
    // console.log(method.apiType + ' >>>>> ' + axiosData.url);
    // console.log("PAYLOAD >>>>> " + JSON.stringify(method.payload));

    if (method.apiType === 'GET') {
        axiosData.timeout = 10000
    }
    else {
        var formData = await getFormData(method.payload)
        axiosData.data = formData
        axiosData.timeout = 20000
    }

    try {
        let response = await axios(axiosData)
        checkResponse(response, resolve, reject)
    } catch (err) {
        let response = err.response;
        if (response) {
            checkResponse(response, resolve, reject)
        }
        else {
            reject(err.message ? { error: err.message } : { error: err.message });
            // console.log("error >> ", err.message);
            return
        }
    }
}

function checkResponse(response, resolve, reject) {
    // console.log("RESPONSE STATUS >>>>> " + response.status);
    // console.log("RESPONSE >>>>> " + JSON.stringify(response.data));
    if (response.status === 200 || response.status === 201 || response.status === 204) { //success
        resolve(response.data || {});
        return
    }
    else if (response.status === 401) {
        clearUserData()
        // ourRequest.cancel()
        reject(response.data);
        return
    }
    else if (response.status === 400) {
        reject(response.data);
        return
    }
    else if (response.status === 500) { //internal server error
        reject({ err: "Something Went Wrong" });
        return
    }
    else {
        reject(response);
        return
    }
}

function getFormData(data) {
    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value) === true) {
            for (var i = 0; i < value.length; i++) {
                formData.append(`${key}`, value[i]);
            }
        }
        else {
            formData.append(`${key}`, value);
        }
    }
    return formData
}
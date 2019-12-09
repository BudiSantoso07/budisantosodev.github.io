const FCM_SERVER_KEY = "AAAAP5laJI8:APA91bEADGJ8t9YJQtmDQNOxJbUca_qk2IgnJbYagfB64n7dACIGEsh0NMrEVUxiyT9QI7hZK1y3joXw3LTwJU5J5kA8fmrIG817sigTOL3Ehx4Nt6SYCK08TsWsEkcPKCjBShJGQbV-";
const PUBLIC_KEY = "BCmcMkGvoC5rmSzJsJAQvvdXsRCHzn5aOkU09c5qtNRG4saCuM2f5P7zHGE1uASVcPJk5fxoM9T2Z25AFnaD74I";
const PRIVATE_KEY = "Acfx-9iv29JsCDhCN27BDJW_CXgqnC9fQjVpQa55Df8";

if (('PushManager' in window)) {
    navigator.serviceWorker.getRegistration().then(function(registration) {
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
    }).then(function(subscribe) {
            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('p256dh')))));
            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                null, new Uint8Array(subscribe.getKey('auth')))));
        }).catch(function(e) {
            console.error('Tidak dapat melakukan subscribe ', e.message);
        });
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
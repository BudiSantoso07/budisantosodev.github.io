var webPush = require('web-push');

const PUBLIC_KEY = "BCmcMkGvoC5rmSzJsJAQvvdXsRCHzn5aOkU09c5qtNRG4saCuM2f5P7zHGE1uASVcPJk5fxoM9T2Z25AFnaD74I";
const PRIVATE_KEY = "Acfx-9iv29JsCDhCN27BDJW_CXgqnC9fQjVpQa55Df8";
const vapidKeys = {
    "publicKey": PUBLIC_KEY,
    "privateKey": PRIVATE_KEY
};


webPush.setVapidDetails(
    'mailto:budi.itpens@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/dwfPYEZBLOE:APA91bEWyc523VD0QPewJBLoCsEIqGtjutEWyAo9EhIXZWvyCB9oWY3u3KE-zzNAejwjuNfRXnP28IrHoLv4-lochcWo475j4jotxvG5ZKcMlyifQq8i27KHpsC4vQ4RRY5nislGEHSz",
    "keys": {
        "p256dh": "BAza3yy2KUuRiKJ0PdCHG/SLi1KfytCG66IMCSWH/i4jrYZMzAxWepue/zCgngbukR/8sAPsDfRe4VOtgwYnfis=",
        "auth": "1PW/AvkjGecs2+qZx9oN+Q=="
    }
};
var payload = 'Selamat datang di Info Liga Inggris! Semoga informasi yang kami sajikan bermanfaat untuk anda';

var options = {
    gcmAPIKey: '273155761295',
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
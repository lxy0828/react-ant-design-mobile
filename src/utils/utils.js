import { routerRedux } from 'dva/router';
import store from '../index';

export function goTo(url) {
    if (!process.env.REACT_APP_hybrid) {
        console.log(url);
        const { dispatch } = store;
        dispatch(routerRedux.push(url))
    } else {
        window.location.href = url;
    }
}


/**
 * 
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object} 
 */
export function parseQueryString(url) {
    url = !url ? window.location.href : url;
    if (url.indexOf('?') === -1) {
        return {};
    }
    var search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
    if (search === '') {
        return {};
    }
    search = search.split('&');
    var query = {};
    for (var i = 0; i < search.length; i++) {
        var pair = search[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}

/**
 * 
 * @desc   对象序列化
 * @param  {Object} obj 
 * @return {String}
 */
export function stringfyQueryString(obj) {
    if (!obj) return '';
    var pairs = [];

    for (var key in obj) {
        var value = obj[key];

        if (typeof (value) === "object") {
            pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(JSON.stringify(value)))
            continue;
        }

        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }

    return pairs.join('&');
}


/**
* 
* @desc   判断是否为手机号
* @param  {String|Number} str 
* @return {Boolean} 
*/
export function isPhoneNum(str) {
    return /^(\+?0?86\-?)?1[3456789]\d{9}$/.test(str)
}

/**
 * @desc  将base64转换为文件
 * @param {base64} dataurl 
 * @param {String} filename 
 */
export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

/**
 * 判断是否是Android 系统
 */
export function isAndroid() {
    let u = window.navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    return isAndroid
}

/**
 * 格式化时间格式
 */
export function formatTime(date) {
    let second = parseInt(date);// 秒
    let minute = 0;// 分
    let hour = 0;// 小时
    let day = 0;//天
    if (second >= 60) {
        minute = parseInt(second / 60);
        second = parseInt(second % 60);
        if (minute >= 60) {
            hour = parseInt(minute / 60);
            minute = parseInt(minute % 60);
            if (hour >= 24) {
                day = parseInt(hour / 24);
                hour = parseInt(hour % 24);
            }
        }
    }
    let result = parseInt(second);
    result = result.toString().length === 1 ? '0' + result : result;
    if (minute >= 0) {
        result = parseInt(minute) + ":" + result;
        result = minute.toString().length === 1 ? '0' + result : result;
    }
    if (hour >= 0) {
        result = parseInt(hour) + ":" + result;
        result = hour.toString().length === 1 ? '0' + result : result;
    }
    if (day > 0) {
        result = parseInt(day) + "天 " + result;
        result = day.toString().length === 1 ? '0' + result : result;
    }
    return "剩余" + result;
}
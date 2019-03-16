import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import store from '../index';
import { stringify } from 'qs';
import md5 from 'md5';
import cookie from 'react-cookies';
let localTimeDif = 0;
// let $ = language.getLanguageData;
const codeMessage = {
    // 200: $('服务器成功返回请求的数据。'),
    // 201: $('新建或修改数据成功。'),
    // 202: $('一个请求已经进入后台排队（异步任务）。'),
    // 204: $('删除数据成功。'),
    // 400: $('发出的请求有错误，服务器没有进行新建或修改数据的操作。'),
    // 401: $('用户没有权限（令牌、用户名、密码错误）。'),
    // 403: $('用户得到授权，但是访问是被禁止的。'),
    // 404: $('发出的请求针对的是不存在的记录，服务器没有进行操作。'),
    // 406: $('请求的格式不可得。'),
    // 410: $('请求的资源被永久删除，且不会再得到的。'),
    // 422: $('当创建一个对象时，发生一个验证错误。'),
    // 500: $('服务器发生错误，请检查服务器。'),
    // 502: $('网关错误。'),
    // 503: $('服务不可用，服务器暂时过载或维护。'),
    // 504: $('网关超时。'),
};
const requestHeader = {
    'Accept': 'text/plain;',
    'Content-Type': 'application/json',
    'mode': "cors",
}

const requestHeaderBlob = {
    'Accept': 'text/plain;',
    'Content-Type': 'application/json',
    'mode': "cors",
    'responseType':'blob'
}

function parseJSON(response) {
    return response.json();
}
function checkStatus(response, showMessage) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errortext = codeMessage[response.status] || response.statusText;
    // showMessage && notification.error({
    //     message: `${$("请求错误")} ${response.status}: ${response.url}`,
    //     description: errortext,
    // });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, newOptions, showMessage = true, successMsg = false) {
    return fetch(url, newOptions)
        .then((response) => checkStatus(response, showMessage))
        .then(parseJSON)
        .then(data => {
            if (data.code === 1 || data.error_code === 0 || data.status === 0) {
                localTimeDif = correctionLocalTime(data.server_time);
                successMsg && Toast.success('操作成功');
                return data;
            }  else {
                const { dispatch } = store;
                let code_data = '';
                if (typeof data.data == 'string') {
                    code_data = data.data;
                }
                let msg = data.message == undefined ? data.msg : data.message
                showMessage && Toast.fail(msg + ';  ' + code_data);
                if (data.code === 9 || data.code === 10) dispatch(routerRedux.push('/user/login'));
                return data
            }
        })
        .catch(e => {
            const { dispatch } = store;
            const status = e.name;
            if (status === 401 && showMessage) {
                dispatch({
                    type: 'login/logout',
                });
                return {
                    errorCode: status,
                };
            }
            if (status === 403 && showMessage) {
                return {
                    errorCode: status,
                };
            }
            if (status <= 504 && status >= 500 && showMessage) {
                return {
                    errorCode: status,
                };
            }
            if (status >= 404 && status < 422 && showMessage) {
                return {
                    errorCode: status,
                };
            }
            return {
                errorCode: 1,
            }
        });
}
/**
 * 
 * @param {string} url 请求地址
 * @param {any} params 请求参数
 * @param {Boolean} showMessage 是否显示错误提示，默认为false
 */
function GET(url, params, showMessage) {
    let _params = !!params ? "?" + stringify(params) : "";
    return request(url + _params, {
        method: "GET",
        headers: requestHeader,
        credentials: 'include'
    }, showMessage)
}
// 对比本地时间戳和服务器时间戳
function correctionLocalTime (serverTime) {
    var time = serverTime ? (serverTime - parseInt(Date.now() / 1000)) * 1000 : 0;
    return time;
}
function getSnTime() {
    let snTime = new Date().getTime() + (localTimeDif ? parseInt(localTimeDif) : 0);
    return snTime;
}
// 加密数据
function calcSn(data, snTime, token) {
    let obj = Object.assign({},{"snTime": snTime, "token": token}, data);
    let queryString = "";
    let keyArr = Object.keys(obj).sort();
    let len = keyArr.length;
    let i = 0;
    for (; i < len; i++) {
        queryString += keyArr[i] + "=" + obj[keyArr[i]] + "&";
    }
    queryString = queryString.substring(0, queryString.length - 1);
    return md5(queryString);
};
// 格式化请求参数
function formatParam (params) {
    let token = ""
    let admin_token = cookie.load("login_token");
    if (admin_token !== undefined && admin_token !== "") {
        token = admin_token;
    }
    let obj = {
        "body": params,
        "header": {"token":token,"snTime":getSnTime(),"sn":calcSn(params,getSnTime(),token),"from":"web"}
    }
    return JSON.stringify(obj)
}
function POST(url, params, showMessage,successMsg) {
    return request(url+"?t="+getSnTime(), {
        method: "POST",
        headers: requestHeader,
        body: formatParam(params),
        credentials: 'include',
    }, showMessage,successMsg)
}
export { GET };
export { POST };

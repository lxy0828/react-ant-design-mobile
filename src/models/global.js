import { routerRedux } from 'dva/router';
import { POST, BLOB } from '../utils/request';
import api from '@/services/api.js';
export default {
    namespace: 'global',

    state: {
        collapsed: false,
        data: {}
    },

    effects: {
        *setData ({ payload }, { call, put ,select}) {
            console.log(payload,45454545)
            yield put({
                type: 'save',
                payload: {
                    data: payload
                }
            })
        }
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
    },

    subscriptions: {

    },
};

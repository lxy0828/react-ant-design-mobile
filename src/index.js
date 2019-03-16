import dva from 'dva';
import './index.less';
import './utils/moment';
import VConsole from 'vconsole';
new VConsole()
const app = dva({
    // history: createHistory()
    // models: models,
});
app.router(require('./router').default);
// 5. Start
app.start('#root');

export default app._store;
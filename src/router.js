import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import dynamic from 'dva/dynamic';
import Index from './routes/index';
import Routers from './config/routers';
import { LocaleProvider, List, DatePicker } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
function RouterConfig({ history, app }) {
    return (
        <LocaleProvider locale={enUS}>
        <Router history={history}>
            <Switch>
                {
                    Routers.map(({ path, ...dynamics }, index) => {
                        return <Route
                            key={path}
                            path={path}
                            exact
                            component={dynamic({
                                app,
                                ...dynamics
                            })}
                        />
                    })
                }
                <Index>
                    <Route path="/home" exact component={require("./routes/home").default} />
                    <Route path="/withbai" exact component={require("./routes/home/withbai").default} />
                    <Route path="/my" exact component={require("./routes/home/my").default} />
                </Index>
                <Redirect from="/" to='/my' />
            </Switch>

        </Router>
        </LocaleProvider>
    );
}

export default RouterConfig;
import React, { Component } from 'react';
import { TabBar, Grid } from 'antd-mobile';
import { Link, Switch, Route } from 'dva/router';
import dynamic from 'dva/dynamic';
import Routers from "../config/routers"
// import { getUserId } from '../models/user';
import { goTo } from '../utils/utils';
import './index.less'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '/home',
        };
    }

    componentWillMount() {
        if (!process.env.REACT_APP_hybrid) {
           
        }
        console.log(this.props)
    }

    renderContent = (pageText) => {
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                <Grid
                    data={Routers}
                    activeStyle={false}
                    renderItem={dataItem => (
                        <Link to={dataItem.path} style={{ padding: '12.5px', display: "block" }}>
                            <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                                <span>{dataItem.name}</span>
                            </div>
                        </Link>
                    )}></Grid>
            </div>
        );
    }
    onPress = (selectedTab) => {
        goTo(selectedTab);
        this.setState({ selectedTab })
    }
    render() {
        return (
            <div>
                <div className="index-body">
                    {this.props.children}
                </div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    tabBarPosition="bottom"
                >
                    <TabBar.Item
                        title="首页"
                        key="/home"
                        icon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selectedIcon={<div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                        }
                        selected={this.state.selectedTab === '/home'}
                        onPress={() => this.onPress("/home")}
                    >
                    </TabBar.Item>
                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="用呗"
                        key="/withbai"
                        selected={this.state.selectedTab === '/withbai'}
                        onPress={() => this.onPress("/withbai")}
                    >
                    </TabBar.Item>


                    <TabBar.Item
                        icon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        selectedIcon={
                            <div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat'
                            }}
                            />
                        }
                        title="我的"
                        key="/my/index"
                        selected={this.state.selectedTab === '/my/index'}
                        onPress={() => this.onPress("/my/index")}
                    >
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default Home;

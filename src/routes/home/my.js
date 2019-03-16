import React, { Component } from 'react';
import { connect } from 'dva';
import { Button,Pagination, LocaleProvider, List, DatePicker, WhiteSpace, WingBlank, InputItem,
    Picker, SearchBar, } from 'antd-mobile';
const maxDate = new Date(2018, 11, 3, 22, 0);
const minDate = new Date(2015, 7, 6, 8, 30);
const seasons = [
    [
      {
        label: '2013',
        value: '2013',
      },
      {
        label: '2014',
        value: '2014',
      },
    ],
    [
      {
        label: '春',
        value: '春',
      },
      {
        label: '夏',
        value: '夏',
      },
    ],
  ];
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: '/home',
            verCode: "",
            verifyCode: null,
        };
    }
    componentDidMount () {
        var verifyCode = new window.GVerify("verCode");
        this.setState({ verifyCode });
        console.log(verifyCode,66666666)
    }
    
    clickMe () {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/getPlan'
        })
    }
    
    render() {
        const Page = () => (
            <div>
              <WhiteSpace />
              <List
                className="date-picker-list"
                style={{ backgroundColor: 'white' }}
              >
                <DatePicker
                  mode="date"
                  title="Select date"
                  minDate={minDate}
                  maxDate={maxDate}
                >
                  <List.Item arrow="horizontal">datePicker</List.Item>
                </DatePicker>
                <Picker
                  data={seasons}
                  cascade={false}
                >
                  <List.Item arrow="horizontal">picker</List.Item>
                </Picker>
              </List>
              <WhiteSpace />
              <SearchBar placeholder="Search" showCancelButton />
              <WhiteSpace />
              <InputItem type="money" placeholder="money input" />
            </div>
          );
        return (
            <div>
                <Button type="primary" onClick={this.clickMe.bind(this)}>点我</Button>
                <p className="color666 font16">图形验证码</p>
                <input type="text" className="word-code-input" placeholder="请输入图形验证码" value={this.state.verCode} onChange={e => this.setState({ verCode: e.target.value })} />
                <div style={{width: '300px',height: '100px'}} id="verCode"></div>
                <Page />
            </div>
        );
    }
}

export default connect(({ global, loading }) => {
    console.log(global,888888)
    const { collapsed,data } = global;
    return {
        collapsed,
        data
    }
})(
    Home
);
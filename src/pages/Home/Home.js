import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Button} from 'antd';
// import * as css from 'css/Home.css';
var css = require('../../css/Home.css')
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
				//js实现跳转
				this.props.history.push('/page1');
    }

    render() {
        return (
            <div className={css.footer}>
                this is home~<br/>
                当前计数：{this.state.count}<br/>
                <Button onClick={() => this._handleClick()}>自增</Button>
            </div>
        )
    }
}

export default hot(module)(Home);

import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Bundle from './Bundle';
import Loading from 'components/Loading/Loading';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo';
import NotFound from 'bundle-loader?lazy&name=notFound!pages/NotFound/NotFound';
import Orders from 'bundle-loader?lazy&name=orders!pages/Orders/Orders';
import OrderDetail from 'bundle-loader?lazy&name=orderdetail!pages/OrderDetail/OrderDetail';
import RepairOrders from 'bundle-loader?lazy&name=repairorders!pages/Repair/RepairOrders';
import Platform from 'bundle-loader?lazy&name=platform!pages/Platform/Platform';
import Register from 'bundle-loader?lazy&name=register!pages/Register/Register';
import Service from 'bundle-loader?lazy&name=service!pages/Service/Service';
var common = require('../css/common.css');
const createComponent = (component) => (props) => (
		<Bundle load={component}>
				{
						(Component) => Component ? <Component {...props} /> : <Loading/>
				}
		</Bundle>
);

export default () => (
		<div className={common.screen}>
				<Switch>
						<Route exact path="/" component={createComponent(Home)}/>
						<Route path="/page1" component={createComponent(Page1)}/>
						<Route path="/counter" component={createComponent(Counter)}/>
						<Route path="/userinfo" component={createComponent(UserInfo)}/>
						<Route path="/orders" component={createComponent(Orders)}></Route>
						<Route path="/orderdetail" component={createComponent(OrderDetail)}></Route>
						<Route path="/repairorders" component={createComponent(RepairOrders)}></Route>
						<Route path="/platform" component={createComponent(Platform)}/>
						<Route path="/register" component={createComponent(Register)}/>
						<Route path="/service" component={createComponent(Service)}/>
						<Route component={createComponent(NotFound)}/>
				</Switch>
		</div>
);

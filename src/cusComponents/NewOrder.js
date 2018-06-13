import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ReactDom from 'react-dom';
import {
	IconButton,
	Input,
	InputLabel,
	InputAdornment,
	FormHelperText,
	FormControl,
	TextField,
	MenuItem,
	Visibility,
	VisibilityOff,
	List,
	ListItem
}from '@material-ui/core';
var classNames = require('classnames');
var common = require('../css/common.css');
var css = require('../css/NewOrder.css')
import Button from './Button';
import FlexInput from './FlexInput';
import Select from './Select';
const storeList = [{id:1 ,menuName : '南京西路店'},{id:2 ,menuName : '吴江路店'},{id:3,menuName : '茂名北路店'}];
class NewOrder extends Component {

	constructor(props){
		super(props);
		this.state = {
			title : '',
			storeId : '',
			storeName : '',
			desc : '',
			open : false
		}
	}

	onStoreChange(event){

		console.log(event);
		this.setState({
			storeId : event.id,
			storeName : event.menuName
		})
	}

	render() {
		return (
				<List className={css.list}>
					<ListItem className={classNames(css.item , common.flex, common.vertical, common.justfyend, common.alignstretch)}>
						<FlexInput type='text' label='标题' onChange={(event) => this.setState({title : event.target.value})}></FlexInput>
					</ListItem>

					<ListItem className={classNames(css.item , common.flex, common.vertical, common.justfyend, common.alignstretch)}>
						<FlexInput type='text' label='标题' onChange={(event) => this.setState({title : event.target.value})}></FlexInput>
					</ListItem>

					<ListItem className={classNames(css.item,common.flex, common.vertical, common.justfyend, common.alignstretch)}>
						<Select data={storeList} label='选择店铺' onChange={(event) => this.onStoreChange(event)}></Select>
					</ListItem>

				</List>

		);
	}
}
export default NewOrder;

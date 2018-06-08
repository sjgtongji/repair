import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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
class NewOrder extends Component {

	constructor(props){
		super(props);
		this.state = {
			title : '',
			storeId : '',
			desc : ''
		}
	}

	static propTypes = {
		...Button.propTypes
	}

	static defaulPropTypes = {
		...Button.defaulPropTypes
	}

	render() {
		return (
			// <div className={classNames(css.root, common.flex, common.vertical, common.justfystart, common.alignstretch)}>
				<List className={css.list}>
					<ListItem className={classNames(css.item , common.flex, common.vertical, common.justfyend, common.alignstretch)}>
						<div className={classNames(common.flex, common.vertical, common.justfyend, common.alignstretch)}>
							<FlexInput type='text' label='标题' onChange={(event) => this.setState({title : event.target.value})}></FlexInput>
						</div>

					</ListItem>
					<ListItem className={classNames(css.item , common.flex, common.vertical, common.justfyend, common.alignstretch)}>
						<FlexInput type='text' label='标题' onChange={(event) => this.setState({title : event.target.value})}></FlexInput>
					</ListItem>
				</List>
			// </div>
		);
	}
}
export default NewOrder;

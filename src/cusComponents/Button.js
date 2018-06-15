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
	Button
}from '@material-ui/core';
import * as Constant from '../util/Constant';
import { withStyles } from '@material-ui/core/styles';
class CusButton extends Component {

	constructor(props){
		super(props)
	}

	static propTypes = {
		...Button.propTypes
	}

	static defaulPropTypes = {
		...Button.defaulPropTypes
	}

	render() {
		const {classes , className} = this.props;
		return (
			<Button className={className , classes.root} {...this.props}>
			</Button>
		);
	}
}
const styles = theme => ({
	root : {
		height : Constant.window.height * 0.05
	}
});
export default withStyles(styles)(CusButton);

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import * as Constant from '../../util/Constant';
import {hot} from 'react-hot-loader';
import CallIcon from '@material-ui/icons/Call';
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
	ListItem,
	ListSubheader,
	Typography,
	Button,
	GridList,
	GridListTile,
	GridListTileBar,
	Card,
	CardContent,
}from '@material-ui/core';
class Service extends Component {

		render() {
			const {classes} = this.props;
				return (
						<div className={classes.root}>
							<div className={classes.firstRow}>
								<Typography>客服电话:</Typography>
								<a href="tel:15221946385">15221946385</a>
							</div>

						</div>
				)
		}

		onTel(){
			this.props.history.push('tel:15221946385');
		}
}
const styles = theme => ({
	root : {
		display : 'flex',
		flexDirection : 'column',
		alignItems : 'stretch',
		width : Constant.window.width * 0.8,
		height: Constant.window.height * 0.9,
		paddingTop : Constant.window.height * 0.1,
		paddingLeft : Constant.window.width * 0.1,
		paddingRight : Constant.window.width * 0.1,
		overflowX : 'hidden'
	},
	firstRow : {
		display : 'flex',
		flexDirection : 'row',
		alignItems : 'center',
		width : Constant.window.width * 0.8,
	}
});
export default hot(module)(withStyles(styles)(Service));

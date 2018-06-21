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
	ListItem,
	ListSubheader,
	Typography,
	Button,
	GridList,
	GridListTile,
	GridListTileBar
}from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import SeeIcon from '@material-ui/icons/ZoomIn';
import CrossIcon from '@material-ui/icons/Close';
var classNames = require('classnames');
var common = require('../css/common.css');
var css = require('../css/NewOrder.css')
import FlexInput from './FlexInput';
import Select from './Select';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import * as Constant from '../util/Constant';
const url = 'http://b.hiphotos.baidu.com/image/w%3D310/sign=a439f5b24510b912bfc1f0fff3fdfcb5/83025aafa40f4bfb92c52c5d014f78f0f73618a5.jpg';
const storeList = [{id:1 ,menuName : '南京西路店'},{id:2 ,menuName : '吴江路店'},{id:3,menuName : '茂名北路店'}];
import CusButton from './Button';
import ImgList from './ImgList';

class NewOrder extends Component {

	constructor(props){
		super(props);
		this.state = {
			title : '',
			storeId : '',
			storeName : '',
			desc : '',
			imgList : [{imgId : 1 , imgUrl : url},{imgId : null , imgUrl : ''}],
			submitDisabled : false,
			isZoomed : false,
			zoomUrl : ''
		}
	}

	onStoreChange(event){

		console.log(event);
		this.setState({
			storeId : event.id,
			storeName : event.menuName
		})
	}

	onAdd(){
		console.log('onAdd');
		let length = this.state.imgList.length;
		this.state.imgList.splice(this.state.imgList.length - 1, 0, {imgId : 1 , imgUrl : url});
		this.setState({
			imgList : this.state.imgList
		})
	}

	onDelete(img){
		for(var i = 0 ; i < this.state.imgList.length ; i++){
			if(img == this.state.imgList[i]){
				this.state.imgList.splice(i,1)
				this.setState({
					imgList : this.state.imgList
				})
			}
		}
	}

	onSubmit(){
		console.log('onSubmit');
	}

	onZoom(img){
		this.setState({
			isZoomed : true,
			zoomUrl : url
		})
	}

	onZoomEnd(){
		this.setState({
			isZoomed : false,
			zoomUrl : ''
		})
	}
	render() {
		let imgs = this.state.imgList;
		const {classes} = this.props;
		const {isZoomed} = this.state;


		return (
			<div className={classes.root}>
				{
					isZoomed ?
					<div>
						<img src={url} width={Constant.window.width} height={Constant.window.height} alt=""></img>
						<div className={classes.crossDiv}>
							<IconButton>
								<CrossIcon className={classes.cross} onClick={(event) => this.onZoomEnd()}/>
							</IconButton>
						</div>
					</div>:

					<div className={classes.root}>
						<div className={classes.item}>
							<FlexInput type='text' label='标题' onChange={(event) => this.setState({title : event.target.value})}></FlexInput>
						</div>
						<div className={classNames(classes.item , classes.itemLarge)}>
							<FlexInput type='text' label='问题描述' onChange={(event) => this.setState({desc : event.target.value})} multiline rows={6} rowsMax={6}></FlexInput>
						</div>
						<div className={classes.item}>
							<Select data={storeList} label='选择店铺' onChange={(event) => this.onStoreChange(event)} classes={{root : css.select}}></Select>
						</div>

						<div className={classNames(classes.item , classes.itemSmall)}>
							<Typography color="textSecondary">
								问题图片
							</Typography>
						</div>

						<div className={classes.imgListRoot}>
							<ImgList data={imgs} onDelete={this.onDelete.bind(this)} onAdd={this.onAdd.bind(this)} onZoom={this.onZoom.bind(this)}></ImgList>
						</div>
						<div className={classes.item}>
							<CusButton variant="contained" color="primary" onClick={(event) => this.onSubmit()} disabled={this.state.submitDisabled} className={classes.submit}>
								提交
							</CusButton>
						</div>

					</div>
				}
			</div>

		);
	}
}
const styles = theme => ({
  root: {
    display: 'flex',
		flexDirection : 'column',
    justifyContent: 'flex-start',
		alignItems:'stretch',
		paddingTop : 10,
		paddingLeft : 10,
		paddingRight : 10
  },

  title: {
    color: 'white',
  },
	titleBar: {
		width : Constant.window.width * 0.25,
		height : Constant.window.height * 0.05,
  },
	icon:{
		color : 'white',
		width : 50
	},
	imgRootContainer:{
		flex : 1
	},
	imgRoot:{
		height:300,
		display : 'flex',
		flexDirection : 'column',
		justifyContent : 'flex-start',
		alignItems : 'stretch'
	},
	img:{
		height : Constant.window.height * 0.25,
		width : Constant.window.width * 0.25
	},
	item : {
		height : Constant.window.height * 0.1,
		display : 'flex',
		alignItems : 'center'
	},
	itemSmall : {
		height : Constant.window.height * 0.05,
	},
	itemLarge : {
		height : Constant.window.height * 0.2,
	},
	imgListRoot : {
		height : Constant.window.height * 0.25,
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		overflow: 'hidden',
		backgroundColor: '#eeeeee',
		paddingTop : 10,
		paddingBottom : 10
	},

	submit: {
		flex : 1,
		fontSize : 32
	},
	crossDiv : {
		position : 'absolute',
		height : Constant.window.height * 0.1,
		width : Constant.window.width,
		background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, ' +
			'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
		left : 0,
		right : 0,
		top : 0,
		display : 'flex',
		alignItems : 'center',
	},
	cross : {
		color : 'white',
		width : 100
	},
	emptyImg : {
		display : 'flex',
		justifyContent : 'center',
		alignItems : 'center',
		backgroundColor : 'white',
		flexDirection : 'column'
	}
});
export default withStyles(styles)(NewOrder);

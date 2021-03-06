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
	GridListTileBar,
	Card,
	CardContent,
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
import TitleSelect from './TitleSelect';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
import * as Constant from '../util/Constant';
import * as WXUtil from '../util/WXUtil';
import * as EncodeUtil from '../util/EncodeBase64';
import CusButton from './Button';
import ImgList from './ImgList';
import * as axios from '../util/AxiosUtil';
import {login,getStoreList,viewOrderDetail} from 'actions/user';
import Progress from 'cusComponents/Dialog';
let storeList = [
	{
		storeId : 1,
		storeName : '南京西路'
	},
	{
		storeId : 2,
		storeName : '吴江路'
	},
	{
		storeId : 3,
		storeName : '南京东路'
	},
	{
		storeId : 4,
		storeName : '南京西路'
	},
	{
		storeId : 5,
		storeName : '吴江路'
	},
	{
		storeId : 6,
		storeName : '南京东路'
	}
];
class NewOrder extends Component {

	constructor(props){
		super(props);
		this.state = {
			title : '',
			storeId : '',
			storeName : '',
			desc : '',
			imgList : [{imgId : null , imgUrl : ''}],
			submitDisabled : false,
			isZoomed : false,
			zoomUrl : '',
			imgIds : [],
			showProgress : false
		}
	}

	componentDidMount(){
		// console.log(this.props);
	}
	onStoreChange(event){
		console.log('onStoreChange');
		console.log(event);
		this.setState({
			storeId : event.storeId,
			storeName : event.storeName
		})
	}

	onAdd(item){
		if(Constant.isProd){
			WXUtil.chooseImage(imgIds => {
				console.log(imgIds);
				item.imgId = imgIds[0];
				this.state.imgList.push({imgIds : null});
				this.setState({
					imgList : this.state.imgList,
					showProgress : true
				})
				WXUtil.getImgData(imgIds[0], imgData =>{
					let imgAfterEncode = imgData;
					if(Constant.platform.os === 'android'){
						imgAfterEncode = 'data:image/jpeg;base64,' + imgData;
					}
					axios.post(Constant.uploadImage,
					{
						img : imgAfterEncode
					}, res => {
						this.state.imgIds.push(res.imageId);
						this.setState({
							showProgress : false
						})
					}, error => {
						this.setState({
							showProgress : false
						})
					})
				})
			})
		}

	}

	onDelete(img){
		for(var i = 0 ; i < this.state.imgList.length ; i++){
			if(img == this.state.imgList[i]){
				this.state.imgList.splice(i,1);
				this.setState({
					imgList : this.state.imgList
				})
				if(i < this.state.imgIds.length){
					this.state.imgIds.splice(i , 1);
				}
			}
		}
	}

	validateSubmit(){
		if(!this.state.title){
			alert('请输入标题');
			return false;
		}
		if(!this.state.desc){
			alert('请输入问题描述');
			return false;
		}
		if(!this.state.storeId){
			alert('请选择需要维修的店铺');
			return false;
		}
		return true;
	}
	onSubmit(){
		if(!this.validateSubmit()){
			return;
		}
		if(Constant.isProd){
			this.setState({
				showProgress : true
			})
			let imgIds = [];
			for(var item in this.state.imgList){
				if(item.imgId){
					imgIds.push(item.imgId)
				}
			}
			console.log(this.state.imgIds);
			axios.post(Constant.submitOrder,
			{
				managerId: this.props.user.userId,
				storeId: this.state.storeId,
				title: this.state.title,
				desc: this.state.desc,
				imgs: this.state.imgIds
			}, res => {
				this.setState({
					showProgress : false
				})
				alert('提交订单成功');
				this.props.viewOrderDetail(res.orderId)
				this.props.history.push('/orderdetail');
			}, error => {
				this.setState({
					showProgress : false
				})
			})
		}

	}

	onZoom(img){
		this.setState({
			isZoomed : true,
			zoomUrl : img.imgId
		})
	}

	onZoomEnd(){
		this.setState({
			isZoomed : false,
			zoomUrl : ''
		})
	}
	onTitleChanged(title){
		console.log(title);
		this.setState({
			title : title,
			showOther : title == '其他'
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
						<img src={this.state.zoomUrl} width={Constant.window.width} height={Constant.window.height} alt=""></img>
						<div className={classes.crossDiv}>
							<IconButton>
								<CrossIcon className={classes.cross} onClick={(event) => this.onZoomEnd()}/>
							</IconButton>
						</div>
					</div>:

					<Card className={classes.rootInner}>
						<CardContent>
						<div className={classes.item}>
							<Select data={this.props.user.storeList} label='选择店铺' onChange={(event) => this.onStoreChange(event)}></Select>
						</div>
						<div className={classes.item}>
							<TitleSelect type='text' label='选择问题' onChange={(event) => this.onTitleChanged(event)}></TitleSelect>
							{/* {
								this.state.showOther?
								<Input
					        placeholder="填写其他原因"
					        fullWidth
									onChange={(event) => {console.log( event.target.value); this.setState(title :  event.target.value)}}
					      />:
								null
							} */}
						</div>
						<div className={classNames(classes.item , classes.itemLarge)}>
							<FlexInput type='text' label='问题描述' onChange={(event) => this.setState({desc : event.target.value})} multiline rows={6}></FlexInput>
						</div>


						<div className={classNames(classes.item , classes.itemSmall, classes.marginTop)}>
							<Typography color="textSecondary" variant="subheading">
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
						</CardContent>
					</Card>
				}
				<Progress open={this.state.showProgress}></Progress>
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
		paddingTop : 10
  },
	rootInner : {
		display: 'flex',
		flexDirection : 'column',
    justifyContent: 'flex-start',
		alignItems:'stretch',
		marginLeft: Constant.window.width * 0.05,
		marginRight: Constant.window.width * 0.05,
		marginTop: Constant.window.width * 0.05
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
	},
	marginTop : {
		paddingTop : 20
	},
	itemcolumn : {
		height : Constant.window.height * 0.15,
		display : 'flex',
		alignItems : 'center',
		flexDirection : 'column',
	}
});
const mapStateToProps = (state) => {
		return {
			user : {
				roleCode: state.user.roleCode,
				userId: state.user.userId,
				storeList : state.user.storeList
			}
		}
};

const mapDispatchToProps = (dispatch) => {
		return {
				getStoreList : (storeList) => {
					dispatch(getStoreList(storeList))
				},
				viewOrderDetail : (orderId) => {
					dispatch(viewOrderDetail(orderId))
				}
		}
};
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewOrder));

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
var classNames = require('classnames');
var common = require('../css/common.css');
var css = require('../css/NewOrder.css')
import FlexInput from './FlexInput';
import Select from './Select';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { withStyles } from '@material-ui/core/styles';
const url = 'http://lorempixel.com/250/150/nature/1/';
const storeList = [{id:1 ,menuName : '南京西路店'},{id:2 ,menuName : '吴江路店'},{id:3,menuName : '茂名北路店'}];
const images = [
			{
				original: 'http://lorempixel.com/1000/600/nature/1/',
				thumbnail: 'http://lorempixel.com/250/150/nature/1/',
			},
			{
				original: 'http://lorempixel.com/1000/600/nature/2/',
				thumbnail: 'http://lorempixel.com/250/150/nature/2/'
			},
			{
				original: 'http://lorempixel.com/1000/600/nature/3/',
				thumbnail: 'http://lorempixel.com/250/150/nature/3/'
			}
		]
class NewOrder extends Component {

	constructor(props){
		super(props);
		this.state = {
			title : '',
			storeId : '',
			storeName : '',
			desc : '',
			imgList : [1,2]
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
		this.state.imgList.push(3);
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
	render() {
		let imgs = this.state.imgList;
		const {classes} = this.props;
		// <ListItem>
		// 	<GridList cols={1} spacing={2}>
		// 		{
		// 			imgs.map((item,i) => (
		// 				<GridListTile key={i}>
		// 					<img src={url} className={classes.img}></img>
		// 					<GridListTileBar
		// 						title=''
		// 						titlePosition="top"
		// 						className={classes.titleBar}
		// 						actionIcon={
		// 							<IconButton className={classes.icon} onClick={(event) => this.onDelete(item)}>
		// 								<DeleteIcon />
		// 							</IconButton>
		// 						}
		// 					/>
		// 				</GridListTile>
		// 			))
		// 		}
		// 	</GridList>
		// </ListItem>
		return (
				<List className={classes.root}>
					<ListItem className={classes.item}>
						<FlexInput type='text' label='标题' onChange={(event) => this.setState({title : event.target.value})}></FlexInput>
					</ListItem>
					<ListItem className={classNames(classes.item , classes.itemLarge)}>
						<FlexInput type='text' label='问题描述' onChange={(event) => this.setState({desc : event.target.value})} multiline rows="6"></FlexInput>
					</ListItem>
					<ListItem className={classes.item}>
						<Select data={storeList} label='选择店铺' onChange={(event) => this.onStoreChange(event)} classes={{root : css.select}}></Select>
					</ListItem>

					<ListItem className={classNames(classes.item , classes.itemSmall)}>
						<Typography color="textSecondary">
							问题图片
						</Typography>
					</ListItem>


					<ListItem className={classNames(classes.item , classes.itemSmall)}>
						<Button variant="contained" color="primary" onClick={(event) => this.onAdd()}>
							新增
							<AddIcon />
						</Button>
					</ListItem>
					{
						imgs.map((item,i) => (
							<ListItem className={classes.imgRoot} key={i}>
								<div className={classes.imgRoot}>
									<div className={classes.imgHeader}>
										<IconButton className={classes.icon} onClick={(event) => this.onDelete(item)}>
											<DeleteIcon />
										</IconButton>
									</div>
									<img src={url} className={classes.img}></img>
								</div>
							</ListItem>
						))
					}



				</List>

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
  gridList: {

  },
  title: {
    color: 'white',
  },
	titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
		height: 100
  },
	icon:{
		color: theme.palette.background.paper,
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
	imgHeader:{
		background: 'rgba(0,0,0,0.1)',
		height: 100,
		position: 'relati',
		top: 0,
		left : 0,
		right : 0,
		display:'flex',
		justifyContent : 'flex-end',
		alignItems : 'center'
	},
	img:{
		height : 300
	},
	item : {
		height : 150,
		display : 'flex',
		alignItems : 'center'
	},
	itemSmall : {
		height : 75
	},
	itemLarge : {
		height : 350
	}
});
export default withStyles(styles)(NewOrder);

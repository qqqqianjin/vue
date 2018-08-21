<template>
	<transition name='move'>
		<div class="food" v-show='showFlag' ref='food'>
			<div class="food-content">
				<div class='image-header'>
					<img :src='food.image' class='' alt="">
					<div class='back' @click='hide'>
						<i class='icon-arrow-lift'><</i>
					</div>
				</div>

				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}</span>
					</div>
					<div class="price">
						<span class='now'>{{food.price}}元</span>
						<span class="old" v-show='food.oldPrice'>{{food.oldPrice}}元</span>
					</div>
					<div class="cartcontrol-wrapper">
						<cartcontrol :food='food'></cartcontrol>
					</div>
					<div @click.stop.prevent='addFirst' class="buy" v-show='!food.count || food.count === 0'>加入购物车</div>
				</div>
				<split v-show='food.info'></split>
				<div class='info' v-show='food.info'>
					<h1 class="title">商品信息</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :selectType = 'selectType' :only-content='onlyContent' :desc='desc' :ratings='food.ratings'></ratingselect>
					<div class="rating-wrapper">
						<ul v-show='food.ratings && food.ratings.length'>
							<li v-show='needShow(rating.rateType,rating.text)' class="rating-item" v-for='rating in food.ratings'>
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img width='12' height='12' :src='rating.avatar' alt="" class="avatar">
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span :class='{"icon-thumb_up":rating.rateType===0,"icon-thumb_down":rating.rateType===1}'>
										{{rating.text}}
									</span>
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show='!food.ratings || !food.ratings.length'>暂无数据</div>
						<div >{{count}}</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import BScroll from 'better-scroll-master';
	import vue from 'vue'
	// import vuex from 'vuex'
	import {formatDate} from '@/common/js/date'
	import cartcontrol from '@/components/cartcontrol/cartcontrol'
	import split from '@/components/split/split'
	import ratingselect from '@/components/ratingselect/ratingselect'
	import store from '@/store/store'	//vuex 保存ratingselect的状态


	const POSITIVE = 0;	//好评
	const NEGATIVE = 1;	//差评
	const ALL = 2;		//全部
	export default{
		data(){
			return{
				showFlag:false,
				selectType:ALL,		//评价全部显示
				onlyContent:true,	//有内容的显示
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			}
		},
		store,
		created(){

		},
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			show(){
				this.showFlag = true;
				this.selectType = ALL;		//这两个变量表示每次进入ratingselect页时都被初始化
				this.onlyContent = true;	//
				this.$nextTick(()=>{
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide(){
				this.showFlag = false;
			},
			addFirst(event){
				console.log('!')
				if(!event._constructed){
					return;
				}
				console.log(this.food);
				vue.set(this.food,'count',1);
			},
			needShow(type,text){							//输入为selectType rating.text
				if(this.onlyContent && !text){				//有无内容 有无文本
					return false;
				}
				if(this.selectType === ALL){				//是否显示所有
					return true;
				} else {
					return type === this.selectType;		//将type设置为所输入的selecttype
				}


			}
		},
		computed:{
			count(){
				//将vuex中的属性赋值到该组件的控制属性
				this.selectType = store.state.selectType_count;
				this.onlyContent = store.state.onlyContent_Flag;
				// this.$nextTick(()=>{
				// 	this.scroll.refresh();
				// })

			}
		},
		event:{
			// 'ratingtype.select'(type){
			// 	this.selectType = type;
			// },
			// 'content.toggle'(onlyContent){
			// 	this.onlyContent = onlyContent;
			// }
		},
		filters:{
			formatDate(time){
				let date = new Date(time);

				return formatDate(date,'yyyy-MM--dd hh:mm');
			}
		},
		components:{
			cartcontrol,split,ratingselect
		}
	}
</script>
<style>
	.food{
		padding:0;
		position:fixed;
		left:0;top:0;
		bottom:48px;
		z-index:30;
		width:100%;
		background:#fff;
	}
	.move-enter-active{
		transition:all .3s ease;
	}
	.move-leave-active{
		transition:all .1s linear;
	}
	.move-enter,.move-leave-to{
		transform:translateX(100%);
	}

	.image-header{
		position:relative;
		width:100%;
		height:0;
		padding-top:100%;			
	}
	.image-header img{
		position:absolute;
		top:0;left:0;
		height:100%;width:100%;
	}
	.back{
		position:absolute;
		top:10px;
		left:0;
	}
	.back .icon-arrow-lift{
		display: block;
		padding:10px;
		font-size:20px;
		color:#fff;
	}

	.food .content{
		padding:18px;
		position:relative;
	}
	.food .content .title{
		margin:0;
		font-size:14px;
		line-height:14px;
		margin-bottom:8px;
		font-weight:700;
		color:rgb(7,17,27);
	}
	.food .content .detail{
		margin-bottom:18px;
		line-height:10px;
		height:10px; 
		font-size:0;
	}
	.food .content .detail .sell-count,.food .content .detail .rating{
		font-size:10px;
		color:rgb(147,153,159);
	}
	.food .content .detail .sell-count{
		margin-right:12px; 	
	}
	.food .content .price{
		font-weight: 700;
		line-height: 24px;
	}
	.food .content .now{
		margin-right:8px;
		font-size:14px;
		color:rgb(240,20,20);
	}
	.food .content .old{
		text-decoration:line-through;
		font-size:10px;
		color:rgb(147,153,159);
	}
	.food .cartcontrol-wrapper{
		position:absolute;
		right:12px; bottom:12px;
	}
	.food .buy{
		position:absolute;
		right:18px;
		bottom:18px;
		z-index:10;
		height: 24px;
		line-height:24px;
		padding:0 12px;
		box-sizing:border-box;
		font-size:10px;
		border-radius:12px;
		background-color:rgb(0,160,220);
	}


	.food-content .info{
		padding:18px;
	}
	.food-content .info .title{
		margin: 0;
		line-height:14px;
		margin-bottom:6px;
		font-size:14px;
	}
	.food-content .info .text{
		color:rgb(77,85,93);
		line-height:24px;
		padding:0 8px;
		font-size:12px;
	}

	.food .food-content .rating{
		padding-top:18px;
	}
	.food .food-content .rating .title{
		margin:0;
		line-height:14px;
		margin-left:18px;
		font-size:14px;
		color:rgb(7,17,27);
	}
	

	.food .rating{
		padding-top: 18px;
	}
	.rating .title{
		line-height: 14px;
		margin-left:18px;
		font-size:14px;
		color:rgb(7,17,27);
	}
	.rating .rating-wrapper{
		padding: 0 18px;
	}
	.rating-wrapper .rating-item{
		position:relative;
		padding:16px 0;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.rating-wrapper .no-rating{
		padding:16px 0;
		font-size:12px;
		color:rgb(147,153,159);
	}
	.rating-item .user{
		position:absolute;
		right:0;
		top:16px;
		font-size:0;
		line-height:12px;
	}
	.user .name{
		display: inline-block;
		vertical-align: top;
		margin-right: 6px;
		font-size:10px;
		color:rgb(147,153,159);
	}
	.user .avatar{
		border-radius: 50%
	}
	.rating-item .time{
		margin-bottom: 6px;
		line-height:12px;
		font-size:10px;
		color:rgb(147,153,159);
	}
	.rating-item .text{
		line-height:16px;
		font-size:12px;
		color: rgb(7,17,27);

	}
</style>
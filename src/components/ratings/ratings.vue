<template>
	<div class="ratings" ref='ratings'>
		<div class="ratings-content">
			<div class="overview">
				<div class="overview-left">
					<h1 class="score">{{seller.score}}</h1>
					<div class="title">综合评分</div>
					<div class="rank">高于周围商家{{seller.rankRate}}%</div>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="wrapper-title">服务态度</span>
						<star :size='36' :score='seller.serviceScore'></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class='wrapper-title'>商品评分</span>
						<star :size='36' :score='seller.foodScore'></star>
						<span class="score">{{seller.foodScore}}</span>
					</div>
					<div class="delivery-wrapper">
						<span class="wrapper-title">送达时间</span>
						<span class="delivery">{{seller.deliveryTime}}分</span>
					</div>
				</div>
			</div>
			<split></split>
			<ratingselect :selectType = 'selectType' :only-content='onlyContent' :ratings='ratings' @select='select' @onlyContent='toggleContent'></ratingselect>	
			<div class="rating-wrapper">
				<ul>
					<li v-for='rating in ratings' class='rating-item'>
						<div class="avatar">
							<img :src='rating.avatar' width='28' height='28' alt="">
						</div>
						<div class="content">
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper">
								<star :size='24' :score='rating.score'></star>
								<span class="delivery" >{{rating.deliveryTime}}分钟送达</span>
							</div>
							<p class="text">{{rating.text}}</p>
							<div class="recommend" v-show='rating.recommend && rating.recommend.length'>
								<span class="icon-thumb_up"></span>
								<span class="item" v-for='item in rating.recommend'>{{item}}</span>
							</div>
							<div class="time">
								{{rating.rateTime | formatDate}}
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import star from '@/components/star/star'
	import ratingselect from '@/components/ratingselect/ratingselect'
	import split from '@/components/split/split'
	import BScoll from 'better-scroll-master'
	import {formatDate} from '@/common/js/date'
	import store from '@/store/store'
	const ALL = 2;
	const ERR_OK = true;

	

	export default {
		data(){
			return {
				ratings: [],
				selectType:ALL,
				onlyContent:true 
			}
		},
		created(){
			this.$http.get('http://127.0.0.1:8081/prop.server/ratings').then(function(response){
				if(response.ok === ERR_OK){
					console.log('!')
					this.ratings = response.data;
					this.$nextTick(()=>{
						this.scroll = new BScoll(this.$refs.ratings,function(){
							click:true;
						})
					})
				}
			})
		},
		methods:{
			select(type){
				this.selectType = type;
				this.$nextTick(() => {
				    this.scroll.refresh();
				})
			},
			toggleContent(onlyContent){
				this.onlyContent = !onlyContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
		},
		computed:{
			
		},
		filters:{
			formatDate(time){
				let date = new Date(time)
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		props:{
			seller:{
				type:Object
			}
		},
		components:{ 
			star,ratingselect,split
		}
	};
</script>

<style>
	.ratings{
		position:absolute;
		top:190px;
		bottom:0;
		width:100%;
		left:0;
		overflow:hidden;
	}
	.ratings .overview{
		display: flex;
		padding: 18px 0;
	}
	.overview .overview-left{
		padding: 6px 0 ;
		flex:0 0 137px; 
		border-right: 1px solid rgba(7,17,27,0.1);
		width:137px;
		text-align:center;
	}
	.overview .overview-right{
		flex:1;
		padding-left:12px;
	}
	.overview-left .score{
		margin:0;
		margin-bottom: 6px;
		line-height: 28px;
		font-size: 24px;
		color:rgb(255,153,0);
	}
	.overview .overview-left .title{
		margin:0;
		display: inline-block;	
		margin-bottom: 8px;
		line-height:12px;
		color:rgb(7,17,27);
		font-size:12px;
	}
	.overview-left .rank{

		margin:0;
		font-size: 10px;
		line-height:10px;
		color:rgb(174,153,159);
	}
	.overview-right .score-wrapper{
		line-height:18px;
		margin-bottom:8px;
		font-size:0;
	}
	.overview-right .wrapper-title{
		display: inline-block;
		vertical-align:top;
		font-size:12px;
		color:rgb(7,17,27);
	}
	.overview-right .stars{
		display: inline-block;
		vertical-align:top;
		margin: 0 12px;
	}
	.overview-right .star-item{
		margin-right:1px;
	}
	.overview-right .score{
		display: inline-block;
		vertical-align:top;
		font-size:12px;
		color:rgb(255,153,0);
	}
	.overview-right .delivery-wrapper{
		font-size:0;
	}
	.overview-right .delivery-wrapper .delivery{
		margin-left:12px;
		font-size:12px;
		color:rgb(147,153,159);
	}

	.ratings .ratings-content .rating-wrapper{
		padding:0 18px;
	}
	.rating-wrapper .rating-item{
		display: flex;
		padding:18px 0;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.rating-item .avatar{
		flex:0 0 25px;
		border-radius: 50%;
		margin-right:12px;
	}
	.rating-item .content{
		position: relative;
		flex:1;
	}
	.rating-item .content .name{
		margin-bottom: 4px;
		line-height:12px;
		font-size:10px;
		color: rgb(7,17,27);
	}
	.ratings .rating-item .star-wrapper{
		margin:0 0 6px 0;
		text-align:left;
		font-size:0;
	}
	.ratings .rating-item .star-wrapper .stars{
		margin-right: 12px;
		display:inline-block;
		vertical-align:top;
	}
	.ratings .rating-item .star-wrapper .delivery{
		color:rgb(147,153,159);
		display:inline-block;
		font-size:10px;
		line-height: 12px;
	}

	.ratings .rating-item .text{
		margin-bottom:8px;
		line-height:18px;
		font-size:10px;
	}
	.ratings .rating-item .recommend{
		line-height: 16px;
		font-size:0;
	}
	.ratings .rating-item .recommend .icon-thumb_up ,.rating-item .recommend .item{
		margin:0 8px 4px 0;
		display:inline-block;
		color:rgb(0,160,220);
		font-size:9px;
	}
	.ratings .rating-item .recommend .icon-thumb_up{
		color:rgb(0,160,220);
	}
	.ratings .rating-item .recommend .item{
		padding:0 6px;
		border:1px solid rgba(7,17,27,0.1);
		border-radius:1px;
		color:rgb(147,153,159);
		background-color: #fff;
	}
	.ratings .rating-item .time{
		position:absolute;
		top:0;
		right:0;
		font-size:10px;
		color:rgb(7,17,27);
		font-weight: 200;
	}
</style>
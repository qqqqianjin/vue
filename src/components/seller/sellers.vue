<template>
	<div class="seller" ref='seller'>
		<div class="seller-content" >
			<div class="overview">
				<h1 class="title">{{seller.name}}</h1>
				<div class="desc">
					<star :size='36' :score='seller.score'></star>
					<span class="text">{{seller.ratingCount}}</span>
					<span class="text">月售{{seller.sellCount}}单</span>
				</div>
				<ul class="remark">
					<li class="block">
						<h2>起送价</h2>
						<div class="content">
							<span class="stress">{{seller.minPrice}}元</span>
						</div>
					</li>
					<li class="block">
						<h2>商家配送</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryPrice}}元</span>
						</div>
					</li>
					<li class="block">
						<h2>平均配送时间</h2>
						<div class="content">
							<span class="stress">{{seller.deliveryTime}}分钟</span>
						</div>
					</li>
				</ul>
				<div class="favorite" @click='toggleFavorite'>
					<span class="icon-favorite" :class="{'active':favorite}"></span>
					<span class="text" :class='favoriteMap[Number(!favorite)]'>{{favoriteText}}</span>
				</div>
			</div>
			<split></split>
			<div class="bulletin">
				<h1 class="title">公告与活动</h1>
				<div class="content-wrapper">
					<p class="content">{{seller.bulletin}}</p>
				</div>
				<ul class="support" v-if='seller.supports'>
					<li class="support-item" v-for='(item,index) in seller.supports'>
						<span class="icon" :class='classMap[seller.supports[index].type]'></span>
						<span class="text">{{seller.supports[index].description}}</span>
					</li>
				</ul>
			</div>
			<split></split>
			<div class="pics">
				<h1 class="title">商家实景</h1>
				<div class="picwrapper" ref='picWrapper'>
					<ul class="picwrapper" ref='picList'>
						<li class="pic-item" v-for='pic in seller.pics'>
							<img width='120' height='90' :src='pic'></span>
						</li>
					</ul>
				</div>
				
			</div>
			<split></split>
			<div class="info">
				<h1 class="title">商家信息</h1>
				<ul>
					<li class="info-item" v-for='info in seller.infos'>{{info}}</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll-master';
	import star from '@/components/star/star'
	import split from '@/components/split/split'
	import {saveToLocal,loadFromLocal} from '@/common/js/date'
	export default {
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				classMap:['decrease','discount','guarantee','invoice','special'],
				favoriteMap:['_favorite','_nofavorite'],
				favorite:(()=>{
					let result = loadFromLocal(this.seller.id,'favorite');
					return result;
				})()
			}
		},
		computed:{
			favoriteText(){
				return this.favorite ?'已收藏':'未收藏'
			}
		},
		created(){
			// this.classMap = ['decrease','discount','guarantee','invoice','special'];
		},
		watch:{
			'seller'(){
				this.$nextTick(()=>{
					this._picsScroll();
				})
			}
		},
		mounted(){
			this._initScroll();
			this._picsScroll()
		},
		components:{
			star,split
		},
		methods:{
			_initScroll(){
				this.scroll = new BScroll(this.$refs.seller,{
					click:true
				});
			},
			_picsScroll(){
				if(this.seller.pics){
					let picWidth = 120;
					let margin=6;
					let width = (picWidth+margin)*this.seller.pics.length;
					this.$refs.picList.style.width=width+'px';
					this.picScroll = new BScroll(this.$refs.picWrapper,{
						scrollX:true,
						eventPassthrough: 'vertical'
					})
				}
			},
			toggleFavorite(event){
				if(!event._constructed){
					return;
				}
				this.favorite = !this.favorite;
				saveToLocal(this.seller.id,'favorite',this.favorite);
				/*
				this.favoriteFlag = Number(this.favorite);
				console.log(this.favoriteFlag)*/
			}
		}
	} 
</script>

<style>
	.seller{
		position:absolute;
		top:190px;
		bottom:0;
		width:100%;
		overflow:hidden;
	}
	.seller .overview{
		padding:18px;
	}
	.seller .overview .title{
		margin:0;padding:0;
		margin-bottom:8px;
		display:block;
		font-size:14px;
		color:rgb(7,17,27);
		line-height:14px;
	}
	.seller .overview .desc{
		padding-bottom: 18px;
		border-bottom:1px solid rgb(7,17,27,0.1);
		
		font-size:0;
	}
	.seller .overview .desc .stars{
		display:inline-block;
		margin-right: 8px;
		vertical-align:top;
	}
	.seller .overview .desc .text{
		display:inline-block;
		margin-right:12px;
		vertical-align:top;
		line-height: 18px;
		font-size:10px;
		line-height: 18px;
		color:rgb(77,85,93);
	}
	.seller .overview .remark{
		display:flex;
		padding-top:18px;
	}
	.seller .overview .remark .block{
		flex:1;
		text-align:center;
		border-right: 1px solid rgba(7,17,27,0.1);
	}
	.seller .overview .remark .block:last-child{
		border-right:0;
	}
	.seller .overview .remark .block h2{
		margin-bottom:4px;
		line-height:10px;
		font-size:10px;
		color:rgb(174,153,159);
	}
	.seller .overview .remark .block .content{
		font-size:18px;
		font-weight:200;
		color:rgb(7,17,27);
		line-height:24px;
	}
	.seller .overview .favorite{
		position:absolute;
		right:18px;
		top:18px;
		width:50px;
		text-align:center;
	}
	.seller .overview .favorite .icon-favorite{
		display:block;
		margin-bottom: 4px;
		line-height: 24px;
		font-size:24px;
		color:#d4d6d9;
	}
	.seller .overview .favorite .text{
		display: block;
		height:20px;width:40px;
		border-radius: 15%;
		line-height:20px;
		font-size:10px;
		color:#fff;
		background-color:#d4d6d9;
	}
	.seller .overview .favorite ._favorite{
		background: rgb(240,20,20);
	}
	.seller .overview .favorite ._nofavorite{
		background-color:#d4d6d9;
	}
	/* ---------------------------------------- */
	.seller .bulletin{
		padding:18px 18px 0 18px;
	}
	.seller .bulletin .title{
		margin:0 0 8px 0;
		line-height:14px;
		color:rgb(7,17,27);
		font-size:14px;
	}
	.seller .bulletin .content-wrapper{
		padding:0 0px 16px ;
		border-bottom:1px solid rgba(7,17,27,0.1);
		font-size:12px;
	}
	.seller .bulletin .content-wrapper p{
		color:rgb(240,20,20);
		font-weight:400;
		line-height:24px;
	}

	.seller .bulletin .support .support-item{
		padding:8px 12px;
		border-bottom:1px solid rgba(7,17,27,0.1);
		font-size:0;
	}
	.seller .bulletin .support .support-item:last-child{
		border:none;
	}
	.seller .bulletin .support .support-item .icon{
		display:inline-block;
		width:16px;height:16px;
		vertical-align:top;
		margin-right:6px;
		background-size:16px 16px;
		background-repeat:no-repeat;
	}
	.decrease{
		background-image: url('./img/decrease_1@3x.png');
	}
	.discount{
		background: url('./img/discount_1@2x.png')0 0 no-repeat;
	}
	.guarantee{
		background: url('./img/guarantee_1@2x.png')0 0 no-repeat;
	}
	.invoice{
		background: url('./img/invoice_1@2x.png')0 0 no-repeat;
	}
	.special{
		background: url('./img/special_1@2x.png')0 0 no-repeat;
	}
	.seller .bulletin .support .support-item .text{
		line-height:16px;
		font-size:12px;
	}
	.seller .pics{
		padding:18px 0 18px 18px;
	}
	.seller .pics .title{
		margin:0;
		color:rgb(7,17,27);
		font-size:14px;
		line-height:14px;
		font-weight:800;
		margin-bottom: 8px;
	}
	.seller .pics .picwrapper{
		width:100%;
		overflow:hidden;
		white-space: nowrap;
	}
	.seller .pics .picwrapper .pic-list{
		font-size:0;
	}
	.seller .pics .picwrapper  .pic-item{
		display:inline-block;
		margin-right:6px;
		width:120px;
		height:90px;
	}
	.seller	.info{
		padding:18px 18px 0 18px;
	}
	.seller .info .title{
		margin:0;
		color:rgb(7,17,27);
		font-size:14px;
		line-height:14px;
		font-weight:800;
		padding-bottom: 8px;
		
	}
	.seller	.info .info-item{
		padding:16px 12px;
		font-size:12px;
		line-height:16px;
		font-weight:200;
		color:rgb(7,17,27);
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
</style>
<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img v-bind:src="seller.avatar" width='64' height='64' alt="">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
				<div v-if='seller.supports' class='support'>
					<span class="icon" v-bind:class='classMap[seller.supports[0].type]'></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="support-count" v-if='seller.supports' v-on:click='showDetail()'>
				<span class="count">{{ seller.supports.length }}个</span>
				<i class="icon-keyboard_arrow_right">></i>
			</div>
		</div>
		<div class="bulletin-wrapper" v-on:click='showDetail()'>
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img v-bind:src="seller.avatar"  width='100%' height='100%' alt="">
		</div>
		<transition name='fade'>
			<div class="detail" v-show='detailShow' >
			<div class="detail-wrapper clearfix">
				<div class="detail-main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star v-bind:size='48' v-bind:score='seller.score'></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul v-if='seller.supports' class='supports'>
						<li class="support-item" v-for='item in seller.supports'>
							<span class="icon" v-bind:class='classMap[item.type]'>1</span>
							<span class="text">{{ item.description }}</span>
						</li>
					</ul>

					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin">
						<p class="content">{{seller.bulletin}}</p>
					</div>
				</div>
			</div>
			<div class="detail-close" v-on:click='hideDetail' >
				<span class="icon-close" v-bind:class='showDetail'>X</span>
			</div>
		</div>
		</transition>
		
	</div>
</template>

<script>
	import star from '@/components/star/star';
	export default {
		name : 'header',
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				detailShow:false
			}
		},
		methods:{
			showDetail:function(){
				this.detailShow = true;
			},
			hideDetail:function(){
				this.detailShow = false;
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
		},
		components:{
			star
		}
	};
</script>

<!-- <style lang='stylus' rel='stylesheet/stylus'> -->
<style>
	.header{
		color:#fff;
		background:rgba(7,17,27,0.5);
		position:relative;
		overflow:hidden;
	}
	.header .content-wrapper{
		padding:24px 12px 18px 24px;
		font-size:0;
		position:relative;
	}
	.header .content-wrapper .avatar{
		display: inline-block;
		vertical-align: top;
	}
	.header .content-wrapper .avatar img{
		border-radius:2px;
	}
	.header .content-wrapper .content{
		display: inline-block;
		margin-left:14px;
		font-size:14px;
	}
	.header .content-wrapper .content .title{
		margin:2px 0 8px 0;
	}
	.header .content-wrapper .content .title .brand{
		display:inline-block;
		vertical-align:top;
		width:30px;height:18px;
		/*background: url('./img/brand@2x.png') 0 0 no-repeat;*/
		background-image:url('./img/brand@2x.png');
		@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)
			background-image:url('./img/brand@3x.png');
		background-size:30px 18px;
		background-repeat:no-repeat;
	}
	.header .content-wrapper .content .title .name{
		margin-left:6px;
		font-size:16px;
		line-height: 18px;
		font-weight: bold;
	}
	.header .content-wrapper .content .description{
		margin-bottom:10px;
		line-height:12px;
		font-size:12px;
	}
	.header .content-wrapper .content .support .icon{
		display:inline-block;
		width:12px;height:12px;
		margin-right:4px;
		background-size:12px 12px;
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
	.text{
		font-size:12px;
		line-height:12px;
	}
	.support-count{
		position:absolute;
		right:12px;bottom:18px;
		padding:0 8px;
		height:24px;
		line-height:24px;
		border-radius:14px;
		background:rgba(0,0,0,0.2);
		text-align:center;
	}
	.support-count .count{
		vertical-align:top;
		font-size:10px;
	}
	.support-count .icon-keyboard_arrow_right{
		margin-left:2px;
		font-size:10px;
		line-height:24px;
	}
	.bulletin-wrapper{
		height:28px;
		line-height:28px;
		padding:0 22px 0 12px;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
		background-color:rgba(7,17,27,0.2);
	}
	.bulletin-wrapper .bulletin-title{
		display:inline-block;
		vertical-align:top;
		width:22px;
		height:12px;
		background-image:url('./img/bulletin@2x.png');
		background-size:22px 12px;
		background-repeat:no-repeat;
		margin-top:9px;
	}
	.bulletin-wrapper .bulletin-text{
		font-size:10px;
		margin:0 4px;
	}
	.header .background{
		position:absolute;
		z-index:-1;
		top:0;left:0;
		width:100%;height:100%;
		filter:blur(5px);
	}
	.header .detail{
		position:fixed;
		z-index:100;
		width:100%;height:100%;
		overflow:auto;
		top:0;right:0;
		background:rgba(7,17,27,0.8);
		transition-duration: 0.5s;
		backdrop-filter:blur(10px);
	}
	/* detail anima */
	.detail .fade-transition {
		opacity:1;
	}
	.fade-enter,.fade-leave{
		opacity:0;
		background:rgba(7,17,27,0);

	}

	.clearfix{
		display:inline-block;
	}
	.clearfix :after{
		display:block;
		content:'.';
		height:0;
		line-height:0;
		clear:both;
		visibility:hidden;
	}
	.detail-wrapper{
		min-height:100%;width:100%;
	}
	.detail-wrapper .detail-main{
		margin-top:64px;
		padding-bottom:64px;
	}
	.detail .detail-close{
		position:relative;
		width:32px;height:32px;
		margin: -64px auto 0 auto;
		clear:both;
		font-size:32px;
		font-weight:normal;
		text-align:center;
	}
	.icon-close{
		text-align:center;
		display:block;
	}
	.detail-wrapper .name{
		line-height:16px;text-align:center;font-size:16px;font-weight:700;
	}
	.star-wrapper{
		margin-top:18px;
		padding:2px 0;
		text-align:center;
	}
	.title {
		display:flex;
		width:80%;
		margin:28px auto 24px auto;
	}
	.title .line{
		flex :1;
		position:relative;
		top:-6px;
		border-bottom:1px solid rgba(255,255,255,0.2);
	}
	.title .text{
		padding:0 12px;
		font-weight:700;
		font-size: 14px;
	}
	.supports{
		width:80%;
		margin:0 auto;
	}
	.supports .support-item{
		padding:0 12px;
		margin-bottom: 12px;
		font-size:0;
	}
	.supports .support-item :last-child {
		margin-bottom : 0;
	}
	.supports .icon {
		display:inline-block;
		width:16px;height:16px;
		vertical-align:top;
		margin-right:6px;
		background-size:16px 16px;
		background-repeat:no-repeat;
	}
	.supports .text {
		line-height:16px;
	}
	.bulletin {
		width:80%;
		margin:0 auto;
	}
	.bulletin .content{
		padding:0 12px;
		line-height:24px;
		font-size:12px;
	}
	
</style>
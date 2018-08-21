<template>
	<div class="shopCartBox">
		<div class="shopcart">
		<div class="content" @click='toggleList'>
			<div class="content-left" >
				<div class="logo-wrapper">
					<div class="logo" :class="{'highlight':totalCount>0}">
						<span class='icon-shopping_cart'></span>
					</div>
					<div class="num" v-show='totalCount>0'>{{totalCount}}</div>
				</div>
				<div class="price">
					<span :class="{'highlight':totalPrice>0}">{{totalPrice}}元</span>
				</div>
				<div class="desc">
					需配送费{{deliveryPrice}}元
				</div>
			</div>
			<div class="content-right" @click.stop='pay'>
				<div class="pay" :class='payClass'>
					{{payDesc}}
				</div>
			</div>
		</div>
		<div class="ball-container">
			<!-- <transition name='drop'>
				<div v-for='ball in balls' v-show='ball.show' class='ball'>
					<div class="inner">
					</div>
				</div>
			</transition> -->
		</div>
		<transition name='fold'>
		<div class="showcart-list" v-show='listShow' transition='fold'>
			
				<div class="list-header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click='empty' >清空</span>
				</div>
				<div class="list-content" ref='listContent'>
					<ul>
						<li class="food" v-for='food in selectFood'>
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>{{food.price*food.count}}元</span>
							</div>
							<div class="cartcontrol-wrapper">
								<cartcontrol :food='food'>

								</cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			
			<!-- <div class="list-header">
				<h1 class="title">购物车</h1>
				<span class="empty" @click='empty'>清空</span>
			</div>
			<div class="list-content" ref='listContent'>
				<ul>
					<li class="food" v-for='food in selectFood'>
						<span class="name">{{food.name}}</span>
						<div class="price">
							<span>{{food.price*food.count}}元</span>
						</div>
						<div class="cartcontrol-wrapper">
							<cartcontrol :food='food'>

							</cartcontrol>
						</div>
					</li>
				</ul>
			</div> -->
		</div>
		</transition>
	</div>
	<div class="list-mask" v-show='listShow' @click='hideList'></div>
	</div>
	
</template>

<script type='text/ecmascript-6'>
	import BScroll from 'better-scroll-master';
	import cartcontrol from '@/components/cartcontrol/cartcontrol';
	export default {
		data(){
			return {
				balls : [
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				},
				{
					show:false
				}
				],
				dropBalls:[],
				fold:true,
				shopcartList:document.getElementsByClassName('showcart-list')[0]
			}
		},
		props:{
			selectFood:{
				type:Array,
				default(){
					return[{price:10,count:2}];
				}
			},
			deliveryPrice:{
				type:Number,
				default:0
			},
			minPrice:{
				type:Number,
				default:0
			}
		},
		computed:{
			//总价
			totalPrice(){
				let total = 0;
				this.selectFood.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			//总数量
			totalCount(){
				let count = 0;
				 this.selectFood.forEach((food)=>{
				 	count += food.count;
				 })
				 return count;
			},
			//结算文本控制
			payDesc(){
				let dif = this.minPrice-this.totalPrice;
				if(this.totalPrice===0){
					return `${this.minPrice}元起送`;
				}else if(this.totalPrice<this.minPrice){
					return `还差${dif}元起送`
				}else{
					return `去结算`;
				}
			},
			//结算按钮控制可否点击
			payClass(){
				if(this.totalPrice<this.minPrice){
					return 'not-enough';
				}else{
					return 'enough';
				}
			},
			listShow(){
				if(!this.totalCount){ 		//当=0时 
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show){
					this.$nextTick(()=>{
						if(!this.scroll){
							console.log('!');
							this.scroll = new BScroll(this.$refs.listContent,{
								click:true
							});
						}else{
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods:{
			drop(el){

			},
			toggleList(){
				if(!this.totalCount){
					return; 	
				}
				this.fold = !this.fold;
			},
			empty(){
				this.selectFood.forEach((food)=>{
					food.count = 0;
				})
			},
			hideList(){
				this.fold = true;
			},
			pay(){
				if(this.totalPrice < this.minPrice){
					return;
				}
				window.alert(`支付${this.totalPrice}元`);
			}
		},
		components:{
			cartcontrol
		}
	};
</script>

<style>
	.shopcart{
		height:48px;width:100%;
		position:fixed;
		left:0;bottom:0;
		z-index:50;
	}
	.list-mask{
		position:fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background-color:rgba(7,17,27,0.6);
		background:blur(10px);
		z-index: 40;
	}
	.shopcart .content{
		display:flex;
		background:#141d27;
		font-size:0;
	}
	.shopcart .content-left{
		flex:1;
	}
	.shopcart .content-left .logo-wrapper{
		display: inline-block;
		height:100%;width:100%;
		position:relative;
		top:-10px;
		margin:0 12px;padding:6px;
		height:56px;width:56px;
		box-sizing:border-box;
		vertical-align: top;
		border-radius:50%;
		background-color:#141d27;
	}
	.logo-wrapper .logo{
		height:100%;width:100%;
		border-radius:50%;
		background:#2b343c;
		float:left;
	}
	.content-left .highlight,.price .highlight{
		color:#fff;
	}
	.logo-wrapper .num{
		position:absolute;
		top:0;
		right:0;
		width:24px;height:16px;
		line-height:16px;
		text-align:center;
		border-radius:16px;
		font-size:9px;
		font-weight:700;
		color:#fff;
		background-color:rgb(240,20,20);
		box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
	}
	.icon-shopping_cart{
		font-size: 24px;
		color:#80858a;
		line-height:44px;
		text-align:center;
	}
	.shopcart .content-left .price{
		display: inline-block;
		vertical-align:top;
		line-height:24px;
		margin-top: 12px;
		box-sizing:border-box;
		padding-right:12px;
		border-right: 1px solid rgba(255,255,255,0.1);
		color:rgba(255,255,255,0.5);
		font-size:14px;
		font-weight:700;
	}
	.shopcart .content-left .desc{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin: 12px 0 0 12px;
		font-size:10px;
		color:rgba(255,255,255,0.4);
		
	}
	.shopcart .content-right{
		flex:0 0 105px;
		width:105px;
		background-color:#2b333b;
	}
	.content-right .pay{
		height:48px;
		line-height: 48px;
		text-align:center;
		font-size:12px;
		color:rgba(255,255,255,0.4);
	}
	.content-right .not-enough{
		background: #2b333b;
	}
	.content-right .enough{
		background:#00b43b;
		color:#fff;
	}
	.ball-container{

	}
	.ball{
		position:fixed;
		left:32px;
		bottom:22px;
		z-index:200;
	}
	.inner{
		height:16px;width:16px;
		border-radius:50%;
		background:rgb(0,160,220);
		transition:all 0.4s;
	}


	.showcart-list{
		position: absolute;
		z-index:-1;
		bottom:48px;
		left:0;
		width:100%;

	}
	.fold-enter-active,.fold-leave-active{
		transition:all 0.5s;
	}
	.fold-enter,.fold-leave-to{
		transform:translate3D(0,100%,0);
		opacity: 0; 
	}


	.list-header{
		height:40px;
		line-height:40px;
		padding:0 18px;
		background-color:#f3f5f7;
		border-bottom:1px solid rgba(7,17,27,0.1);

	}
	.list-header .title{
		float:left;
		font-size:14px;
		color:rgb(7,17,27);
		margin:auto 0;
	}
	.list-header .empty{
		float:right;
		font-size:12px;
		color:rgb(0,60,220);
	}

	.list-content{
		padding:0 18px;
		max-height: 217px;
		background-color: #fff;
		overflow: hidden;
	}
	.list-content .food{
		position:relative;
		padding:12px 0;
		box-sizing:border-box;
		border-bottom:1px solid rgba(7,17,27,0.1);
	}
	.list-content .food .name{
		line-height:24px;
		font-size:14px;
		color:rgb(7,17,27);
	}
	.list-content .food .price{
		position:absolute;
		right:90px;
		bottom:12px;
		line-height: 24px;
		font-size: 14px;
		font-weight: 700;
		color:rgb(240,20,20);
	}
	.list-content .food .cartcontrol-wrapper{
		position:absolute;
		right: 0;
		bottom:6px;
	}
</style>
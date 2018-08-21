<template>
	<div class="goods">
		<div class="menu-wrapper" ref='menuWrapper'>
			<ul>
				<li  v-for='(item,index) in this.goods' class='menu-item' :class="{'current':currentIndex===index}" v-on:click='selectMenu(index,$event)'>
					<span class='text'>
						<span v-show='item.type>0' class='icon' v-bind:class='classMap[item.type]'></span>
						{{ item.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref='foodWrapper'>
			<ul>
				<li v-for='item in this.goods' class='food-list food-list-hook'>
					<h1 class='goods-title'>{{ item.name }}</h1>
					<ul>
						<li @click='selectFood(food,$event)' v-for='food in item.foods' class='food-item'>
							<div class="icon">
								<img v-bind:src='food.icon' width='57' height='57'>
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class='count'>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class='now'>${{food.price}}</span><span v-show='food.oldPrice' class='old'>${{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol @click.stop='selectFood(food,$event)' :food='food'></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :selectFood = 'selectFoods' :deliveryPrice="seller.deliveryPrice" :min-price='seller.minPrice'></shopcart>
		<food :food='selectedFood' ref='food'></food>
	</div>
</template>

<script>
	import BScroll from 'better-scroll-master';
	import shopcart from '@/components/shopcart/shopcart';
	import cartcontrol from '@/components/cartcontrol/cartcontrol';
	import food from '@/components/food/food';
	const ERR_OK = true;

	export default{
		props:{
			seller:{
				type:Object
			}
		},
		components:{
			shopcart,cartcontrol,food
		},
		data(){
			return {
				goods : [],
				listHeight : [],  //每个区间高度,需要一个数组
				scrollY:0,         //跟踪变量
				selectedFood:{}
			}
		},
		computed:{
			currentIndex(){
				for(let y = 0;y<this.listHeight.length;y++){
					let height = this.listHeight[y];
					let height1 = this.listHeight[y+1];
					if(!height1 || (this.scrollY >= height && this.scrollY < height1)){  //检测在哪个区间 当最后一个区间时无height1 
						return y;
					}
				}
				return 0;
			},
			selectFoods(){

				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if(food.count){
							foods.push(food);
						}
					})
				})
				return foods;
			}
		},
		created(){
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$http.get('http://127.0.0.1:8081/prop.server/goods').then((response)=>{
				this.goods = response.body;
				if(response.ok === ERR_OK){
					this.goods = response.data;
					this.$nextTick(() => {
						this._initScroll();
						this._calculateHeight();
					});
				}
			});
		},
		methods: {
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				this.foodsScroll = new BScroll(this.$refs.foodWrapper,{
					click:true,
					probeType:3   //滚动探针
				});

				this.foodsScroll.on('scroll',(pos) => {				//监听事件
					this.scrollY = Math.abs(Math.round(pos.y));		//abs 绝对值 round 
				})
			},
			_calculateHeight(){
				/*console.log(this.$refs.foodWrapper)
				var foodsArray = Array.of(Array.of(this.$refs.foodWrapper)[0].children[0].children)[0];
				console.log(foodsArray);
				for(let i = 0;i<foodsArray.length;i++){
					// console.log(foodsArray[i])
				}*/

				let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				let height = 0;
				this.listHeight.push(height)
				console.log(this.listHeight);
				for(let i =0;i<foodList.length;i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			},
			selectMenu(index,event){
				let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,300);
			},
			_drop(target){
				
			},
			selectFood(food,event){
				console.log('selectFood')
				if(!event._constructed){
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();//在组件中用v-ref命名,在methods中调用内组件方法
			}
		},
		events:{
			'cart.add'(target){
				this.drop(target)
			}
		}
	};
</script>

<style>
	.goods{
		display:flex;
		overflow:hidden;
		position:absolute;
		width:100%;
		top:192px;
		bottom:46px;
	}
	.menu-wrapper{
		flex: 0 0 80px; 	/* flex: flex-grow flex-shrink flex-basis */
		width:80px;
		background:#f3f5f7;
	}
	.menu-wrapper .menu-item{
		display:table;
		height:54px;width:56px;
		line-height:14px;
		font-size:;
		padding:0 12px;
	}
	.menu-item .icon{
		display:inline-block;
		vertical-align: top;
		width:12px;height:12px;
		margin-right:2px;
		background-size:12px 12px;
		background-repeat:no-repeat;
	}
	.decrease{
		background-image: url('./img/decrease_3@3x.png');
	}
	.discount{
		background: url('./img/discount_3@2x.png')0 0 no-repeat;
	}
	.guarantee{
		background: url('./img/guarantee_3@2x.png')0 0 no-repeat;
	}
	.invoice{
		background: url('./img/invoice_3@2x.png')0 0 no-repeat;
	}
	.special{
		background: url('./img/special_3@2x.png')0 0 no-repeat;
	}
	.menu-item .text{
		font-size:12px;
		display:table-cell;
		width:56px;
		vertical-align:middle;
		border:1px rgba(7,17,27,0.1);
	}
	.foods-wrapper{
		flex-grow:1;
	}
	.goods-title{
		padding-left:14px;
		height:26px;
		width:100%;
		line-height:26px;
		border-left:2px solid #d9dde1;
		font-size:12px;
		color:rgb(147,153,159);
		background:#f3f5f7;
	}
	
	.food-item{
		margin:18px;
		display:flex;
		/*padding-bottom:18px;*/
		border-bottom:1px solid rgb(7,17,27,0.1);
	}
	/* .food-item :last-child{
		border-bottom:0px;
		margin-bottom:0;
	} */
	.food-item .icon{
		flex:0 0 57px;
		margin-right:10px;
	}
	.food-item .content{
		flex:1;
		position:relative;
	}
	.food-item .name{
		font-size:14px;
		color:rgb(7,17,27);
		line-height:14px;
		height:14px;
		margin:2px 0 8px 0;
		font-weight:bold;
	}
	.food-item .desc{
		margin-bottom:8px;
		line-height:13px;
		font-size:10px;
		color: rgb(147,153,159);
	}
	.food-item .extra {
		line-height:10px;
		color:rgb(147,153,159);
	}
	.extra .count{
		margin-right:5px;
	}
	.price{
		font-weight:700;
		line-height:24px;
	}
	.price .now{
		margin-right:8px;
		font-size:14px;
		color:rgb(240,20,20);
	}
	.price .old{
		text-decoration:line-through;
		color:rgb(147,153,159);
		font-size:10px;
	}
	.current{
		position:relative;
		margin-top:-1px;
		z-index:10;
		background:#fff;
		font-weight:700;
	}
	.current .text{
		border: none;
	}
	.cartcontrol-wrapper{
		position:absolute;
		right:0;
		bottom:0px;
	}
</style>
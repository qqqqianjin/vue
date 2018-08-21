<template>
	<div class='cartcontrol'>
		<div class="cart-decrease" v-show='food.count>0' v-on:click.stop.prevent='decreaseCart' >
				<span class='inner'>-</span>
		</div>
		<div class="cart-count" v-show='food.count>0'>{{this.food.count}}</div>
		<div class="cart-add" v-on:click.stop.prevent='addCart'>+</div>
	</div>
</template>

<script >
	import vue from 'vue';
	export default{
		props:{
			food:{
				type:Object
			}
		},
		created(){
		},
		methods:{
			addCart(event){
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					vue.set(this.food,'count',1)
				}else{
					this.food.count++;
				}
				console.log(this.food.count+' : '+this.food.name);
				this.dis
			},
			decreaseCart(event){
				if(!event._constructed){
					return;
				}
				if(this.food.count===0){

				}else{
					this.food.count--;
				}
			}

		}

	};
</script>

<style>
	.cartcontrol{
		font-size:0;
	}
	.cart-decrease,.cart-add{
		display: inline-block;
		padding:6px;
	}
	.move-enter-active{
		/*transition:all .3s ease;*/
		transition:all 0.5 ease 0;
		
	}
	.move-leave-active{
		transition:all .8s cubic-bezier(1.0,0.5,0.8,1.0);
	}
	.move-enter .move-leave-to{
		transform:translateX(10px);
		opacity:0;
	}
	.cart-decrease .inner{
		display: block;
		font-size:24px;line-height:24px;
		color:#fff;
		line-height:12px;
		text-align:center;/* 
		transition: all 5s linear;
		transform:rotate(0); */
	}
	.cart-count{
		display: inline-block;
		font-size:10px;
		vertical-align:bottom;
		width:12px;
		line-height: 29px;
		text-align:center;
		color:rgb(147,153,159);
	}
	.cart-add{
		display:inline-block;
		box-sizing:border-box;
		font-size:24px;line-height:24px;
		color:rgb(0,160,220);
	}
</style>
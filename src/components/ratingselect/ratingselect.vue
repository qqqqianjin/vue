<template>
	<div class="ratingselect">
		<div class="rating-type">
			<span class='block positive' @click='select(2,$event)' :class="{'active':selectType===2}">{{desc.all}}
				<span class="count">{{ratings.length}}</span>
			</span>
			<span class='block positive' @click='select(0,$event)' :class="{'active':selectType===0}">{{desc.positive}}
				<span class="count">{{positives.length}}</span>
			</span>
			<span class='block negative' @click='select(1,$event)' :class="{'active':selectType===1}">{{desc.negative}}
				<span class="count">{{negatives.length}}</span>
			</span>
		</div>
		<div class="switch" @click='toggleContent' :class='{"on":onlyContent}'>
			<span class='clickY'>√</span>
			<span class='text'>只看有内容的评价</span>
		</div>
	</div>
</template>
<script>
	const POSITIVE = 0;	//好评
	const NEGATIVE = 1;	//差评
	const ALL = 2;		//全部

	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selectType:{
				type:Number,
				default:ALL
			},
			onlyContent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return {
						all:'全部',
						positive:'满意',
						negative:'不满意'
					}
				}
			}
		},
		created(){
			console.log('created')
		},
		computed:{
			positives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType === POSITIVE;
				})
			},
			negatives(){
				return this.ratings.filter((rating)=>{
					return rating.rateType === NEGATIVE;
				})
			}
		},
		methods:{
			select(type,event){
				if(!event._constructed){
					return;
				}
				this.$store.state.selectType_count = type;
				console.log(this.$store.state.selectType_count)
				// this.selectType = type;	//子组件不能修改父组件通过prop传导过来的数据.
				// this.$dispatch('ratingtype.select',type);//!!!现已被淘汰 实用vuex实现父子组件,兄弟组件通信  子组件只能通过props接收父组件数据,当子组件修改数据时需要通过$dispatch通知父组件 
			},
			toggleContent(event){
				if(!event._constructed){
					return;
				}
				this.$store.state.onlyContent_Flag = !this.onlyContent;
				console.log(this.$store.state.onlyContent_Flag)
			}
		}
	}
</script>
<style>
	.ratingselect{

	}
	.rating-type{
		padding:18px 0;
		margin:0 18px;
		border-bottom:1px rgba(7,17,27,0.1) solid;
		font-size:0;	/*display:inline-block;有间隙问题,所以要在父元素中将font-size设为0;*/
	}
	.block{
		display:inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		border-radius: 1px;
		color:rgb(77,85,93);
		font-size:12px;
		line-height: 12px;
	}
	.block .active{
		color:#fff;
	}
	.positive{
		background:rgba(0,160,220,0.2);
	}
	.negative{
		background:rgba(77,85,93,0.2);
	}
	.block .count{
		font-size: 8px;
		margin-left:2px;
	}
	.positive .active{
		background:black;
	}
	.negative &.active{
		background:rgb(77,85,93);
	}

	.ratingselect .switch{
		padding:12px 16px;
		line-height:24px;
		border-bottom:1px solid rgba(7,17,27,1);
		color:rgb(147,153,159);
		font-size:0;
	}
	.switch .clickY{
		margin-right:4px;
		font-size:12px;
		display: inline-block;
		height:16px;width: 16px;
		border-radius:50%;
		background: rgba(7,17,27,0.1);
		color:#fff;
		line-height: 16px;
		text-align: center;
	}
	.switch .text{
		font-size:12px;
	}
	.switch .on{
		
	}
	.switch .on .clickY{
		color:#00c850;
		background: #00c850;
	}
</style>
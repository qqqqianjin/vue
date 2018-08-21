<template>
	<div class='stars' v-bind:class='starType'>
		<span v-for='itemClass in itemClasses' v-bind:class='itemClass' class='star-item'></span>
	</div>
</template>

<script>
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';

	export default {
		name : 'stars',
		props : {
			size:{
				type:Number
			},
			score:{
				type:Number
			}
		},
		computed:{
			starType(){
				return 'star-' + this.size;
			},
			itemClasses(){
				let result = [];
				let score = Math.floor(this.score * 2) / 2; //星星有三种状态 0 0.5 1
				let hasDecimal = score % 1 !== 0;	//有没有小数
				let integer = Math.floor(score);	//取全星
				for(let i =0;i<integer;i++){
					result.push(CLS_ON);
				}
				if(hasDecimal){
					result.push(CLS_HALF);
				}
				while(result.length <LENGTH){
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	}
</script>

<style>
	.stars {
		font-size:0;
	}
	.star-48{

	}
	.star-36{

	}
	.star-24{
		
	}
	/*----------------------------------------*/
	.star-48 .star-item{
		height:20px;width:20px;margin-right:22px;
		background-size: 20px 20px;
	}
	.star-48 .on{
		background-image:url('./img/star48_on@2x.png');
	}
	.star-48 .half{
		background-image:url('./img/star48_half@2x.png');
	}
	.star-48 .off{
		background-image:url('./img/star48_off@2x.png');
	}
	.star-48 .star-item:last-child{
		margin-right:0;
	}
	/*----------------------------------------*/
	.star-36 .star-item{
		height:15px;width:15px;margin-right:16px;
		background-size: 15px 15px;
	}
	.star-36 .on{
		background-image:url('./img/star36_on@2x.png');
	}
	.star-36 .half{
		background-image:url('./img/star36_half@2x.png');
	}
	.star-36 .off{
		background-image:url('./img/star36_off@2x.png');
	}
	.star-36 .star-item:last-child{
		margin-right:0;
	}
	/*----------------------------------------*/
	.star-24 .star-item{
		height:10px;width:10px;margin-right:3px;
		background-size: 10px 10px;
	}
	.star-24 .on{
		background-image:url('./img/star24_on@2x.png');
	}
	.star-24 .half{
		background-image:url('./img/star24_half@2x.png');
	}
	.star-24 .off{
		background-image:url('./img/star24_off@2x.png');
	}
	.star-24 .star-item:last-child{
		margin-right:0;
	}
	/*----------------------------------------*/
	.stars .star-item {
		display:inline-block;
		background-repeat:no-repeat;
	}
</style>
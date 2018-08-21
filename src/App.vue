<template>
    <div id="app">
        <v-header v-bind:seller = 'seller'></v-header>
        <div class="tab">
            <div class="tab-item"><router-link to='/goods'>商品</router-link></div>
            <div class="tab-item"><router-link to='/ratings'>评论</router-link></div>
            <div class="tab-item"><router-link to='/sellers'>商家</router-link></div>
        </div>
        <keep-alive>
            <router-view :seller='seller'></router-view>
        </keep-alive>               
        <span></span>
    </div>
</template>

<script>
    import {urlParse} from '@/common/js/date'
    import header from './components/header/header.vue'
    const ERR_OK = 0;

    export default {
        data(){
            return {
                seller:{
                    id:(()=>{
                        let queryParam = urlParse();
                        return queryParam.id;
                    })(),
                    a:(()=>{
                        let queryParam = urlParse();
                        return queryParam.a;
                    })()
                }
            };
        },
        created(){
            //?id='+this.seller.id+'a='+this.seller.a
            this.$http.get('http://127.0.0.1:8081/prop.server/seller').then((response) => {
                this.seller = response.body;
                if(response.errno === ERR_OK){
                    this.seller = Object.assign({},this.seller,response.data)
                }
            });
        },
        methods:{
            //解析url参数, 
            //example ?id=12345&a=b
            //@return Object {id:12345,a:b}

            
        },
        components: {
            'v-header': header
        }
    };
</script>

<style>
    #app .tab {
        display:flex;
        width:100%;
        height:40px;
        line-height:40px;
        border-bottom:1px solid rgba(7,17,27,0.1);
    } 
    #app .tab .tab-item{
        flex:1;
        text-align:center;
    }
    #app .tab .tab-item a{
        display:block;
        text-decoration:none;
        font-size: 14px;
        color:rgb(77,85,93);
    }
    #app .tab .tab-item a.active{
        color:rgb(240,20,20);
    }
</style>
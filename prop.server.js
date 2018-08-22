var http = require('http');
var request = require('request')
var url = require('url')
var jsonData = require('E:/wamp64/www/eleme/data.json');
let i = 0;
const header = {
	"Content-Type":'application/json',
	'charset':'utf-8',
	'Access-Control-Allow-Origin':'*',
	'Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'
}

var server = http.createServer(function(req,res){
	var arg = url.parse(req.url).path;	// 获得/prop.server/goods
	var KEYWORD = arg.split('/')[2]		//按/切割 返回数组 ['','prop.server','goods']
	console.log(KEYWORD)

	var KEY_Data = JSON.stringify(filter(KEYWORD));
	console.log(KEY_Data);

	//-------------------------返回数据
	res.writeHead(200,header);
	res.write(KEY_Data);
	res.end();
}).listen(8081);


function filter(keyword){
	
	return jsonData[keyword]
}
function sendData(){
	
}

(()=>{
	
})();

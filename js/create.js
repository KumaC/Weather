/**
* @description 生成省及城市下拉列表
* @method handle
* @param {string} data - 返回的json格式的城市数据
*/
function handle(data){
    var data = JSON.parse(data)
    var cityInfo = data["city_info"];
    //创建省份下拉列表
    var provSel = document.querySelector('#prov-sel');
    var citySels = document.querySelector('#city-sels');
    //创建初始城市下拉列表

    cityInfo.forEach(function(item){
        //为省份下拉列表添加选项
        if(provSel.querySelectorAll('.' + item.prov).length === 0){
            var prov = new Option(item.prov);
            prov.className = item.prov;
            provSel.add(prov);
        }
        //创建城市下拉列表
        if(!document.querySelector('#' + item.prov)){
            var citySel = document.createElement('select');
            var cityNote = document.createElement('option');
            citySel.id = item.prov;
            citySel.className = 'hidden';
            citySels.appendChild(citySel);
        }
        //为城市下拉列表添加选项
        var citySel = document.querySelector('#' + item.prov);
        var city = new Option(item.city, item.id);
        citySel.add(city);
    })
}
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304){
            handle(xhr.responseText);
        } else {
            alert('请求出现了一个问题，response-status = ' + xhr.status);
        }
    }
}
xhr.open("get", " https://api.heweather.com/x3/citylist?search=allchina&key=a7856671962246b2b4350e3f948896a4", true)
xhr.send(null)

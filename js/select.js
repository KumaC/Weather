var queryFace = document.querySelector('#query-face');
var provSel = document.querySelector('#prov-sel');
var citySels = document.querySelector('#city-sels');
var showCitySel = document.querySelector('#选择省份');
var queryBtn = document.querySelector('#query-btn');
var header = document.querySelector('header');
var state = 0;
function showWeather(data){
    var data = JSON.parse(data)['HeWeather data service 3.0'][0];
    card.basic(data.basic);
    card.now(data.now);
    card.days(data.daily_forecast);
    card.suggestion(data.suggestion);
}
function animate(){
    if(state){
        header.className = '';
        state = 0;
    } else {
        header.className = 'header-side';
        state = 1;
    }
}
function request(cityId){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status >= 200 && xhr.status <= 300 || xhr.status === 304){
                showWeather(xhr.responseText);
            } else {
                alert('请求出现了一个问题，response-status = ' + xhr.status);
            }
        }
    }
    xhr.open("get", "https://api.heweather.com/x3/weather?cityid=" + cityId + "&key=a7856671962246b2b4350e3f948896a4", true)
    xhr.send(null)
}
provSel.addEventListener('change', function(){
    var index = provSel.selectedIndex;
    var prov = provSel.options[index].value;
    var citySel = document.querySelector('#' + prov);
    showCitySel.className = 'hidden';
    citySel.className = 'show';
    showCitySel = citySel;
}, false);
queryBtn.addEventListener('click', function(){
    var index = showCitySel.selectedIndex;
    var cityId = showCitySel.options[index].value;
    if(cityId === '选择城市') {
        return;
    }
    animate.call(null);
    request.call(null, cityId);
}, false);

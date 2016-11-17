var card = {
    basic: function(data) {
        var now = document.querySelector('#now');
        var location = now.querySelectorAll('.location')[0];
        var upTime = now.querySelectorAll('.up-time')[0];

        location.innerText = data.city + '市';
        //location.innerText = data.prov + '省' + data.city + '市';
        upTime.innerText = data.update.loc.match(/\s(\d+:\d+)/)[1];
    },
    now: function(data) {
        var now = document.querySelector('#now');
        var condImg = now.querySelector('img');
        var tmp = now.querySelector('.tmp');
        var condTxt = now.querySelector('.cond-txt');
        var wind = now.querySelector('.wind');
        var hum = now.querySelector('.hum');

        condImg.src = 'img/' + data.cond.code + '.png';
        tmp.innerText = data.tmp;
        condTxt.innerText = data.cond.txt;
        wind.innerText = data.wind.dir +  data.wind.sc;
        hum.innerText = data.hum;
    },
    days: function(data) {
        var days = document.querySelector('#days');
        var day = days.querySelectorAll('section');
        for(var i = 0; i < 7; i++) {
            var date = day[i].querySelector('.date');
            var condImg = day[i].querySelector('img');
            var tmpMax = day[i].querySelector('.tmp-max');
            var tmpMin = day[i].querySelector('.tmp-min');
            var condTxt = day[i].querySelector('.cond-txt');

            i === 0 ? date. innerText = '今天' :
            i === 1 ? date. innerText = '明天' :
            i === 2 ? date. innerText = '后天' :
            date. innerText = data[i].date.match(/\d+-\d+-(\d+)/)[1] + '日';
            condImg.src = 'img/' + data[i].cond.code_d + '.png';
            tmpMax.innerText = data[i].tmp.max + '°';
            tmpMin.innerText = data[i].tmp.min + '°';
            condTxt.innerText = data[i].cond.txt_d;
        }
    },
    suggestion: function(data){
        var suggestions = document.querySelector('#suggestions');
        var suggestion = suggestions.querySelectorAll('section');
        for(var i = 0; i < 8; i++) {
            var content = suggestion[i].querySelector('p');
            var dataType = suggestion[i].getAttribute('data-type')
            if(!data[dataType]){
                suggestion[i].style.display = 'none';
                continue;
            }
            suggestion[i].style.display = 'block';
            content.innerText = data[dataType].brf + '. ' + data[dataType].txt;
        }
    }
}

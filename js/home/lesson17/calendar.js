(function() {
    var months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
    var year = +prompt('Рік:', '') || new Date().getFullYear();
    var month = +prompt('Номер місяця', '') - 1;
    var curMonth = new Date(year, month);
    var lastDay = new Date(year, month + 1, 0).getDate();

    var tbody = '<tr>';

    for (var i = 1; i < curMonth.getDay(); i++) {
        tbody += '<td></td>';
    }

    var day = 1;
    while(day <= lastDay) {
        tbody += '<td>' + day + '</td>';
        if((day + curMonth.getDay() - 1) % 7 === 0) tbody += '</tr><tr>';
        day++;
    }
    tbody += '</tr>';

    document.querySelector('.one-month__body').innerHTML = tbody;
    document.querySelector('.one-month__name').innerHTML = months[month];

    var tds = document.querySelectorAll('td');
    for(var j = 0; j < tds.length; j++) {
        tds[j].classList.add('one-month__cell');
    }
})();
(function ($) {

    var button = $('.button');
    var list = $('.admin-list');
    var adminsDom = $('.admins');
    var loader = $('.loader');

    var loadCounter = 0,
        requestLimit = 37,
        idList = [];

    var usersData = [];

    button.on('click', function (e) {
        $(e.target).hide();
        loader.show();
        getSubscribers();
    });

    function getSubscribers(e) {
        if(e) e.response.users.forEach(function (item) {
            idList.push(item);
        });
        if(loadCounter >= requestLimit) {
            return success(idList);
        }
        loadCounter++;

        setTimeout(function () {
            VK.Api.call(
                'groups.getMembers',
                {
                    group_id: 'kpi_live',
                    offset: loadCounter * 1000,
                    count: 1000
                },
                getSubscribers
            );
        }, 300);
    }

    function success(idList) {
        var count = randomInteger(4, 8);
        var randomIds = getRandomUsers(idList, count);
        fetchUsersData(randomIds);
    }

    function getRandomUsers(users, count) {
        var randomUsers = [];

        for(var i = 0; i < count; i++) {
            randomUsers.push(users[randomInteger(0, users.length)]);
        }

        return randomUsers;
    }

    function fetchUsersData(ids) {
        var method = 'users.get';
        var options = {
            user_ids: ids.join(','),
            fields: 'photo_50'
        };

        VK.Api.call(method, options, function (e) {
            usersData = e.response;
            renderList();
        });
    }

    function renderList() {
        list.html(listTemplate(usersData));
        loader.fadeOut({
            duration: 400,
            complete: function () {
                adminsDom.fadeIn();
            }
        });
    }

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    var listTemplate = doT.template( $('#list-template').html() );

})(jQuery);

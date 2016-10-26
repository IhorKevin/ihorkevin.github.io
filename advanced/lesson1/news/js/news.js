(function(window, $) {

    var url = 'http://node.dev.puzankov.com/rss/data';
    var tmplDom = $('.article_tmpl');
    var articlesDom = $('.articles');
    var pagerDom = $('.myPager');
    var pagerTmpl = $('.page-navigation_tmpl');

    function getFeed() {
        var hash = window.location.hash,
            rssFeed = 'habr';

        if (hash.length > 0) {
            rssFeed = hash.substring(1);
        }

        $.ajax({
            url: url,
            data: { kind: rssFeed },
            method: 'GET',
            dataType: 'json'
        })
        .success(onSuccess)
        .error(function (e) {
            console.log('kolbasa');
        });
    }

    $(window).on('hashchange', function (e) {
        getFeed();
    });

    getFeed();

    function onSuccess (data) {
        var items = data.items;
        var articlesElems = [];

        items.forEach(function (article) {
            articlesElems.push(createArticle(article));
        });

        articlesDom.html(articlesElems);
    }

    function createArticle(article) {
        var newElem = tmplDom.clone().removeClass('article_tmpl');

        newElem
            .find('.post-heading')
            .html(article.title)
            .attr('href', article.guid);

        newElem
            .find('.author')
            .html(article.author)
            .attr('href', '#');

        newElem
            .find('.excerpt')
            .html(article.summary);

        newElem
            .find('.action-button')
            .attr('href', article.guid);

        newElem
            .find('.date')
            .html(convertDate(article.pubDate));

        return newElem;
    }

    function convertDate(dateStr) {
        var date = new Date(dateStr);

        return date;
    }
    renderPager(1, 8);
     pagerDom.on('click', changePage);


    function changePage(event) {
        if(event.target.tagName == 'A' )
        alert(event.target.textContent);
    }

    function renderPager(currentPage, wholeLength) {
        var newPager = pagerTmpl.clone().removeClass('page-navigation_tmpl');
        var pages = newPager.find('.nav-page');

        if(currentPage === 1) {
            newPager
                .find('.nav-next')
                .addClass('nav-next_hide');
        } else {
            newPager
                .find('.nav-next')
                .find('a')
                .attr('href', '#');
        }

        for(var i = 0; i < 4; i++) {
            $(pages[i])
                .find('a')
                .html(currentPage + i)
                .attr('href', '#');
        }

        if(currentPage === wholeLength) {
            newPager
                .find('.nav-previous')
                .addClass('nav-previous_hide');
        } else {
            newPager
                .find('.nav-previous')
                .find('a')
                .attr('href', '#');
        }

        pagerDom.html(newPager);

    }

})(window, jQuery);

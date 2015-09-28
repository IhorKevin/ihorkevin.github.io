(function(window) {

    var Local = function() {
        var ls = localStorage;

        this.initField = function (field) {
            console.log(1);
            if (!ls[field]) {
                this.clearField(field);
            }
        };

        // add some item to array in ls
        this.append = function (item, field) {
            var updatedList = this.getField(field);
            updatedList.push(item);

            ls[field] = JSON.stringify(updatedList);
        };

        this.getField = function (field) {
            return JSON.parse(ls[field]);
        };

        this.clearField = function (field) {
            ls[field] = '[]';
        };

    };

    window.ls = new Local();

})(window);

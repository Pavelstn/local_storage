var LocalStorage = function (name) {
    this.name = name;
    this.setData = function (key, data) {
        if (this.isLocalStorageAvailable()) {
            var data_raw = localStorage.getItem(this.name);
            if (data_raw != null) {
                var ldata = JSON.parse(data_raw);
                 var list= JSON.parse(ldata.list);
                var aaaa = JSON.stringify(data);
                list[key]=aaaa;
                var cccc= JSON.stringify(list);
                ldata.list = cccc;
                var bbbb = JSON.stringify(ldata);
                localStorage.setItem(this.name, bbbb);
                return true;
            } else {
                console.log("Данные не сохранились");
                this.init();
                return false;
            }
        } else {
            console.log("Локальные хранилища не поддерживаются данным браузером");
            return false;
        }
    };

    this.getData = function (key) {
        if (this.isLocalStorageAvailable()) {
            var data_raw = localStorage.getItem(this.name);
            if (data_raw != null) {
                var ldata = JSON.parse(data_raw);
                var list= JSON.parse(ldata.list);
                if(list.hasOwnProperty(key)){
                    var item= JSON.parse(list[key]);
                    return item;
                }else{
                    return null;
                }

            } else {
                console.log("Данные не сохранились");
                this.init();
                return null;
            }
        } else {
            console.log("Локальные хранилища не поддерживаются данным браузером");
            return null;
        }
    };

    this.setReset = function () {
        if (this.isLocalStorageAvailable()) {
            var data_raw = localStorage.getItem(this.name);
            if (data_raw != null) {
                var ldata = JSON.parse(data_raw);
                ldata.resetFlag = true;
                localStorage.setItem(this.name, JSON.stringify(ldata));
                return true;
            } else {
                console.log("Данные не сохранились");
                this.init();
                return false;
            }
        } else {
            console.log("Локальные хранилища не поддерживаются данным браузером");
            return false;
        }
    };


    this.resetStorage = function () {
        if (this.isLocalStorageAvailable()) {
            localStorage.removeItem(this.name);
        }
    };


    this.init = function () {
        if (this.isLocalStorageAvailable()) {
                var data_raw = localStorage.getItem(this.name);
                if (data_raw != null) { //если какие- то данные есть- мы их используем
                    console.log("если какие- то данные есть- мы их используем");
                    var data = JSON.parse(data_raw);
                    /*var list= JSON.parse(data.list);
                     console.log("list",list);*/

                    if (data.resetFlag) {
                        this.resetStorage();
                    }
                } else { // если никаких дынных нет, мы их сначала создаем, а потом используем
                    console.log("если никаких данных нет, мы их сначала создаем, а потом используем");
                    var data = {resetFlag: false, list: JSON.stringify({})};
                    // var data = {resetFlag: false, list: []};
                    localStorage.setItem(this.name, JSON.stringify(data));
                }

        } else {
            console.log("Локальные хранилища не поддерживаются данным браузером");
        }
    };

    this.isLocalStorageAvailable = function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    };

    this.init();
};

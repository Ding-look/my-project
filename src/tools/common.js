import store from '../store/store';

export default {
    /**
     * getUrlParam 获取url参数
     * @param  {String} strName 参数名
     * @param  {String} strHref 带&参数url链接
     * @return {String} 返回一个参数值
     */
    getUrlParam(strName, strHref) {
        strHref = strHref || document.location.toString();
        const intPos = strHref.indexOf("?");
        const strRight = strHref.substr(intPos + 1);
        const arrTmp = strRight.split("&");
        for (let i = 0; i < arrTmp.length; i++) {
            const dIntPos = arrTmp[i].indexOf("=");
            const paraName = arrTmp[i].substr(0, dIntPos);
            const paraData = arrTmp[i].substr(dIntPos + 1);
            if (paraName != '' && paraName.toUpperCase() == strName.toUpperCase()) {
                return paraData;
            }
        }
        return "";
    },

    /**
     * getUrlObject 获取url参数对象
     * @param  {String} strHref 域名字符串
     * @return {Object} 返回一个对象
     */
    getUrlObject(strHref) {
        strHref = strHref || document.location.toString();
        const intPos = strHref.split('?')[1];
        if (!intPos) {
            return '';
        }
        const arr = strHref.split('?')[1].split('&');
        const theRequest = {};
        for (let i = 0; i < arr.length; i++) {
            const kye = arr[i].split("=")[0]
            const value = arr[i].split("=")[1]
            // 给对象赋值
            theRequest[kye] = value
        }
        return theRequest;
    },

    /**
     * formatDate 格式时间化
     * @param  {number} date    时间戳
     * @param  {number} fmt     yyyy年MM月dd日
     * @return {Object} 返回一个对象
     */
    formatDate(date, fmt) {
        date = new Date(date * 1000);
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
        }
        const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };

        function padLeftZero(str) {
            return (`00${str}`).substr(str.length);
        }

        for (const k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                const str = `${o[k]}`;
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt;
    },

    /**
     * 获取当前时间yyyy-mm-dd
     * @param nS TIMESTAMP
     * @returns {string}
     */
    getNewDay(nS) {
        const newDate = nS ? new Date(nS) : new Date();
        let sMonth = newDate.getMonth() + 1;
        let sDate = newDate.getDate();
        let addZero = (number) => {
            return number < 10 ? '0' + number : number;
        };
        return newDate.getFullYear() + '-' + addZero(sMonth) + '-' + addZero(sDate);
    },

    downloadFileBlob(res){
        //这里res.data是返回的blob对象
        let blob = new Blob([res.data], {type: 'application/actet-stream;charset=utf-8'});
        //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        let contentDisposition = res.headers['content-disposition'];
        let regExp = new RegExp("filename\\*=utf-8\\'\\'(\\S+)");
        let result = regExp.exec(contentDisposition);
        //解析中文编码
        if (!result||!result[1]) return false;
        let filename = decodeURI(result[1]);
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.style.display = 'none';
        downloadElement.href = href;
        downloadElement.download = filename; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
        return true;
    },

    /**
     * urlEncode 对象转url参数格式
     * @param  {Object} param  将要转为URL参数字符串的对象
     * @param  {String} key    参数字符串的前缀
     * @param  {Boolean} encode true/false 是否进行URL编码,默认为true
     * @return {String}        返回一个字符串
     */
    urlEncode(param, key, encode) {
        if (param == null) return "";
        let urlStr = "";
        const t = typeof param;
        if (t == "string" || t == "number" || t == "boolean") {
            urlStr
                += `&${
                key
            }=${
                encode == null || encode ? encodeURIComponent(param) : param}`;
        } else {
            for (const i in param) {
                const k = key == null
                    ? i
                    : key + (param instanceof Array ? `[${i}]` : `[${i}]`);
                urlStr += this.urlEncode(param[i], k, encode);
            }
        }
        return urlStr;
    },

    /**
     * toThousands 格式化数字加逗号
     * @param  {Number} num 一串正整数
     * @return {String}     加逗号的数字字符串
     */
    toThousands(num) {
        let result = [],
            counter = 0;
        if (typeof (num) === 'number' && String(num).indexOf(".") >= 0) {
            num = num.toFixed(2);
            return num;
        } else {
            num = (num || 0).toString().split('');
            for (let i = num.length - 1; i >= 0; i--) {
                counter++;
                result.unshift(num[i]);
                if (!(counter % 3) && i != 0) {
                    result.unshift(',');
                }
            }
            return result.join('');
        }
    },

    /**
     * formatNumb 格式化数字，超万以万为单位(不四舍五入)
     * @param  {Number} num 一串正整数
     * @return {String}     加逗号的数字字符串
     */
    formatNumbW(numb) {
        if (numb > 9999) {
            if (numb > 99999999) {
                numb = `${Math.floor((numb / 100000000) * 1000) / 1000}亿`;
            } else {
                numb = `${Math.floor((numb / 10000) * 10) / 10}万`;
            }
        }
        return numb;
    },

    /**
     * [throttle js节流公用方法]
     * @param  {[function]} method  [你要执行的方法]
     * @param  {[]} context [上下文语境如window，可忽略]
     */
    throttle(method, context, t, ...args) {
        clearTimeout(context.timerId);
        t = t || 200;
        context.timerId = setTimeout(() => {
            method.apply(context, args);
        }, t);
    },

    /**
     * [setLocalStorage 添加有时间戳的Storage]
     * @param {String} key   键
     * @param {String} value 键值
     */
    setLocalStorage(key, value) {
        const curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
        const valueDate = JSON.stringify({
            val: value,
            timer: curtime
        });
        localStorage.setItem(key, valueDate);
    },

    /**
     * getLocalStorage 获取带有时效的Storage
     * @param  {String} key 键
     * @param  {Number} day 天数
     */
    getLocalStorage(key, day) {
        day = day ? day : 1;
        const exp = 60 * 60 * 24 * 1000 * day; // 一天的秒数
        let newValue;
        if (localStorage.getItem(key)) {
            const vals = localStorage.getItem(key); // 获取本地存储的值
            const dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
            // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
            const isTimed = (new Date().getTime() - dataObj.timer) > exp;
            if (isTimed) {
                console.log("存储已过期");
                localStorage.removeItem(key);
                return null;
            } else {
                newValue = dataObj.val;
            }
            return newValue;
        } else {
            return null;
        }
    },

    /**
     * find 获取字符串指定字符下标
     * @param  {String} str 要查询的字符串
     * @param  {String} cha 要查询的字符
     * @param  {Number} num 要第几个字符的下标,从0开始计算
     * @return {Number}     获得所查字符的下标
     */
    findStrIndex(str, cha, num) {
        var x = str.indexOf(cha);
        for (var i = 0; i < num; i++) {
            x = str.indexOf(cha, x + 1);
        }
        return x;
    },

    /**
     * deepCopy 原生深拷贝
     * @param  {Object} p 拷贝的对象
     * @param  {Object} c 需要拷贝的对象
     * @return {Object}   返回拷贝后的对象
     */
    deepCopy(p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    },

    /**
     * authority 判断有无权限
     * @param  {String} 数字字符串，多个数字使用','连接
     * @return {Boolean} 有无权限
     */
    authority(numb_auth) {
        // let authA = String(numb_auth).split(",");
        // let isAuth = authA.indexOf(store.state.global.userType);
        // let userInfo = JSON.parse(this.getLocalStorage('shortVideoId',1));
        // if(authA.indexOf('super')>=0){
        //   if(userInfo.appList[0].app_id==0) return true;
        // }
        // return isAuth >= 0 ? true : false;
        return true;
    },

    /**
     * Get the raw type string of a value e.g. [object Object]
     */
    _toString: Object.prototype.toString,

    /**
     * get the typeInfo of param
     * @param value
     * @returns {string} typeInfo:[Array Function，String,Object,RegExp]
     */
    toRawType(value) {
        return this._toString.call(value).slice(8, -1)
    },

    /**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     */
    isArray(obj) {
        return this.toRawType(obj) === 'Array'
    },

    isFunction(obj) {
        return this.toRawType(obj) === 'Function'
    },

    isString(obj) {
        return this.toRawType(obj) === 'String'
    },

    isObject(obj) {
        return this.toRawType(obj) === 'Object'
    },

    isRegExp(v) {
        return this.toRawType(v) === 'RegExp'
    },

    /**
     * Check whether the object has the property.
     */
    hasOwnProperty: Object.prototype.hasOwnProperty,

    hasOwn(obj, key) {
        return this.hasOwnProperty.call(obj, key);
    }

}

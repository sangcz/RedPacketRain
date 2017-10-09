function redPack(options) {
    this.el = options.el;
    this.rains = [];
    this.speed = options.speed; // 控制红包落下的速度
    this.density = options.density; // 红包密度
    this.callback = options.callback; // 回调
    // this.start();

};
redPack.prototype.create = function(id, amount) {
    var el = this.el,
    This = this,
    flag = true,
    fragment = document.createDocumentFragment(),
    nRed = document.createElement("span");

    // 添加自定义属性
    nRed.setAttribute("redId",id);
    nRed.setAttribute("redAmount",amount);
    nRed.className = "redpack";
    nRed.style.left = Math.random() * (el.clientWidth - 30) + "px";
    nRed.style.top = -el.clientHeight / 10 + "px";

    fragment.appendChild(nRed);
    el.appendChild(fragment);
    this.rains.push(nRed);
    this.move(nRed);

	// 红包事件函数
	var handler = function (e) {
		if(flag=== true){
			var that = nRed;
			e.target.className = "redpack redpacked";
			This.callback(e);
			flag = false;
		} else {
			return
		}

	};
	document.addEventListener('touchstart', function(e){
		if(e.target.className === 'redpack') {
			handler(e);
		} else if (e.target.getAttribute('redAmount') === '0') {
			e.target.className = 'redPackNone';
      } else {
		   return false;
      }
	});
};
redPack.prototype.start = function(data) {
    var that = this,
        i = 0;
    that.timer = setInterval(function() {
        if(i <= data.length - 1) {
            var id = data[i].id,
                amount = data[i].amount;
            that.create(id,amount);
            i++;
        }

    }, that.density);

};
redPack.prototype.stop = function() {
    var This = this;
    clearInterval(This.timer);
    for (var i = 0; i < This.rains.length; i++) {
        clearInterval(This.rains[i].timer);
    }
};
redPack.prototype.move = function(rains) {
    var el = this.el;
    var This = this;
    var diffY = Math.random() + 1; // 垂直上的轻微偏移
    var diffX = Math.random(); // 水平上的轻微偏移
    rains.timer = setInterval(function() {
        if (diffY > 1.5) {
            rains.style.left = parseInt(rains.style.left) + parseInt(diffX * rains.clientHeight / 30) + "px";
        } else {
            rains.style.left = parseInt(rains.style.left) - parseInt(diffX * rains.clientHeight / 30) + "px";
        }
        rains.style.top = parseInt(rains.style.top) + parseInt(diffY * rains.clientHeight / 20) + "px";
        if (el.clientHeight < parseInt(rains.style.top)) {
            // 超出 区域过后，关闭定时器，删除红包
            clearInterval(rains.timer);
            // el.removeEventListener('click', handler, false);
            // document.removeEventListener('touchstart', handler, false);
            el.removeChild(rains);
        }
    }, This.speed);
};
// 时间停止时清除剩余红包
redPack.prototype.clear = function () {
    var container = g('box'),
        redItem = container.childNodes;
    for (var i = redItem.length - 1; i >= 0; i--) {
        container.removeChild(redItem[i]);
    }
};

// ajax 封装
redPack.prototype.ajax = function(opt) {
    /* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 */
        opt = opt || {};
        opt.method = (opt.method == null ?"GET" : opt.method.toUpperCase());
        opt.url = opt.url || '';
        opt.async = opt.async || true;
        opt.data = opt.data || null;
        opt.success = opt.success || function () {};
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
        else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in opt.data){
            params.push(key + '=' + opt.data[key]);
        }
        var postData = params.join('&');
        if (opt.method.toUpperCase() === 'POST') {
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        }
        else if (opt.method.toUpperCase() === 'GET') {
            xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
            xmlHttp.send(null);
        }
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                opt.success(xmlHttp.responseText);
            }
        }

};

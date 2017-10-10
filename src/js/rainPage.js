    var g = function(id) {
        return document.getElementById(id);
    };
    var ua = navigator.userAgent.toLowerCase();
    var el = g('box'),
        redCount = 0,
        redIdArr = [],
        redAmountArr = [],
        allAmount = 0;
    var rain = new redPack({
        el: el,         // 容器
        //chance: 0.5,  // 几率,暂时不要
        speed: 10,      // 速度，越小越快
        density: 200,   //  红包密度，越小越多
        callback: function(e) {  // 点击红包的回调
            redIdArr.push(e.target.getAttribute('redId'));
            redAmountArr.push(e.target.getAttribute('redAmount'));
            redCount++;
            // 抢到红包的个数
            g('redCount').innerText = redCount;
        }
    });

    var count = 15,
        timer = setInterval(Count,1000);
    function Count() {
        g('countDown').innerText = count;
        count--;
        if (count < 0) {
            clearInterval(timer);
            rain.stop();
            rain.clear();
            showPop();
        }

    }

    function showPop() {
        g('mask').style.display = 'block';
        g('pop').style.display = 'block';
        g('redCount1').innerText = redCount;
        // 计算红包总金额
        function sum(arr) {
            if(arr.length===0){
                return 0;
            }
            else if(arr.length===1){
		            allAmount += Number(arr[0]);
	            return allAmount;
            }
            else{
                for(var i=0;i<arr.length;i++){
                    allAmount += Number(arr[i]);
                }
                return allAmount;
            }
        }
        sum(redAmountArr);
        // 添加到dom上
        g('allAmount').innerText = (allAmount).toFixed(2);
    }
    g('closeBtn').addEventListener('click', function () {
        closePop();
    });
    function closePop() {
        g('mask').style.display = 'none';
        g('pop').style.display = 'none';
    }

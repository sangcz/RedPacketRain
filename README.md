# RedPacketRain

 ## 这是一款H5抢红包小游戏
 #### 没有依赖任何第三方库，纯原生JS编写
 #### 页面截图
  
 ![](https://user-gold-cdn.xitu.io/2018/5/24/1639115037cc79ce?w=518&h=941&f=gif&s=5112309)

# Import using script tag

```HTML
<script type="text/javascript" src="./js/rain.min.js"></script>
<script type="text/javascript" src="./js/rainPage.min.js"></script>
```

# 主要方法

| Methods | Options |
| ---- | ----|
| rain.create() |  id(红包ID), amount(红包的金额) |
| rain.start()  |  data(ajax请求返回的数据) |
| rain.stop()   |  无需传参|
| rain.move()   |  rains（红包数组）|
| rain.clear()  |  无需传参 |
| rain.ajax()   |  类似jQuery中的$.ajax |
    
# License
MIT 
Copyright Joy Sang

# Tween的运动算法(下)

> 练习
* 接下来我们用requestAnimationFrame来实现下我们的效果
    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style>
            #box{
                position: absolute;
                left: 0;
                top: 100px;
                width: 100px;
                height: 100px;
                background-color: red;
            }
        </style>
    </head>
    <body>
    <button>run</button>
    <button>stop</button>
    <div id="box"></div>
    <script>
        const Tween = {
            linear: function (t, b, c, d) {  //匀速
                return c * t / d + b;
            },
            easeIn: function (t, b, c, d) {  //加速曲线
                return c * (t /= d) * t + b;
            },
            easeOut: function (t, b, c, d) {  //减速曲线
                return -c * (t /= d) * (t - 2) + b;
            },
            easeBoth: function (t, b, c, d) {  //加速减速曲线
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t + b;
                }
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            easeInStrong: function (t, b, c, d) {  //加加速曲线
                return c * (t /= d) * t * t * t + b;
            },
            easeOutStrong: function (t, b, c, d) {  //减减速曲线
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeBothStrong: function (t, b, c, d) {  //加加速减减速曲线
                if ((t /= d / 2) < 1) {
                    return c / 2 * t * t * t * t + b;
                }
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            },
            elasticIn: function (t, b, c, d, a, p) {  //正弦衰减曲线（弹动渐入）
                if (t === 0) {
                    return b;
                }
                if ((t /= d) == 1) {
                    return b + c;
                }
                if (!p) {
                    p = d * 0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else {
                    var s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            elasticOut: function (t, b, c, d, a, p) {    //正弦增强曲线（弹动渐出）
                if (t === 0) {
                    return b;
                }
                if ((t /= d) == 1) {
                    return b + c;
                }
                if (!p) {
                    p = d * 0.3;
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                } else {
                    var s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
            },
            elasticBoth: function (t, b, c, d, a, p) {
                if (t === 0) {
                    return b;
                }
                if ((t /= d / 2) == 2) {
                    return b + c;
                }
                if (!p) {
                    p = d * (0.3 * 1.5);
                }
                if (!a || a < Math.abs(c)) {
                    a = c;
                    var s = p / 4;
                }
                else {
                    var s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                if (t < 1) {
                    return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
                        Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                }
                return a * Math.pow(2, -10 * (t -= 1)) *
                    Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
            },
            backIn: function (t, b, c, d, s) {     //回退加速（回退渐入）
                if (typeof s == 'undefined') {
                    s = 1.70158;
                }
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            backOut: function (t, b, c, d, s) {
                if (typeof s == 'undefined') {
                    s = 1.70158;
                }
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            backBoth: function (t, b, c, d, s) {
                if (typeof s == 'undefined') {
                    s = 1.70158;
                }
                if ((t /= d / 2) < 1) {
                    return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                }
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            },
            bounceIn: function (t, b, c, d) {    //弹球减振（弹球渐出）
                return c - Tween['bounceOut'](d - t, 0, c, d) + b;
            },
            bounceOut: function (t, b, c, d) {//*
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
                }
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
            },
            bounceBoth: function (t, b, c, d) {
                if (t < d / 2) {
                    return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
                }
                return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
            }
        };
        (function(){
            if(!window.requestAnimationFrame){
                //说明这个是低版本
                window.requestAnimationFrame = function(callback){
                    return setTimeout(callback, 1000 / 60)
                };
                window.cancelAnimationFrame = function(index){
                    clearTimeout(index);
                };
            }
            let aBtn = document.querySelectorAll("button");
            let oBox = document.querySelector("#box");
            let timer = 0;
            let t = 0;
            let b = parseFloat(getComputedStyle(oBox)["left"]);
            let target = 400;
            let c = target - b;
            let d = 100;
            // console.log(t, b, c, d);
            function move(){
                t++;
                // console.log(t, Tween.linear(t,b,c,d));
                if(t <= d){
                    let l = Tween["bounceBoth"](t,b,c,d);
                    oBox.style.left = l + "px";
                    timer = requestAnimationFrame(move);
                }else{
                    cancelAnimationFrame(timer);
                }
            }
            aBtn[0].onclick = function(){
                move();
            };
            aBtn[1].onclick = function(){
                cancelAnimationFrame(timer);
            };
        })();
    </script>
    </body>
    </html>
    ```
  
* 然后运行后就点击run就能看到动画啦~    
* 其实很简单需要注意的是
    1. 需要递归
    2. 控制达到目标的条件，这里的t<=d就是没达到目标点就继续动画帧requestAnimationFrame
    3. 达到目标后取消动画帧cancelAnimationFrame
    4. 原理其实就是绘制每一帧的位置，这个位置就是Tween计算所得

* 各个运动的方式，小伙伴自行玩耍
* 在使用中，如果每次都要这么写其实还是很麻烦的，
    所以在[下一章](../07-封装运动框架-基础版/7-封装运动框架-基础版.md) 我们要封装个基础版的动画框架

> 目录
* [返回目录](../README.md)
* [上一章-Tween的运动算法(上)](../05-Tween的运动算法(上)/5-Tween的运动算法(上).md)       
* [下一章-封装运动框架-基础版](../07-封装运动框架-基础版/7-封装运动框架-基础版.md)       
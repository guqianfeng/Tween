# 添加css方法

> 优化
* 还是之前的案例，我们来看之前的这段代码
    ```
        function myTween(el, attr, target, duration, fx) {
            let t = 0;
            let b = parseFloat(getComputedStyle(el)[attr]);
            let c = target - b;
            let d = Math.ceil(duration / (1000 / 60));
            // console.log(t, b, c, d);
            let timer = 0;
            anim();
            function anim() {
                t++;
                if (t > d) {
                    //动画结束
                    cancelAnimationFrame(timer);
                } else {
                    let val = Tween[fx](t, b, c, d);
                    el.style[attr] = val + "px";
                    timer = requestAnimationFrame(anim);
                }
            }
        }
    ```
* 我们发现在给元素设置样式的时候我们加了px
* 如果是些没有单位的样式，比如opacity这样的肯定就有问题了 
* 所以我们要处理下，添加css方法
* 还是老样子考虑下css方法需要的参数，我们css方法的目的是能获取或者设置元素属性的值
    1. el - 元素
        * 就是我们想要的元素
    2. attr - 属性
        * 哪个属性
        * 根据属性判断是不是要加px
    3. val - 值
        * 传值了那就是设置，不传那就是获取

> 练习   
* 先来封装这个css方法
    ```
        function css(el, attr, val) {
            if (val === undefined) {
                return parseFloat(getComputedStyle(el)[attr]);
            } else {
                if (attr === "opacity") {
                    el.style[attr] = val;
                    el.style.filter = `alpha(opacity=${val * 100})`;//兼容
                } else {
                    el.style[attr] = val + "px";
                }
            }
        }
    ```
* 封装好当然要使用啊，完整的代码如下
    ```
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style>
            #box {
                position: absolute;
                left: 0;
                top: 100px;
                width: 100px;
                height: 100px;
                background-color: red;
                opacity: 1;
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
        (function () {
            if (!window.requestAnimationFrame) {
                //说明这个是低版本
                window.requestAnimationFrame = function (callback) {
                    return setTimeout(callback, 1000 / 60)
                };
                window.cancelAnimationFrame = function (index) {
                    clearTimeout(index);
                };
            }
        })();
    
        function css(el, attr, val) {
            if (val === undefined) {
                return parseFloat(getComputedStyle(el)[attr]);
            } else {
                if (attr === "opacity") {
                    el.style[attr] = val;
                    el.style.filter = `alpha(opacity=${val * 100})`;//兼容
                } else {
                    el.style[attr] = val + "px";
                }
            }
        }
    
        function myTween(el, attr, target, duration, fx) {
            let t = 0;
            let b = css(el, attr);
            let c = target - b;
            let d = Math.ceil(duration / (1000 / 60));
            // console.log(t, b, c, d);
            let timer = 0;
            anim();
    
            function anim() {
                t++;
                if (t > d) {
                    //动画结束
                    cancelAnimationFrame(timer);
                } else {
                    let val = Tween[fx](t, b, c, d);
                    css(el, attr, val);
                    timer = requestAnimationFrame(anim);
                }
            }
        }
    
        (function () {
            let aBtn = document.querySelectorAll("button");
            let oBox = document.querySelector("#box");
            aBtn[0].onclick = function () {
                myTween(oBox, "top", 200, 500, "linear");
                myTween(oBox, "opacity", .1, 3000, "elasticBoth")
            }
        })()
    </script>
    </body>
    </html>
    ``` 

* 然后测试下来没任何问题，简单的css方法就封装好了
* 接下来的问题是我想同时改变一个box的left值和opacity值，该如何处理，我们在下一章继续学习    

> 目录
* [返回目录](../README.md)
* [上一章-封装运动框架-基础版](../07-封装运动框架-基础版/7-封装运动框架-基础版.md)     
* [下一章-多样式动画](../09-多样式动画/9-多样式动画.md)     
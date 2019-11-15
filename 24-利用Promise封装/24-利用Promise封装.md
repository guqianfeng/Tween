# 利用Promise封装

> 练习
* 我们先来回顾下使用myTween给div做动画，比如先宽度拉长，再高度拉长，最后改透明度

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style>
            .box{
                width: 100px;
                height: 100px;
                background-color: red;
            }
        </style>
    </head>
    <body>
        <div class="box"></div>
        <script src="myTween.js"></script>
        <script>
            {
                let oBox = document.querySelector(".box");
                oBox.onclick = function(){
                    myTween({
                        el: oBox,
                        attr: {
                            width: 300,
                        },
                        fx: "bounceOut",
                        cb(){
                            myTween({
                                el: oBox,
                                attr: {
                                    height: 300,
                                },
                                fx: "bounceOut",
                                cb(){
                                    myTween({
                                        el: oBox,
                                        attr: {
                                            opacity: .5,
                                        },
                                    })
                                }
                            })
                        }
                    })
                }
            }
        </script>
    </body>
    </html>
    ```
* 我们会发现这个代码相当的恶心，传说中的回调地狱就是这样，所以对其使用promise再次封装 
* 为了区分之前的版本，我这里搞了一份副本，取名为animTween 
* 第一版代码这么改
    ```
    function myTween(option) {
        let {el, attr, duration = 500, fx = "linear", cb} = option;
        if (el.animationTimer) {
            return;
        }
        let maxC = 0; //duration优化用
        let t = 0;
        let b = {};
        let c = {};
        for (let key in attr) {
            b[key] = css(el, key);
            c[key] = attr[key] - b[key];
            maxC = Math.max(maxC, Math.abs(c[key])); //循环结束后拿到最大的变化量
        }
        if (typeof duration === "object") {
            let durationOption = duration;
            durationOption.multiple = durationOption.multiple || 2;
            duration = maxC * duration.multiple;
            duration = durationOption.max ? Math.min(duration, durationOption.max) : duration;
            duration = durationOption.min ? Math.max(duration, durationOption.min) : duration;
        }
        let d = Math.ceil(duration / (1000 / 60));
    
        let p = new Promise((resolve, reject) => {
            anim();
    
            function anim() {
                t++;
                if (t > d) {
                    cancelAnimationFrame(el.animationTimer);
                    el.animationTimer = null;
                    resolve();
                } else {
                    for (let key in attr) {
                        let val = Tween[fx](t, b[key], c[key], d);
                        css(el, key, val);
                    }
                    el.animationTimer = requestAnimationFrame(anim);
                }
            }
        });
        return p;
    }
    ```  
* 我们在测试下promise的封装    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <style>
            .box {
                width: 100px;
                height: 100px;
                background-color: red;
            }
        </style>
    </head>
    <body>
    <div class="box"></div>
    <script src="./animTween.js"></script>
    <script>
        {
            let oBox = document.querySelector(".box");
            oBox.onclick = function () {
                myTween({
                    el: oBox,
                    attr: {
                        width: 300,
                    },
                    fx: "bounceOut",
                }).then(() => {
                    return myTween({
                        el: oBox,
                        attr: {
                            height: 300,
                        },
                        fx: "bounceOut",
                    })
                }).then(() => {
                    return myTween({
                        el: oBox,
                        attr: {
                            opacity: .5,
                        },
                    })
                })
            }
        }
    </script>
    </body>
    </html>
    ```
* 通过then就没有回调地狱的问题，同样的效果不一样的代码~赞~    

* [返回目录](../README.md)
* [上一章-完整版抖动函数](../23-完整版抖动函数/23-完整版抖动函数.md) 
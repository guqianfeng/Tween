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
        } else {
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
    bounceOut: function (t, b, c, d) {
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

{
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            return setTimeout(callback, 1000 / 60)
        };
        window.cancelAnimationFrame = function (index) {
            clearTimeout(index);
        };
    }
}

const transformArr = [
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "translate",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "skewZ",
];

const normalArr = [
    "width",
    "height",
    "marginTop",
    "marginLeft",
    "marginRight",
    "marginBottom",
    "paddingTop",
    "paddingLeft",
    "paddingRight",
    "paddingBottom",
    "left",
    "right",
    "top",
    "bottom",
]; //希望能转成数字的
function css(el, attr, val) {
    if (typeof attr === "object") {
        //批量设置
        for (let key in attr) {
            css(el, key, attr[key]);
        }
        return;
    }
    if (transformArr.includes(attr)) {
        return transform(el, attr, val)
    }
    if (val === undefined) {
        let v = getComputedStyle(el)[attr];
        return (normalArr.includes(v) || !isNaN(parseFloat(v))) ? parseFloat(v) : v;
    } else {
        if (attr === "opacity") {
            el.style[attr] = val;
            el.style.filter = `alpha(opacity=${val * 100})`;//兼容
        } else if (normalArr.includes(attr)) {
            el.style[attr] = val + "px";
        } else if (attr === "zIndex") {
            el.style[attr] = Math.round(val);
        } else {
            el.style[attr] = val;
        }
    }
}

function transform(el, attr, val) {
    el.transform = el.transform || {}; //初始值，之前设置过transform就依然使用自己的，否则undefined的话设置为空对象
    if (val === undefined) {
        return el.transform[attr];
    }
    el.transform[attr] = val;
    let transformResult = "";
    for (let key in el.transform) {
        switch (key) {
            case "rotate":
            case "rotateX":
            case "rotateY":
            case "rotateZ":
            case "skew":
            case "skewX":
            case "skewY":
            case "skewZ":
                transformResult += `${key}(${el.transform[key]}deg) `;
                break;
            case "translate":
            case "translateX":
            case "translateY":
            case "translateZ":
                transformResult += `${key}(${el.transform[key]}px) `;
                break;
            case "scale":
            case "scaleX":
            case "scaleY":
            case "scaleZ":
                transformResult += `${key}(${el.transform[key]}) `;
                break;
        }
    }
    el.style.transform = transformResult.trim();
}

function myTween(option) {
    let {el, attr, duration = 500, fx = "linear"} = option;
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

myTween.stop = function (el) {
    cancelAnimationFrame(el.animationTimer);
    el.animationTimer = null;
};

function shake({el, attr, count = 15, cb}) {
    if (el.timer) {
        return;
    }
    let shakeArr = [];
    for (let i = count; i >= 0; i--) {
        shakeArr.push(i % 2 ? i : -i);
    }
    el.start = {};
    if (Array.isArray(attr)) {
        attr.forEach(item => {
            el.start[item] = css(el, item);
        })
    } else {
        el.start[attr] = css(el, attr);
    }
    move();

    function move() {
        el.timer = requestAnimationFrame(() => {
            if (shakeArr.length < 1) {
                cancelAnimationFrame(el.timer);
                el.timer = false;
                cb && cb();
            } else {
                let num = shakeArr.shift();
                for (let key in el.start) {
                    css(el, key, el.start[key] + num);
                }
                move();
            }
        })
    }
}

shake.stop = function (el) {
    cancelAnimationFrame(el.timer);
    el.timer = false;
    for (let key in el.start) {
        css(el, key, el.start[key]);
    }
};
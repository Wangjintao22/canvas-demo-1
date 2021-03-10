const content = document.getElementById('xxx');
const context = content.getContext('2d');
let lineWidth = 8;


autoSetCanvasSize(content)

listenToUser(content)


let eraserEnabled = false;
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0, 0, content.width, content.height);
}
download.onclick = function(){
    var url = content.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的作品'
    a.target = '_blank'
    a.click()
}


red.onclick = function(){
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick = function(){
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}

thin.onclick = function(){
    lineWidth = 14
}
thick.onclick = function(){
    lineWidth = 20
}

/******/

function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function() {
        setCanvasSize()
    }

    function setCanvasSize() {
        let pageWidth = document.documentElement.clientWidth
        let pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1) // 起点
    context.lineWidth = lineWidth
    context.lineCap = "round"
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenToUser(canvas) {


    let using = false
    let lastPoint = {
        x: undefined,
        y: undefined
    }
    // 特性检测
    if(document.body.ontouchstart !== undefined){
        // 触屏设备 苏菲就是个触屏设备啊哥
        canvas.ontouchstart = function(aaa){
            let x = aaa.touches[0].clientX
            let y = aaa.touches[0].clientY
            console.log(x,y)
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.ontouchmove = function(aaa){
            console.log('边摸边动')
            let x = aaa.touches[0].clientX
            let y = aaa.touches[0].clientY

            if (!using) {return}

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                const newPoint = {
                    "x": x,
                    "y": y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function(){
            console.log('摸完了')
            using = false
        }
    }else{
        // 非触屏设备
        canvas.onmousedown = function(aaa) {
            let x = aaa.clientX
            let y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function(aaa) {
            const x = aaa.clientX
            const y = aaa.clientY

            if (!using) {return}

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                const newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        }
        canvas.onmouseup = function() {
            using = false
        }
    }
}
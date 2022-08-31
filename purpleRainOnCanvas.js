function createRainOnCanvas({
    canvas,
    backgroundColor = '#151515',
    dropColor = '#ba55d3'
}) {
    let bgColor = backgroundColor
    let rainDropColor = dropColor

    canvas.style.backgroundColor = bgColor // this prevents the canvas to blink while being resized
    let canvasHeight = canvas.offsetHeight;
    let canvasWidth = canvas.offsetWidth;
    let ctx = canvas.getContext('2d');

    let drops = [];

    const fallRate = 0.8; //speed
    const maxDropHeight = 6; // drop size (it's a line)
    const maxDropWidth = 2; // drop weight 
    const maxDropDepth = 20; // drop depth will make variations between size and weight
    const momentumGain = 0.05; // aceleration
    const zdepthMomentumModifier = 0.05;//speed modifier. //0.45 will be much faster.
    let windSpeed = 0;

    class Drop {
        constructor() {
            this.x = Math.random() * (canvasWidth * 3) - (canvasWidth * 2);
            this.y = Math.random() * -canvasHeight;
            this.z = Math.floor(Math.random() * maxDropDepth + 1);

            // this.color = rainDropColor;
            this.height = (Math.random() * maxDropHeight + 10) * (this.z / maxDropDepth);
            this.momentum = fallRate * (this.z * zdepthMomentumModifier);
            this.width = (Math.random() * maxDropWidth + 1) * (this.z / maxDropDepth);
        }

        //paints the drop
        render() {
            // ctx.fillStyle = this.color;
            ctx.fillStyle = rainDropColor
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        //update drop state on window.
        update() {
            this.momentum += momentumGain;

            this.y += this.momentum;
            this.x += windSpeed;

            if (this.y >= canvasHeight) {
                this.x = Math.random() * (canvasWidth * 3) - (canvasWidth * 2);
                this.y = Math.random() * -canvasHeight;

                this.momentum = fallRate * (this.z * zdepthMomentumModifier);
            }
        }
    }

    //renders all drops
    function draw() {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        for (var i = 0; i < drops.length; i++) {
            drops[i].render();
        }
    };

    //general update.
    const update = () => {
        windSpeed = Math.sin((new Date / 1000)) + 1;

        for (var i = 0; i < drops.length; i++) {
            drops[i].update();
        }

        draw();
        setTimeout(update, 16);
    };

    const updateColor = ({ dropColor = rainDropColor, backgroundColor = bgColor }) => {
        console.log("entro")
         rainDropColor = dropColor
        bgColor = backgroundColor
    }

    //canvas size update.
    function resize() {
        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight);

        canvasHeight = window.innerHeight
        canvasWidth = window.innerWidth
    }

    //changes canvas without make it blink
    function debounce(func, time = 300) {
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }

    //autocalled function.
    (function () {
        window.onresize = debounce(resize);
        resize();

        for (let i = 0; i < 5000; i++) {
            drops.push(new Drop());
        }

        // first render
        for (let i = 0; i < 5000; i++) {
            drops.forEach((drop) => {
                drop.update();
            });
        }

        update();
    })();


    return {
        updateColor
    }
}
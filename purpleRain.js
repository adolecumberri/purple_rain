let canvasOnDocument = document.getElementById('canvas')

function createRainOnCanvas({
    canvas,
    backgroundColor = '#151515',
    dropColor = 'rgb(186,85,211)'
}) {
    canvas.style.backgroundColor = backgroundColor
    let canvasHeight = canvas.offsetHeight;
    let canvasWidth = canvas.offsetWidth;
    let ctx = canvas.getContext('2d');

    let drops = [];

    const fallRate = 1.8;
    const maxDropHeight = 6;
    const maxDropWidth = 1;
    const maxDropDepth = 20;
    const momentumGain = 0.05;
    const zdepthMomentumModifier = 0.45;

    function draw() {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        for (var i = 0; i < drops.length; i++) {
            drops[i].render();
        }
    };

    class Drop {
        constructor() {
            this.x = Math.random() * (canvasWidth * 3) - (canvasWidth * 2);
            this.y = Math.random() * -canvasHeight;
            this.z = Math.floor(Math.random() * maxDropDepth + 1);

            this.color = dropColor;
            this.height = (Math.random() * maxDropHeight + 2) * (this.z / maxDropDepth);
            this.momentum = fallRate * (this.z * zdepthMomentumModifier);
            this.width = (Math.random() * maxDropWidth + 1) * (this.z / maxDropDepth);
        }

        render() {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        update() {
            this.momentum += momentumGain;

            this.y += this.momentum;

            if (this.y >= canvasHeight) {
                this.x = Math.random() * (canvasWidth * 3) - (canvasWidth * 2);
                this.y = Math.random() * -canvasHeight;

                this.momentum = fallRate * (this.z * zdepthMomentumModifier);
            }
        }
    }

    const update = () => {
        windSpeed = Math.sin((new Date / 1000)) + 1;

        for (var i = 0; i < drops.length; i++) {
            drops[i].update();
        }

        draw();
        setTimeout(update, 16);
    };

    function resize() {
        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight);

        canvasHeight = window.innerHeight
        canvasWidth = window.innerWidth
    }

    function debounce(func, time = 300) {
        var timer;
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, time, event);
        };
    }

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

    }
}

createRainOnCanvas({ canvas: canvasOnDocument })
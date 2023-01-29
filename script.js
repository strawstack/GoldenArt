(() => {
    const GR = ((1 + Math.sqrt(5)) / 2) - 1;
    const c = document.querySelector("canvas");
    const ctx = c.getContext("2d");
    const colors = getPallets();

    const CP = colors[Math.floor(Math.random() * colors.length)];
    function setColor() {
        let c = CP[Math.floor(Math.random() * CP.length)];
        ctx.fillStyle = c;
    }

    function goldenSplit(pad, number) {
        number -= pad;
        const ap = Math.floor(number * GR);
        const bp = number - ap;
        if (Math.random() < 0.5) {
            return {ap: ap, bp: bp};
        } else {
            return {ap: bp, bp: ap};
        }
    }

    function vSplit(pad, rect) {
        const {ap, bp} = goldenSplit(pad, rect.width);
        return [
            {
                x: rect.x,
                y: rect.y,
                width: ap,
                height: rect.height
            },
            {
                x: rect.x + ap + pad, 
                y: rect.y,
                width: bp,
                height: rect.height
            }
        ];
    }

    function hSplit(pad, rect) {
        const {ap, bp} = goldenSplit(pad, rect.height);
        return [
            {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: ap
            },
            {
                x: rect.x, 
                y: rect.y + ap + pad,
                width: rect.width,
                height: bp
            }
        ];
    }

    function makeRects(pad, srcRect) {

        const limit = pad + 20;
        if (srcRect.width <= limit || srcRect.height <= limit) {
            return [srcRect];
        }

        if (Math.random() < 0.5) {
            let rects = []; 
            let res = vSplit(pad, srcRect);
            rects.push(...makeRects(pad, res[0]));
            rects.push(...makeRects(pad, res[1]));
            return rects;

        } else { // h split
            let rects = []; 
            let res = hSplit(pad, srcRect);
            rects.push(...makeRects(pad, res[0]));
            rects.push(...makeRects(pad, res[1]));
            return rects;
        }
    }

    function main() {        
        const rects = makeRects(
            10, // pad
            {
                x: 0, 
                y: 0,
                width: 360,
                height: 360
            }
        );

        rects.map(rect => {
            setColor();
            ctx.fillRect(
                rect.x, 
                rect.y, 
                rect.width, 
                rect.height
            );
        });
    }

    main();

    function getPallets() {
        return [ // from: https://colorhunt.co/
            [
                "#D61355",
                "#F94A29",
                "#FCE22A",
                "#30E3DF"
            ],
            [
                "#645CBB",
                "#A084DC",
                "#BFACE2",
                "#EBC7E6"
            ],
            [
                "#86A3B8",
                "#E8D2A6",
                "#F48484",
                "#F55050"
            ],
            [
                "#FFEA20",
                "#8DCBE6",
                "#9DF1DF",
                "#E3F6FF"
            ],
            [
                "#ABC270",
                "#FEC868",
                "#FDA769",
                "#473C33"
            ],
            [
                "#FD8A8A",
                "#F1F7B5",
                "#A8D1D1",
                "#9EA1D4"
            ],
            [
                "#C0EEE4",
                "#F8F988",
                "#FFCAC8",
                "#FF9E9E"
            ],
            [
                "#344D67",
                "#6ECCAF",
                "#ADE792",
                "#F3ECB0"
            ],
            [
                "#2A3990",
                "#9C254D",
                "#D23369",
                "#F06292"
            ],
            [
                "#2192FF",
                "#38E54D",
                "#9CFF2E",
                "#FDFF00"
            ],
            [
                "#F5EFE6",
                "#E8DFCA",
                "#AEBDCA",
                "#7895B2"
            ],
        ];
    }

})();
class Texto
{
    constructor(scene, x, y, string, style, origin)
    {
        this.scene = scene;

        this.x = x;
        this.y = y;

        this.text = string;

        this.style = this.initStyle(style);
        this.origin = this.initOrigin(origin);

        this.obj = this.createText();
    }

    initStyle(key)
    {
        let style = {
            fontFamily: 'dogica',
            fontSize : 16,
            color: 0xFFFFFF,
            align: 'center'
        }

        switch(key.toLowerCase())
        {
            case 'titulo':
                style.fontSize = 32;
                break;
            case 'carga':
                style.fontSize = 24;
        }
    }

    initOrigin(origin)
    {
        if(typeof origin === 'number')
        {
            return{
                x:origin,
                y:origin
            }
        }
        else if(typeof origin === 'object')
        {
            return origin;
        }
        else
        {
            return{
                x:0.5,
                y:0.5
            };
        }
    }

    createText()
    {
        obj = this.add.Texto(
            this.x,
            this.y,
            this.style.fontFamily,
            this.text,
            this.style.fontSize,
            this.style.align
        );

        obj.setOrigin(this.origin.x, this.origin.y);

        return obj;
    }

    destroy()
    {
        this.obj.destroy();

        this.obj = false;
    }
}
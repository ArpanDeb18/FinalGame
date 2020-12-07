class People{

    constructor(x, y, w, h){

        this.body = Bodies.rectangle(x, y, w, h);

         
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

    }

    display(){

        var peoplePos = this.body.position;

        fill("green");
        rectMode(CENTER);
        rect(peoplePos.x, peoplePos.y, 20, 20);

        console.log(peoplePos);
    }

}

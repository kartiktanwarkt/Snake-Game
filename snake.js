function init()
{
    var canvas=document.getElementById('mycanvas');
    W=H=canvas.width=canvas.height=1000;
    pen=canvas.getContext('2d');
    cs=40;
    score=5;

    game_over=false;
    food_img=new Image();
    food_img.src="./assets/apple.png";

    trophy=new Image();
    trophy.src="./assets/trophy.png";

    food =getrandomfood();

    
    snake ={
        init_len:5,
        color:"blue",
        cell:[],
        direction:"right",

        createsnake:function(){
            for(var i=this.init_len;i>0;i--){
                this.cell.push({x:i,y:0});
            }
        },
        drawsnake:function(){
            for(var i=0;i<this.cell.length;i++)
            {
                pen.fillStyle=this.color;
                pen.fillRect(this.cell[i].x*cs,this.cell[i].y*cs,cs-2,cs-2);
            }
        },
        updatesnake:function(){
            console.log("updating the snake according to the direction of snake");
            
            var headX=this.cell[0].x;
            var headY=this.cell[0].y;
            if(headX==food.x && headY==food.y)
            {
                console.log("food eaten");
                food=getrandomfood();
                score++;
            }
            else{
                this.cell.pop();
            }
            var nextX,nextY;
            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
            else if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;
            }
            else{
                nextX=headX;
                nextY=headY-1;
            }
           
            this.cell.unshift({x:nextX,y:nextY});

            var last_x= Math.round(W/cs);
            var last_y= Math.round(H/cs);

            if(this.cell[0].x<0 || this.cell[0].y<0 || this.cell[0].x>last_x ||this.cell[0].y>last_y){
                game_over=true;
            }
            let hdX = this.cell[0].x;
            let hdY = this.cell[0].y;
            for (let i = 1; i < this.cell.length; i++) {
                if (hdX == this.cell[i].x && hdY == this.cell[i].y) {
                    game_over = true;
                }
            }
        }

    }
    snake.createsnake();
    function keypressed(e){
        if (e.key == "ArrowDown") {
            if (snake.direction != "up") {
                snake.direction = "down";
            }
        } else if (e.key == "ArrowUp") {
            if (snake.direction != "down") {
                snake.direction = "up";
            }
        } else if (e.key == "ArrowLeft") {
            if (snake.direction != "right") {
                snake.direction = "left";
            }
        } else if (e.key == "ArrowRight") {
            if (snake.direction != "left") {
                snake.direction = "right";
            }
        }
        console.log(snake.direction);
    }

    document.addEventListener('keydown',keypressed);
}

function draw()
{
    pen.clearRect(0,0,W,H);
    snake.drawsnake();
    pen.fillStyle =food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

    pen.drawImage(trophy,18,20,cs,cs);
    pen.fillStyle="blue";
    pen.font="25px Robonto";
    pen.fillText(score,35,37);
}
function update()
{
    snake.updatesnake();


}
function getrandomfood(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    var food={
        x:foodX,
        y:foodY,
        color:"red",

    }
    return food
}

function gameloop()
{
    if(game_over==true){
        clearInterval(f);
        alert("Game Over");
        return;
    }
    draw();
    update();
}

init();
var f=setInterval(gameloop,100);
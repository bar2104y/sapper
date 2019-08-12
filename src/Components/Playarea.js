import React from 'react';
import '../Css/game.css'
import { Panel, Button, Group, PanelHeader } from '@vkontakte/vkui';




class Playarea extends React.Component {
    constructor (props){
        super(props);

        this.canvSize = window.innerWidth*0.9
        this.lineWidth = 2
        this.areaSize = 10
        this.step = (this.canvSize-(2*this.lineWidth))/this.areaSize
        this.area = []
        this.firstPress = true
        this.score = this.areaSize*this.areaSize
        this.openedMines = []

        this.sec = 0
        this.min = 0

        this.areaOpen = []
        for (let i = 0; i<this.areaSize; i++){
            this.areaOpen[i] = []
            for ( let j = 0; j < this.areaSize; j++){
                this.areaOpen[i][j] = 0
            }
        }

        this.getPosByIndex = this.getPosByIndex.bind(this)
        this.selectRect = this.selectRect.bind(this)
        this.genArea = this.genArea.bind(this)
        this.isMine = this.isMine.bind(this)
        this.isClear = this.isClear.bind(this)
        this.getMinesInBlock = this.getMinesInBlock.bind(this)
        this.timer = this.timer.bind(this)        
    }
    componentDidMount(){
        this.canvas = this.refs.canvas
        this.ctx = this.refs.canvas.getContext('2d')
        this.canvas.addEventListener('click', this.selectRect)
        this.createCanvas()

        setInterval( this.timer, 1000)
    }

    timer(){
        this.sec++
            if (this.sec == 60){
                this.min++
                this.sec = 0
            }
            let s = ''
            if (this.min < 10) s += '0'
            s += this.min + ':'
            if (this.sec <10 ) s+= '0'
            s+=this.sec

            document.getElementById('time').innerHTML = s
    }

    //Получение левого верзнего угла ячейки
    getPosByIndex(x){
        return(x*this.step+this.lineWidth)
    }

    //Создание заготовки игрового поля
    createCanvas(){
        //инициализация холста
        const ctx = this.refs.canvas.getContext('2d')

        //Заполнение фона
        this.ctx.fillStyle="#9E9E9E";
        this.ctx.fillRect(0,0,this.canvSize,this.canvSize);

        //Прорисовка линий
        this.ctx.beginPath()
        this.ctx.lineWidth = this.lineWidth

        for(let i = this.lineWidth; i<=this.canvSize; i+=this.step ){
            ctx.moveTo(0,i)
            ctx.lineTo(this.canvSize,i)
            ctx.moveTo(i,0)
            ctx.lineTo(i,this.canvSize)
        }

        //Отображение изменений
        ctx.strokeStyle="#333"
        ctx.stroke()

    }

    //При клике на поле
    selectRect(e){
        //console.log(e)
        //Инициализация холста
        const canvas = document.getElementById("canvas")
        const ctx = canvas.getContext('2d')
        this.canvas = document.getElementById("canvas")
        this.ctx = canvas.getContext('2d')


        ctx.beginPath()
        ctx.fillStyle="#5E5E5E";
        
        //Получение координат клика
        let xPos = e.clientX-e.target.offsetLeft
        let yPos = e.clientY-e.target.offsetTop

        //Определение ячейки
        let xIndex = Math.floor(xPos/this.step)
        let yIndex = Math.floor(yPos/this.step)

        //Координаты левого верхнего угла ячейки
        xPos = this.getPosByIndex(xIndex)
        yPos = this.getPosByIndex(yIndex)
        console.log(xPos, yPos)
        
        //Определение первого клика
        if (this.firstPress){
            ctx.fillRect(xPos,yPos, this.step, this.step)
            this.firstPress = false
            this.genArea(xIndex,yIndex)
            
            this.areaOpen[xIndex][yIndex] = 2

            this.openBlock(xIndex,yIndex)
            /*this.ctx.fillStyle = 'whitesmoke'
            this.ctx.font = "bold " + Math.floor(this.step/1.5) + "pt sans-serif"
            this.ctx.textBaseline = "center"
            this.ctx.fillText(this.getMinesAround(xIndex,yIndex),xPos+this.step/4,yPos+this.step/1.1)
        */
            this.lastblock= [xIndex+1,yIndex+1]
        } else{
            //Клик - выделение
            //отмена предыдущего выделения
            if (this.areaOpen[this.lastblock[0]][this.lastblock[1]] < 2){
                ctx.fillStyle="#9E9E9E";
                ctx.fillRect(this.getPosByIndex(this.lastblock[0]),
                    this.getPosByIndex(this.lastblock[1]),
                    this.step, this.step)
            }

            //Запомнить выбор
            this.lastblock = [xIndex,yIndex]
            
            //выделение ячейки
            if(this.areaOpen[xIndex][yIndex] < 2){
                ctx.fillStyle="#7E7E7E";
                ctx.fillRect(xPos,yPos, this.step, this.step)
            }
            
        }
        
        //перерисовка прямых, костыль
        ctx.lineWidth = this.lineWidth/2
        for(let i = this.lineWidth; i<=this.canvSize; i+=this.step ){
            ctx.moveTo(0,i)
            ctx.lineTo(this.canvSize,i)
            ctx.moveTo(i,0)
            ctx.lineTo(i,this.canvSize)
        }
        //Отображение изменений
        ctx.stroke()
    }

    //Генерация мин
    genArea(x,y){
        //Инициализация массива
        let a = []
        for (let i = 0; i<this.areaSize; i++){
            a[i] = []
            for ( let j = 0; j < this.areaSize; j++){
                a[i][j] = 0
            }
        }
        

        //Генерация мин
        let nx,ny
        let i = 0
        console.log(a)
        while (i< this.areaSize){
            nx = Math.floor(Math.random()*10)
            ny = Math.floor(Math.random()*10)

            if((nx != x || ny != y) && a[nx][ny] == 0){
                a[nx][ny] = 1
                i++
            }
        }
        console.log('Кол-во мин: ', i)
        //Запись в глобальную переменную
        console.log(a)
        this.area = a

    }

    //Клик на кнопку МИНА
    isMine(){
        //console.log('Мина,едрить ее')
        let xIndex = this.lastblock[0]
        let yIndex = this.lastblock[1]
        //Позиция курсора
        let xPos = this.getPosByIndex( xIndex)
        let yPos = this.getPosByIndex( yIndex)
        //Заливка ячейки красным цветом
        this.ctx.fillStyle="darkred";
        this.ctx.fillRect(xPos,yPos, this.step, this.step)
        //Помечаем как предпологаемую мину
        this.areaOpen[xIndex][yIndex] = 3
        this.openedMines.push([xIndex,yIndex])
        console.log(this.openedMines)
        
        
        if (this.openedMines.length == this.areaSize){
            let f = true
            console.log(this.openedMines)
            for (let i = 0; i< this.openedMines.length; i++){
                if (this.area[this.openedMines[i][0]][this.openedMines[i][1]] == 0) f = false
            }
            if (f){
                this.winGame()
            }
        }

    }

    //Нажатие на кнопку ПУСТО
    isClear(){
        //console.log('Вроде чисто')
        
        //Получение ячейки
        let xIndex = this.lastblock[0]
        let yIndex = this.lastblock[1]

        //Если мина, то ГГ
        if (this.area[xIndex][yIndex] == 1){
            console.log('This is the end.......')
            this.ctx.fillStyle="darkred";
            this.ctx.fillRect(0,0,this.canvSize,this.canvSize);
        //Если пустоая, то открываем ее
        }else if (this.area[xIndex][yIndex] == 0 || this.areaOpen[xIndex][yIndex] == 3){
            if (this.areaOpen[xIndex][yIndex] == 3){
                for (let i = 0; i< this.openedMines.length; i++){
                    if (this.openedMines[i][0] == xIndex && this.openedMines[i][1] == yIndex){
                        this.openedMines.splice(i,1)
                    }
                }
            }
            this.openBlock(xIndex,yIndex)
            this.score --
        }

        let cnt = 0
        for (let i = 0; i<this.areaSize; i++){
            for ( let j = 0; j < this.areaSize; j++){
                if (this.areaOpen == 2 )
                    cnt ++
            }
        }

        if (cnt == this.areaSize*this.areaSize-this.areaSize)
            this.winGame()



        document.getElementById("scores").innerHTML = this.score
        console.log(this.area)
    }

    //Проверка ячейки на наличие мин
    getMinesInBlock(x,y){
        //Проаерка на границы поля
        if (x<0 || y<0 || x>=this.areaSize || y >= this.areaSize) return 0
        //Если мина, то 1
        else if (this.area[x][y] == 1) return 1
        else return 0
    }

    getMinesAround(x,y){
        let cnt = 0 // Кол-во мин
        
        //Перебор ячеек вокруг
        cnt += this.getMinesInBlock(x+1,y-1)
        cnt += this.getMinesInBlock(x+1,y)
        cnt += this.getMinesInBlock(x+1,y+1)
        cnt += this.getMinesInBlock(x,y-1)
        cnt += this.getMinesInBlock(x,y+1)
        cnt += this.getMinesInBlock(x-1,y-1)
        cnt += this.getMinesInBlock(x-1,y)
        cnt += this.getMinesInBlock(x-1,y+1)
        //Возвращаем количество мин
        return(cnt)
    }

    openBlock(xIndex,yIndex){
        //Проверка на границы поля
        if (xIndex<0 || yIndex < 0 || xIndex >= this.areaSize || yIndex >= this.areaSize)
        return(0)

        //помечаем как открытую
        this.areaOpen[xIndex][yIndex] = 2

        //левый верхний угол ячейки
        let xPos = this.getPosByIndex(xIndex)
        let yPos = this.getPosByIndex(yIndex)

        //Закрашиваем как открытую
        this.ctx.fillStyle="#5E5E5E";
        this.ctx.fillRect(xPos,yPos, this.step, this.step)
        
        //Если вокруг мин нет, открываем ячейки
        if (this.getMinesAround(xIndex,yIndex) == 0 ){
            //по очереди открываем ячейки вор=круг, try-catch ловит выход за пределы поля
            try{ if (this.area[xIndex+1][yIndex+1] == 0 && this.areaOpen[xIndex+1][yIndex+1] != 2) this.openBlock(xIndex+1,yIndex+1)} catch(e){}
            try{ if (this.area[xIndex+1][yIndex] == 0   && this.areaOpen[xIndex+1][yIndex+1] != 2) this.openBlock(xIndex+1,yIndex)} catch(e){}
            try{ if (this.area[xIndex+1][yIndex-1] == 0 && this.areaOpen[xIndex+1][yIndex-1] != 2) this.openBlock(xIndex+1,yIndex-1)} catch(e){}
            try{ if (this.area[xIndex][yIndex+1] == 0   && this.areaOpen[xIndex][yIndex+1] != 2) this.openBlock(xIndex,yIndex+1)} catch(e){}
            try{ if (this.area[xIndex][yIndex-1] == 0   && this.areaOpen[xIndex][yIndex-1] != 2) this.openBlock(xIndex,yIndex-1)} catch(e){}
            try{ if (this.area[xIndex-1][yIndex+1] == 0 && this.areaOpen[xIndex-1][yIndex+1] != 2) this.openBlock(xIndex-1,yIndex+1)} catch(e){}
            try{ if (this.area[xIndex-1][yIndex] == 0   && this.areaOpen[xIndex-1][yIndex] != 2) this.openBlock(xIndex-1,yIndex)} catch(e){}
            try{ if (this.area[xIndex-1][yIndex-1] == 0 && this.areaOpen[xIndex-1][yIndex-1] != 2) this.openBlock(xIndex-1,yIndex-1)} catch(e){}

        } else{
            //Если есть мины вокруг, пишем их количество
            this.ctx.fillStyle = 'whitesmoke'
            this.ctx.font = "bold " + Math.floor(this.step/1.5) + "pt sans-serif"
            this.ctx.textBaseline = "center"
            this.ctx.fillText(this.getMinesAround(xIndex,yIndex),xPos+this.step/4,yPos+this.step/1.1)
        }
        
    }

    winGame(){
        this.ctx.fillStyle="green";
        this.ctx.fillRect(0,0,this.canvSize,this.canvSize);
    }
    
    render(){
        return(
            <Panel id={this.props.id}>
                <PanelHeader>
                    Сапер
                </PanelHeader>
                <div>
                    <div className="topMenu" >
                        <div id="scores">{this.score}</div>
                        <div id="time">00:00</div>
                    </div>
                    <div className="gameContainer">
                        <canvas id="canvas" ref="canvas" width={this.canvSize} height={this.canvSize} />
                    </div>
                    <div className="buttonContainer">
                        <div onClick={this.isMine}>
                            Мина
                        </div>
                        <div onClick={this.isClear}>
                            Пусто
                        </div>
                    </div>
                    <div className="backBtn" onClick={this.props.go} data-to="home">Домой</div>
                </div>
            </Panel>
        )
    }
}

export default Playarea
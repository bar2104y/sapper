import React from 'react';
import '../Css/game.css'
import { Panel, PanelHeader } from '@vkontakte/vkui';




class Playarea extends React.Component {
    constructor (props){
        super(props);
        this.resetData = this.resetData.bind(this)
        this.resetData()

        //Подключение функций (объясните мне зачем это вообще нужно)
        this.getPosByIndex = this.getPosByIndex.bind(this)
        this.selectRect = this.selectRect.bind(this)
        this.genArea = this.genArea.bind(this)
        this.isMine = this.isMine.bind(this)
        this.isClear = this.isClear.bind(this)
        this.getMinesInBlock = this.getMinesInBlock.bind(this)
        
        this.winGame = this.winGame.bind(this)
        this.filedGame = this.filedGame.bind(this)
    }
    componentDidMount(){
        //иницианализация холста
        this.canvas = this.refs.canvas
        this.ctx = this.refs.canvas.getContext('2d')
        // Прослушиваем событие клика
        this.canvas.addEventListener('click', this.selectRect)
        //Подготавливаем холст
        this.createCanvas()
    }

    componentDidUpdate(){
        this.resetData()
    }

    resetData(){
        this.canvSize = window.innerWidth*0.9    //Размер холста px
        this.lineWidth = 2                       //Толщина линии px
        this.areaSize = 10                       //Кол-во ячеек в стороне
        this.step = (this.canvSize-(2*this.lineWidth))/this.areaSize //Ширина и высота клетки
        this.area = []                           // Массив мина/не мина
        this.firstPress = true                   //Первый клик
        this.score = this.areaSize*this.areaSize //Стартовое кол-во очков
        this.openedMines = []                       //Открытые ячейки

        //Подготовка массива с открытыми ячейками
        this.areaOpen = []
        for (let i = 0; i<this.areaSize; i++){
            this.areaOpen[i] = []
            for ( let j = 0; j < this.areaSize; j++){
                this.areaOpen[i][j] = 0
            }
        }
    }

    //Получение левого верзнего угла ячейки
    getPosByIndex(x){
        return(x*this.step+this.lineWidth)
    }

    //Создание заготовки игрового поля
    createCanvas(){
        //Заполнение фона
        this.ctx.fillStyle="#9E9E9E";
        this.ctx.fillRect(0,0,this.canvSize,this.canvSize);

        //Прорисовка линий
        this.ctx.beginPath()
        this.ctx.lineWidth = this.lineWidth

        for(let i = this.lineWidth; i<=this.canvSize; i+=this.step ){
            this.ctx.moveTo(0,i)
            this.ctx.lineTo(this.canvSize,i)
            this.ctx.moveTo(i,0)
            this.ctx.lineTo(i,this.canvSize)
        }

        //Отображение изменений
        this.ctx.strokeStyle="#333"
        this.ctx.stroke()

    }

    //При клике на поле
    selectRect(e){

        this.ctx.beginPath()
        this.ctx.fillStyle="#5E5E5E";
        
        //Получение координат клика
        let xPos = e.clientX-e.target.offsetLeft
        let yPos = e.clientY-e.target.offsetTop

        //Определение ячейки
        let xIndex = Math.floor(xPos/this.step)
        let yIndex = Math.floor(yPos/this.step)

        //Координаты левого верхнего угла ячейки
        xPos = this.getPosByIndex(xIndex)
        yPos = this.getPosByIndex(yIndex)
        
        //Определение первого клика
        if (this.firstPress){
            // пометить как открытый
            this.ctx.fillRect(xPos,yPos, this.step, this.step)
            this.firstPress = false
            this.genArea(xIndex,yIndex)
            
            this.areaOpen[xIndex][yIndex] = 2

            this.openBlock(xIndex,yIndex)
            this.lastblock= [xIndex+1,yIndex+1]
        } else{
            //отмена предыдущего выделения
            if (this.areaOpen[this.lastblock[0]][this.lastblock[1]] < 2){
                this.ctx.fillStyle="#9E9E9E";
                this.ctx.fillRect(this.getPosByIndex(this.lastblock[0]),
                    this.getPosByIndex(this.lastblock[1]),
                    this.step, this.step)
            }

            //Запомнить выбор
            this.lastblock = [xIndex,yIndex]
            
            //выделение ячейки
            if(this.areaOpen[xIndex][yIndex] < 2){
                this.ctx.fillStyle="#7E7E7E";
                this.ctx.fillRect(xPos,yPos, this.step, this.step)
            }
            
        }
        
        //перерисовка прямых, костыль
        this.ctx.lineWidth = this.lineWidth/2
        for(let i = this.lineWidth; i<=this.canvSize; i+=this.step ){
            this.ctx.moveTo(0,i)
            this.ctx.lineTo(this.canvSize,i)
            this.ctx.moveTo(i,0)
            this.ctx.lineTo(i,this.canvSize)
        }
        //Отображение изменений
        this.ctx.stroke()
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
        while (i< this.areaSize){
            nx = Math.floor(Math.random()*10)
            ny = Math.floor(Math.random()*10)

            if((nx !==x || ny !==y) && a[nx][ny] === 0){
                a[nx][ny] = 1
                i++
            }
        }
        
        //Запись в глобальную переменную
        
        this.area = a

    }

    //Клик на кнопку МИНА
    isMine(){
        
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
        
        
        //Все ли мины подсвечены
        if (this.openedMines.length === this.areaSize){
            let f = true
            //Все ли из подсвеченных верны
            for (let i = 0; i< this.openedMines.length; i++){
                if (this.area[this.openedMines[i][0]][this.openedMines[i][1]] === 0) f = false
            }
            //Если подсвечены все, и помечены верно, то победа игрока
            if (f){
                this.winGame()
            }
        }

    }

    //Нажатие на кнопку ПУСТО
    isClear(){
        //Получение ячейки
        let xIndex = this.lastblock[0]
        let yIndex = this.lastblock[1]

        //Если мина, то ГГ
        if (this.area[xIndex][yIndex] === 1){
            this.filedGame()
        //Если пустоя, то открываем ее
        }else if (this.area[xIndex][yIndex] === 0 || this.areaOpen[xIndex][yIndex] === 3){
            //Если ранее ячейка была подсвечена как мина
            if (this.areaOpen[xIndex][yIndex] === 3){
                for (let i = 0; i< this.openedMines.length; i++){
                    //удаляем информацию о пометке
                    if (this.openedMines[i][0] === xIndex && this.openedMines[i][1] === yIndex){
                        this.openedMines.splice(i,1)
                    }
                }
            }
            //Открываем эту ячейку
            this.openBlock(xIndex,yIndex)
            //Меняем кол-во очков
            this.score --
        }
        //Подсчитываем кол-во открытых пустых клеток
        let cnt = 0
        for (let i = 0; i<this.areaSize; i++){
            for ( let j = 0; j < this.areaSize; j++){
                if (this.areaOpen[i][j] === 2 )
                    cnt ++
            }
        }
        //Если все чистые открыты, то победа игрока
        if (cnt === this.areaSize*this.areaSize-this.areaSize)
            this.winGame()
        //Выводим кол-во очков на экран
        document.getElementById("scores").innerHTML = this.score
    }

    //Проверка ячейки на наличие мин
    getMinesInBlock(x,y){
        //Проаерка на границы поля
        if (x<0 || y<0 || x>=this.areaSize || y >= this.areaSize) return 0
        //Если мина, то 1
        else if (this.area[x][y] === 1) return 1
        else return 0
    }

    //Кол-во мин вокруг клетки
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

    //ОТкрытие ячейки
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
        if (this.getMinesAround(xIndex,yIndex) === 0 ){
            //по очереди открываем ячейки вор=круг, try-catch ловит выход за пределы поля
            try{ if (this.area[xIndex+1][yIndex+1] === 0 && this.areaOpen[xIndex+1][yIndex+1] !==2) this.openBlock(xIndex+1,yIndex+1)} catch(e){}
            try{ if (this.area[xIndex+1][yIndex] === 0   && this.areaOpen[xIndex+1][yIndex+1] !==2) this.openBlock(xIndex+1,yIndex)} catch(e){}
            try{ if (this.area[xIndex+1][yIndex-1] === 0 && this.areaOpen[xIndex+1][yIndex-1] !==2) this.openBlock(xIndex+1,yIndex-1)} catch(e){}
            try{ if (this.area[xIndex][yIndex+1] === 0   && this.areaOpen[xIndex][yIndex+1] !==2) this.openBlock(xIndex,yIndex+1)} catch(e){}
            try{ if (this.area[xIndex][yIndex-1] === 0   && this.areaOpen[xIndex][yIndex-1] !==2) this.openBlock(xIndex,yIndex-1)} catch(e){}
            try{ if (this.area[xIndex-1][yIndex+1] === 0 && this.areaOpen[xIndex-1][yIndex+1] !==2) this.openBlock(xIndex-1,yIndex+1)} catch(e){}
            try{ if (this.area[xIndex-1][yIndex] === 0   && this.areaOpen[xIndex-1][yIndex] !==2) this.openBlock(xIndex-1,yIndex)} catch(e){}
            try{ if (this.area[xIndex-1][yIndex-1] === 0 && this.areaOpen[xIndex-1][yIndex-1] !==2) this.openBlock(xIndex-1,yIndex-1)} catch(e){}

        } else{
            //Если есть мины вокруг, пишем их количество
            this.ctx.fillStyle = 'whitesmoke'
            this.ctx.font = "bold " + Math.floor(this.step/1.5) + "pt sans-serif"
            this.ctx.textBaseline = "center"
            this.ctx.fillText(this.getMinesAround(xIndex,yIndex),xPos+this.step/4,yPos+this.step/1.1)
        }
        
    }

    //Конец игры, победа
    winGame(){
        this.ctx.fillStyle="green";
        this.ctx.fillRect(0,0,this.canvSize,this.canvSize);
        //WIP
    }

    //Проигрыш
    filedGame(){
        this.ctx.fillStyle="darkred";
        this.ctx.fillRect(0,0,this.canvSize,this.canvSize);
        //WIP
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
                        <div id="time">Сапёр</div>
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
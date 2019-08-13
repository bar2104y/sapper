import React from 'react';
import '../Css/game.css'
import { Panel, PanelHeader,Group,Cell } from '@vkontakte/vkui';

//const URL = 'https://iskatel.msk.ru/sapper/sapper.php?type=get'

class Leaders extends React.Component {
    constructor (props){
        super(props);

        this.leadersList = []
    }
    componentDidMount(){
        //fetch(URL, options).then(response => console.log(response))
    }

    componentDidUpdate(){

    }

    
    render(){
        return(
            <Panel id={this.props.id}>
                <PanelHeader>
                    Сапер - Таблица лидеров
                </PanelHeader>
                <Group title="Топ-20">
                    <Cell>HackerOK</Cell>
                </Group>
            </Panel>
        )
    }
}

export default Leaders
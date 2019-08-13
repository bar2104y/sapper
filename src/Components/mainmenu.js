import React from 'react';
import '../Css/mainmenu.css'

class Mainmenu extends React.Component {
    render(){
        return(
            <div className="mainMenuConatainer">
                <div className="actionButton" onClick={this.props.go} data-to="play"><p>Играть</p></div>
                <div className="actionButton" onClick={this.props.go} data-to="leaders"><p>Лидеры</p></div>
                <div className="actionButton" onClick={this.props.share} data-to="share"><p>Поделиться</p></div>
            </div>
        )
    }
}

export default Mainmenu
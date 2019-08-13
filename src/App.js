import React from 'react';
import './App.css';
import Home from './Pannels/Home'

import connect from '@vkontakte/vkui-connect';

import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Playarea from './Components/Playarea';
import Leaders from './Components/Leaders';


class App extends React.Component {

  constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
		};
  }

  componentDidMount() {
    connect.send("VKWebAppInit", {}); 

		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
          this.setState({fetchedUser : e.detail.data}) ;
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}
  
  //Переход на новую панель
  go = (e) => {
    this.setState({ activePanel: e.currentTarget.dataset.to })
  };

  //Диалоговое окно поделиться
  share = (e) =>{
    connect.send("VKWebAppShare", {"link": "https://vk.com/app7094427"})
  }
  
  render(){
    return (
    <View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} share={this.share} />
        <Playarea id="play" go={this.go} />
        <Leaders id="leaders" go={this.go} />
    </View>
    );
    }
}

export default App;

import React from 'react';
import './App.css';
import Home from './Pannels/Home'

import connect from '@vkontakte/vkui-connect';

import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import Playarea from './Components/Playarea';


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
          console.log(e.detail.data)
          this.setState({fetchedUser : e.detail.data}) ;
          console.log(this.state.fetchedUser)
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}
  
  go = (e) => {
    this.setState({ activePanel: e.currentTarget.dataset.to })
    console.log( e.currentTarget.dataset.to )
  };
  
  render(){
    return (
    <View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
        <Playarea id="play" go={this.go} />
    </View>
    );
    }
}

export default App;

import React from 'react';
import logo from './logo.svg';
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
  
  go = (e) => {
    this.setState({ activePanel: e.currentTarget.dataset.to })
    console.log( e.currentTarget.dataset.to )
  };
  
  render(){
    return (
    <View activePanel={this.state.activePanel}>
				<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} publish={this.publish} joinToGroup={this.joinToGroup} />
        <Playarea id="play" go={this.go} />
    </View>
    );
    }
}

export default App;

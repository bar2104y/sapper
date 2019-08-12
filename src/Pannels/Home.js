import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, } from '@vkontakte/vkui';
import Mainmenu from '../Components/mainmenu'

/*<Group title={fetchedUser.first_name+' '+fetchedUser.last_name}>
		</Group>
		*/

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id} >
		<PanelHeader>
            Сапер
        </PanelHeader>
		
		<Mainmenu go={go} />
		
        
        
	</Panel>
);

Home.propTypes = {
	id: PropTypes.string.isRequired,
	go: PropTypes.func.isRequired,
	fetchedUser: PropTypes.shape({
		photo_200: PropTypes.string,
		first_name: PropTypes.string,
		last_name: PropTypes.string,
		city: PropTypes.shape({
			title: PropTypes.string,
		}),
	}),
};

export default Home;
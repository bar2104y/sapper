import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Group, PanelHeader, ListItem, Avatar} from '@vkontakte/vkui';
import Mainmenu from '../Components/mainmenu'

const Home = ({ id, go, fetchedUser }) => (
	<Panel id={id}>
		<PanelHeader>Сапер</PanelHeader>
		{fetchedUser &&
		<Group title="Добро пожаловать!">
			<ListItem
				before={fetchedUser.photo_200 ? <Avatar src={fetchedUser.photo_200}/> : null}
				description={fetchedUser.city && fetchedUser.city.title ? fetchedUser.city.title : ''}
			>
				{`${fetchedUser.first_name} ${fetchedUser.last_name}`}
			</ListItem>
			<Mainmenu go={go} />
		</Group>}

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
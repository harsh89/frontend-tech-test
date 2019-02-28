import React, { Component } from 'react';
import List from '../containers/List';
import InputContainer from '../containers/InputContainer';
import '../scss/common.scss';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<article className="app-container">
        <InputContainer></InputContainer>
        <List> </List>
			</article>
		);
	}
}

export default App;

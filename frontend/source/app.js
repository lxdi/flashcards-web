import React from 'react';
import ReactDOM from 'react-dom';

import {Main} from './ui/main'
import {LeftSideBarContent} from './ui/left-side-bar-content'
import {OverlayInfo} from './ui/overlay'

import {DeckModal} from './ui/deck-modal'

import './data/deck-dao'

ReactDOM.render(<div id="app" />, document.body);
const app = document.getElementById("app");

function rerender(){
	ReactDOM.render(
		<div style={{margin:'3px'}}>
				<OverlayInfo />
				<DeckModal/>
				<div>
					<Main />
				</div>
		</div>, app);
}

rerender();

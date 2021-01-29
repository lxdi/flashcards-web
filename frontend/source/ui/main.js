import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt, registerObject} from 'absevents'
//import {SwitchButton} from './changebutton';

export class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
					<table class='frames-table'>
									<tr>
										<td class='frame-td-3f'>TODO...</td>
									</tr>
								</table>
			</div>
		)
	}
}

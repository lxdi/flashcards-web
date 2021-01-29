import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Table} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt, registerObject} from 'absevents'
//import {SwitchButton} from './changebutton';

export class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {}

		registerReaction('main-ui', 'deck-rep', ['all-response'], (stSetter)=>this.setState({}))
	}

	render() {
		return (
			<div>
					<Button bsStyle="default" bsSize='xsmall' onClick={() => fireEvent('deck-modal', 'open', [{id: 'new'}])}>Create Deck</Button>
					<div>
						{deckListUI()}
					</div>
			</div>
		)
	}
}


const deckListUI = function(){
  const result = []

	if(chkSt('deck-rep', 'objects')==null){
		fireEvent('deck-rep', 'all-request')
		return 'Loading...'
	}
	const decks = Object.values(chkSt('deck-rep', 'objects'))

  decks.forEach(deck => {
    const style = {} // task.repetition != null && task.repetition.id == rep.id? {fontWeight:'bold'}:{}
    result.push( <tr id={deck.id} style={style}>
                    <td>
                      <a href='#' onClick={()=>fireEvent("deck-modal", 'open', [deck])}>{deck.title}</a>
                    </td>
                  </tr>)
  })

  return <Table striped bordered condensed hover >
          <tbody>
            <tr>
              <td>Title</td>
            </tr>
            {result}
          </tbody>
          </Table>
}

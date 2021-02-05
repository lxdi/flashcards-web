import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Table} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt, registerObject} from 'absevents'
//import {SwitchButton} from './changebutton';

import {EntityList} from './common/entity-list'
import {EntityModal} from './common/entity-modal'
import {RepeatModal} from './repetition/repeat-modal'
import {WordsTable} from './words-table'

export class Main extends React.Component {
	constructor(props){
		super(props);
		this.state = {}

		registerReaction('main-ui', 'deck-rep', ['all-response', 'created', 'updated', 'deleted'], (stSetter)=>this.setState({}))
	}

	render() {
		return (
			<div style={{textAlign: 'center'}}>
					{getModals()}
					<div style={{marginBottom: '10px'}}>
						<Button bsStyle="default" size='sm' onClick={() => fireEvent('deck-modal', 'open', [{id: 'new'}])}>Create Deck</Button>
					</div>
					<div style={{width:'50%', maxWidth:'800px', display: 'table', marginLeft: 'auto', marginRight:'auto'}}>
						<EntityList ents='deck-rep' modalName='deck-modal' model={[{link:true, name:'Title', prop:'title'}, {custom: (deck)=>getRepeatLink(deck), name: '', style:{width: '20%'}}]} />
					</div>
			</div>
		)
	}
}

const getModals = function(){
	return <div>
						<EntityModal title={'Deck'} name={'deck-modal'} full={true} mode={'update'} repName='deck-rep' additionalReactions={['word-modal']} styleClass={'deck-modal-class'}
									fields={[
										{type:'text', valName:'title', label:'Title'},
										{type:'custom', content: (deck, parent, isEdit)=> <WordsTable deck={deck} isEdit={isEdit} />}
									]}/>

						<EntityModal title={'Word'} name={'word-modal'} full={false} mode={{parentValName:'words'}} styleClass={'word-modal-class'}
				              fields={[
				                {type:'text', valName:'value', label:'Value'},
				                {type:'list', valName:'wordDefs', modalName:'word-def-modal', label:'Definition', model:[{link:true, name:'Definition', prop:'definition'}]},
												{type:'list', valName:'wordLinks', modalName:'word-link-modal', label:'Link', model:[{link:true, name:'Url', prop:'url'}]}
				                ]}
				              />

						<EntityModal title={'Word Definition'} name={'word-def-modal'} full={false} mode={{parentValName:'wordDefs'}} styleClass={'word-def-modal-class'}
											fields={[
												{type:'text', valName:'definition', label:'Definition'},
												{type:'list', valName:'hints', modalName:'word-def-hint-modal', label:'Hints', model:[{link:true, name:'Hint', prop:'hint'}]}
											]}
											/>

						<EntityModal title={'Word Link'} name={'word-link-modal'} full={false} mode={{parentValName:'wordLinks'}}
											fields={[{type:'text', valName:'url', label:'Url'}]}
											/>

						<EntityModal title={'Word Def Hint'} name={'word-def-hint-modal'} full={false} mode={{parentValName:'hints'}}
											fields={[{type:'text', valName:'hint', label:'Hint'}]}
											/>

						<RepeatModal/>
					</div>
}

const getRepeatLink = function(deck){
	return <a href='#' onClick={()=>fireEvent('repeat-modal', 'open', [deck])}>Repeat</a>
}

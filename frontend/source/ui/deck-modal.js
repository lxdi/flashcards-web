import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonToolbar,  DropdownButton, MenuItem,  FormGroup, ControlLabel, FormControl, Alert} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

import {CommonModal} from './common-modal'
import {CommonCrudeTemplate} from './common-crud-template'
import {StatefulTextField} from './common/stateful-text-field'
import {TextFields} from './common/text-fields'

const newObjId = "new"
const hoursDefault = 1

const createState = function(isOpen, isStatic, isEdit, deck){
  return {
    isOpen: isOpen,
    mode: {isStatic: isStatic, isEdit: isEdit},
    deck: deck
  }
}

export class DeckModal extends React.Component {
  constructor(props){
    super(props)
    this.state = createState(false, true, false);

    registerEvent('deck-modal', 'open', (stateSetter, deck) => this.setState(createState(true, true, true, deck)))
    registerEvent('deck-modal', 'close', (stateSetter, deck) => this.setState(createState(false, true, false, null)))

    registerReaction('deck-modal', 'deck-rep', ['got-full'], (stSetter)=>this.setState({}))
    registerReaction('deck-modal', 'deck-rep', ['updated', 'created'], ()=>fireEvent('deck-modal', 'close'))
  }

  render(){
    return <CommonModal isOpen = {this.state.isOpen} okHandler = {()=>okHandler(this.state.deck)} cancelHandler={()=>fireEvent('deck-modal', 'close')} title={"Deck"} >
          {getContent(this)}
      </CommonModal>
  }
}

const getContent = function(comp){
  var content = null

  if(comp.state.isOpen){

    if(!loadFullDeck(comp.state.deck)){
      return 'Loading...'
    }

    content = <CommonCrudeTemplate editing = {comp.state.mode} changeEditHandler = {comp.forceUpdate.bind(comp)} deleteHandler={()=>console.log('TODO deleting deck')}>
                <TextFields content={[
                    titleField(comp.state.deck, comp.state.mode.isEdit)]}/>
            </CommonCrudeTemplate>
  }

  return content
}

const loadFullDeck = function(deck){
  if(deck.isFull || deck.id == newObjId){
    return true
  }

  fireEvent('deck-rep', 'get-full', [deck])
  return false
}

const okHandler = function(deck){
  if(deck.id==newObjId){
    fireEvent('deck-rep', 'create', [deck])
  } else {
    fireEvent('deck-rep', 'update', [deck])
  }
}

const titleField = function(deck, isEdit){
  return {
    key: 'title',
    label: <ControlLabel>Title:</ControlLabel>,
    field: <StatefulTextField obj={deck} valName={'title'} isEdit={isEdit}/>
  }
}

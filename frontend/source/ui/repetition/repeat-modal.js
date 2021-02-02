import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonToolbar,  DropdownButton, MenuItem,  FormGroup, FormControl, Alert} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

import {CommonModal} from '../common-modal'
import {CommonCrudeTemplate} from '../common-crud-template'

import {Card} from './card'

export class RepeatModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false}
    registerEvent('repeat-modal', 'open', (stSetter, deck)=>this.setState({isOpen:true, deck:deck}))

    registerEvent('repeat-modal', 'close', (stSetter, deck)=>{
      this.state.deck.isFull = false
      this.setState({isOpen:false, deck:null, dict: null})
    })

    registerReaction('repeat-modal', 'deck-rep', ['got-full'], (stSetter)=>this.setState({}))
    registerReaction('repeat-modal', 'deck-rep', ['updated', 'created'], ()=>fireEvent(this.props.name, 'close'))
  }

  render(){
      return <CommonModal isOpen = {this.state.isOpen} cancelHandler={()=>fireEvent('repeat-modal', 'close')} title={'Repeat ' + (this.state.deck!=null?this.state.deck.title:'')} styleClass='repeat-modal-class'>
                {getContent(this)}
            </CommonModal>
  }
}

const getContent = function(comp){
  if(comp.state.deck==null){
    return null
  }

  if(!loadFull(comp.state.deck)){
    return 'Loading...'
  }

  if(comp.state.dict==null){
    comp.state.dict = shuffle(createRepeatDict(comp.state.deck))
  }

  return <div>
            <Card repeatDict={comp.state.dict} />
          </div>
}

const loadFull = function(deck){
  if(deck.isFull){
    return true
  }

  fireEvent('deck-rep', 'get-full', [deck])
  return false
}

const createRepeatDict = function(deck){
  const result = []
  deck.words.forEach(word => {
    word.wordDefs.forEach(wordDef => {
      result.push({def: wordDef.definition, word: word.value, example:''})
    })
  })
  return result
}


/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

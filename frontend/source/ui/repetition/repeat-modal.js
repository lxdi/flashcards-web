import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonToolbar,  DropdownButton, MenuItem,  FormGroup, FormControl, Alert} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

import {CommonModal} from '../common-modal'
import {CommonCrudeTemplate} from '../common-crud-template'

export class RepeatModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false, currentPos:0, show:false}
    registerEvent('repeat-modal', 'open', (stSetter, deck)=>this.setState({isOpen:true, deck:deck}))

    registerEvent('repeat-modal', 'close', (stSetter, deck)=>{
      this.state.deck.isFull = false
      this.setState({isOpen:false, currentPos:0, show:false, deck:null, dict: null})
    })

    registerReaction('repeat-modal', 'deck-rep', ['got-full'], (stSetter)=>this.setState({}))
    registerReaction('repeat-modal', 'deck-rep', ['updated', 'created'], ()=>fireEvent(this.props.name, 'close'))
  }

  render(){
      return <CommonModal isOpen = {this.state.isOpen} cancelHandler={()=>fireEvent('repeat-modal', 'close')} title={'Repeat'} styleClass='repeat-modal-class'>
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
          {getPanelUI(comp, comp.state.dict)}
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
      result.push({def: wordDef.definition, word: word.value})
    })
  })
  return result
}

const getPanelUI = function(comp, repeatDict){
  if(repeatDict.length == 0){
    return 'No definitions or words'
  }

  return <div style={{width: '400px', padding:'5px', textAlign:'center'}}>
          <div style={{border:'1px solid darkgrey', height:'300px', padding:'5px'}}>
            <div>
              {comp.state.show?
                <span style={{fontSize:'12pt', fontWeight:'bold', borderBottom: '1px solid grey'}}>{repeatDict[comp.state.currentPos].word}</span>
                :''}
            </div>
            <div>
              {repeatDict[comp.state.currentPos].def}
            </div>
          </div>
          <div>
            {showButton(comp)}
            {nextButton(comp, repeatDict)}
          </div>
        </div>
}

const nextButton = function(comp, repeatDict){
  if(comp.state.currentPos+1==repeatDict.length){
    return
  }
  return <Button bsStyle="default" bsSize='xsmall' onClick={() => nextHandle(comp, repeatDict)}>Next</Button>
}

const showButton = function(comp){
  if(comp.state.show){
    return
  }
  return <Button bsStyle="default" bsSize='xsmall' onClick={() => showHandle(comp)}>Show</Button>
}

const showHandle = function(comp){
  comp.state.show = true
  comp.setState({})
}

const nextHandle = function(comp, repeatDict){
  comp.setState({currentPos: comp.state.currentPos+1, show:false})
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

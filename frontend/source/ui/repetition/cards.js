import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonToolbar,  DropdownButton, MenuItem,  FormGroup, FormControl, Alert} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

import {TextArea} from '../common/text-area'
import {Hints} from './hints'

//props: repeatDict
export class Cards extends React.Component {
  constructor(props){
    super(props)
    this.state = {currentPos:0, show:false}
  }

  render(){
    return getPanelUI(this, this.props.repeatDict)
  }

}

const getPanelUI = function(comp, repeatDict){
  if(repeatDict.length == 0){
    return 'No definitions or words'
  }

  const dictDef = repeatDict[comp.state.currentPos]
  return <div style={{width: '400px', padding:'5px', textAlign:'center'}}>
          <div style={{border:'1px solid lightgrey', borderRadius:'15px', height:'300px', padding:'5px'}}>
            <div>
              {comp.state.currentPos+1}/{repeatDict.length}
            </div>
            <div>
              {dictDef.showWord?
                <span style={{fontSize:'12pt', fontWeight:'bold', borderBottom: '1px solid grey'}}>{dictDef.word}</span>
                :''}
            </div>
            <div>
              {dictDef.def}
            </div>
            <div style = {{margin:'3px', borderTop:'1px solid lightgrey', width:'200px', marginLeft: '100px'}} />
            <div>
              <Hints hints={dictDef.hints} />
            </div>
            <div style={{marginTop:'5px'}}>
              <TextArea id={dictDef.def} obj={dictDef} valName={'example'} valNameUI={'Example'}/>
            </div>
          </div>
          <div style = {{marginTop:'3px'}}>
            <div style={{display:'inline-block', marginRight:'5px'}}>
              {showWordButton(comp, dictDef)}
            </div>
            <div style={{display:'inline-block'}}>
              {nextButton(comp, repeatDict)}
            </div>
          </div>
        </div>
}

const hintUI = function(comp, dictDef){
  if(dictDef.hints.length < 1){
    return null
  }

  if(dictDef.showHints){
    const result = []
    dictDef.hints.forEach(hint => result.push(<div style={{color:'grey'}}>{hintTextUI(hint.hint)}</div>))
    return result
  }

  return <Button size="sm" variant="outline-warning" onClick={() => {
      dictDef.showHints = true
      comp.setState({})
    }}>Show hints</Button>
}

const hintTextUI = function(hintOriginal){
  if(!hintOriginal.includes('[') || !hintOriginal.includes(']')){
    return hintOriginal
  }
  const firstPart = hintOriginal.substr(0, hintOriginal.indexOf('['))
  const secondPart = hintOriginal.substr(hintOriginal.indexOf(']')+1, hintOriginal.length)
  return <span>{firstPart} <a href='#'> *** </a>  {secondPart}</span>
}

const showWordButton = function(comp, dictDef){
  if(dictDef.showWord){
    return
  }
  return <Button variant="outline-warning" onClick={() => {
      dictDef.showWord = true
      comp.setState({})
    }}>Show word</Button>
}

const nextButton = function(comp, repeatDict){
  if(comp.state.currentPos+1==repeatDict.length){
    return
  }
  return <Button variant="primary" onClick={() => nextHandle(comp, repeatDict)}>Next</Button>
}


const showHandle = function(comp){
  comp.state.show = true
  comp.setState({})
}

const nextHandle = function(comp, repeatDict){
  comp.setState({currentPos: comp.state.currentPos+1, show:false})
}

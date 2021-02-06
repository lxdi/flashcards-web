import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonToolbar,  DropdownButton, MenuItem,  FormGroup, FormControl, Alert} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

import {TextArea} from '../common/text-area'

//props: hints:[]
export class Hints extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return <div>
              {hintsUI(this, this.props.hints)}
            </div>
  }
}

const hintsUI = function(comp, hints){
  if(hints.length < 1){
    return null
  }

  if(comp.state.showHints){
    const result = []
    comp.props.hints.forEach(hint => result.push(<div style={{color:'grey'}}>{hintTextUI(comp, hint)}</div>))
    return result
  }

  return <Button size="sm" variant="outline-warning" onClick={() => {
      comp.state.showHints = true
      comp.setState({})
    }}>Show hints</Button>
}

const hintTextUI = function(comp, hint){
  if(hint.disclosed || !hint.hint.includes('[') || !hint.hint.includes(']')){
    return hint.hint.replaceAll('[', '').replaceAll(']', '')
  }

  const hideMark = '***'
  const hintBlurred = hint.hint.replace(/\[([^\]]+)\]/g, hideMark)
  const hintArr = hintBlurred.split(hideMark)
  const result = []

  for(var i = 0; i<hintArr.length; i++){
    result.push(<span>{hintArr[i]}</span>)
    if(i<hintArr.length-1){
      result.push(<a href='#' onClick={()=> {hint.disclosed=true; comp.setState({})}}>{hideMark}</a>)
    }
  }
  return <div>{result}</div>
}

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
            <div style={{display:'inline-block', marginRight:'5px'}}>
              {missButton(comp, repeatDict, dictDef)}
            </div>
            <div style={{display:'inline-block'}}>
              {nextButton(comp, repeatDict)}
            </div>
          </div>
        </div>
}

const showWordButton = function(comp, dictDef){
  if(dictDef.showWord || comp.state.finished){
    return
  }

  return <Button variant="outline-warning" onClick={() => {
      dictDef.showWord = true
      comp.setState({})
    }}>Show word</Button>
}

const missButton = function(comp, repeatDict, dictDef){
  if(dictDef.showWord || comp.state.finished){
    return
  }

  return <Button variant="outline-danger" onClick={() => {
      dictDef.missed = true
      if(comp.state.currentPos+1==repeatDict.length){
        comp.setState({finished: true, show:false})
      } else {
        comp.setState({currentPos: comp.state.currentPos+1, show:false})
      }
    }}>Miss</Button>
}

const nextButton = function(comp, repeatDict){
  if(comp.state.finished){
    return reportButton(repeatDict)
  }
  var title = 'Next'
  if(comp.state.currentPos+1==repeatDict.length){
    title = 'Finish'
  }

  return <Button variant="primary" onClick={() => {
    if(comp.state.currentPos+1==repeatDict.length){
      comp.setState({finished: true, show:false})
    } else {
      comp.setState({currentPos: comp.state.currentPos+1, show:false})
    }
  }}>{title}</Button>
}

const reportButton = function(repeatDict){
  return  <Button variant="primary" onClick={() => fireEvent('report-modal', 'open', [repeatDict])}>Report</Button>
}

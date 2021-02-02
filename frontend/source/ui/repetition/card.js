import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonToolbar,  DropdownButton, MenuItem,  FormGroup, FormControl, Alert} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

//props: repeatDict
export class Card extends React.Component {
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

  return <div style={{width: '400px', padding:'5px', textAlign:'center'}}>
          <div style={{border:'1px solid lightgrey', borderRadius:'15px', height:'300px', padding:'5px'}}>
            <div>
              {comp.state.currentPos+1}/{repeatDict.length}
            </div>
            <div>
              {comp.state.show?
                <span style={{fontSize:'12pt', fontWeight:'bold', borderBottom: '1px solid grey'}}>{repeatDict[comp.state.currentPos].word}</span>
                :''}
            </div>
            <div>
              {repeatDict[comp.state.currentPos].def}
            </div>
          </div>
          <div style = {{marginTop:'3px'}}>
            <div style={{display:'inline-block', marginRight:'5px'}}>
              {showButton(comp)}
            </div>
            <div style={{display:'inline-block'}}>
              {nextButton(comp, repeatDict)}
            </div>
          </div>
        </div>
}

const showButton = function(comp){
  if(comp.state.show){
    return
  }
  return <Button variant="outline-warning" onClick={() => showHandle(comp)}>Show</Button>
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

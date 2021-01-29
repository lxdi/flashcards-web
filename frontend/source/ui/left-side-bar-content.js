import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

import {DataConstants} from '../data/data-constants'
import {filterOutMemoTask} from '../utils/task-utils'

export class LeftSideBarContent extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    //return 'TODO'
    return content(this)
  }
}

const content = function(reactcomp){
  return <div>
              <a href="#" style={{textDecoration:'none'}}>
                <div onClick={()=>fireEvent('actual-tasks-modal', 'open')} class="actual-tasks-indicators-group">
                  {getSquare(14, 'red')}
                  {getSquare(15, 'red')}
                </div>
              </a>
              {divisor()}
              <div style={{margin:'2px', width:'45px', height:'45px', fontSize:'10pt'}}>

              </div>
            </div>
}

const getSquare = function(num, color){
	return <div style={{border:'1px solid '+color, margin:'2px', width:'45px', height:'30px', borderRadius:'8px', textAlign:'center', color:color, fontSize:'13pt'}}>{num}</div>
}

const divisor = function(){
  return <div style={{backgroundColor:'lightgrey', width:'100%', height:'1px', marginLeft:'2px', marginRight:'2px', marginTop:'5px', marginBottom:'5px'}}></div>
}

const getStatSquare = function(num, percents, color, span){
  return <div style={{border:'1px solid '+color, margin:'2px', width:'45px', borderRadius:'8px', textAlign:'center', color:color, fontSize:'10pt'}}>
                  <div>{span}</div>
                  <div style = {{fontSize:'8pt'}}>{num}</div>
                  <div style = {{fontSize:'8pt'}}>{percents}%</div>
            </div>
}

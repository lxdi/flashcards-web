import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Table} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

import {CommonModal} from '../common/common-modal'
import {CommonCrudeTemplate} from '../common/common-crud-template'

export class ReportModal extends React.Component {
  constructor(props){
    super(props)
    this.state = {isOpen:false}
    registerEvent('report-modal', 'open', (stSetter, repeatDict)=>this.setState({isOpen:true, repeatDict:repeatDict}))

    registerEvent('report-modal', 'close', (stSetter, deck)=>{
      this.setState({isOpen:false, repeatDict: null})
    })
  }

  render(){
      return <CommonModal isOpen = {this.state.isOpen} cancelHandler={()=>fireEvent('report-modal', 'close')} title={'Report'} styleClass='report-modal-class'>
                {getContent(this)}
            </CommonModal>
  }
}

const getContent = function(comp){
  if(comp.state.repeatDict==null){
    return null
  }

  return <div>
          {missedWordsTable(comp.state.repeatDict)}
        </div>
}

const missedWordsTable = function(repeatDict){
  const result = []

  repeatDict.filter(dictDef => dictDef.missed)
            .forEach(dictDef => result.push(<tr>
                <td>{dictDef.word}</td>
                <td>{dictDef.def}</td>
            </tr>))

  return <Table striped bordered condensed hover size="sm">
            <tbody>
              <tr>
                <th>Word</th>
                <th>Definition</th>
              </tr>
              {result}
            </tbody>
            </Table>
}

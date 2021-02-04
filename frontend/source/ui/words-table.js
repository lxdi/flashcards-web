import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Table} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

import {CommonModal} from './common/common-modal'
import {CommonCrudeTemplate} from './common/common-crud-template'

//props: deck, isEdit
export class WordsTable extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return <div style={{marginTop:'5px', border: '1px solid lightgrey', borderRadius:'10px', padding: '5px'}}>
                      <div>
                        <Table bordered condensed hover size="sm">
                            <tbody>
                              {getTrs(this, this.props.deck)}
                            </tbody>
                          </Table>
                      </div>
                      <div>
                        {this.props.isEdit?
                          <Button variant="outline-primary" size="sm" onClick={() => fireEvent('word-modal', 'open', [{id: 'new'}, this.props.deck])}>Create Word</Button>
                          :null}
                      </div>
                    </div>
  }
}

const getTrs = function(comp, deck){
  const result = []
  const arrFieldName = 'words'

  if(deck[arrFieldName] == null){
    deck[arrFieldName] = []
  }
  
  for(var i = 0; i<deck[arrFieldName].length; i++){
    const tds = []
    tds.push(getTd(deck[arrFieldName][i++], deck))
    tds.push(getTd(deck[arrFieldName][i++], deck))
    tds.push(getTd(deck[arrFieldName][i], deck))
    result.push(<tr>{tds}</tr>)
  }
  return result
}

const getTd = function(word, deck){
  const style = {width:'30%'}
  if(word == null){
    return <td style={style}></td>
  }
  return <td style={style}><a href='#' onClick={()=>fireEvent('word-modal', 'open', [word, deck])} >{word.value}</a></td>
}

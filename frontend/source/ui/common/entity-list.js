import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Table} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt, registerObject} from 'absevents'
//import {SwitchButton} from './changebutton';

// props: ents:[]/'repName', modalName, model:[{prop: 'title', link:true, name: 'Title'}]
export class EntityList extends React.Component {
	constructor(props){
		super(props);

    if(typeof this.props.ents == 'string'){
      registerReaction(this.props.ents+'-list', this.props.ents, ['all-response'], ()=>this.setState({}))
    }
	}

	render() {
    return getContent(this)
	}
}

const getContent = function(comp){
  var ents = null

  if(typeof comp.props.ents == 'string'){
    if(chkSt(comp.props.ents, 'objects')==null){
      fireEvent(comp.props.ents, 'all-request')
      return 'Loading...'
    }

    ents = Object.values(chkSt(comp.props.ents, 'objects'))
  } else {
    ents = comp.props.ents
  }

  return getTableUI(comp, ents)
}

const getTableUI = function(comp, ents){
  const result = []

  if(ents!=null){
    ents.forEach(ent => {
      result.push(getRow(ent, comp.props.model, comp.props.modalName))
    })
  }

  const tdsTitles = []
  comp.props.model.forEach(prop => tdsTitles.push(<td>{prop.name}</td>))
  return <Table striped bordered condensed hover >
          <tbody>
            <tr>
              {tdsTitles}
            </tr>
            {result}
          </tbody>
          </Table>
}

const getRow = function(ent, model, modalName){
  const style = {} // task.repetition != null && task.repetition.id == rep.id? {fontWeight:'bold'}:{}

  const tds = []

  model.forEach(prop => {
    var content = ent[prop.prop]

    if(prop.link){
      content = <a href='#' onClick={()=>fireEvent(modalName, 'open', [ent])}>{ent[prop.prop]}</a>
    }

    tds.push(<td>{content}</td>)
  })

  return <tr id={ent.id} style={style}>{tds}</tr>
}
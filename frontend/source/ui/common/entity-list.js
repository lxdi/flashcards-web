import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Table} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt, registerObject} from 'absevents'
//import {SwitchButton} from './changebutton';

// props: ents:[]/'repName', modalName, parent, model:[{prop: 'title', link:true, name: 'Title', style}, {custom: function(ent), name:'Title'}]
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
    ents.forEach(ent => result.push(getRow(ent, comp.props.model, comp.props.modalName, comp.props.parent)))
  }

  const tdsTitles = []
  comp.props.model.forEach(prop => tdsTitles.push(<th style={prop.style} >{prop.name}</th>))
  return <Table striped bordered condensed hover size="sm">
          <tbody>
            <tr>
              {tdsTitles}
            </tr>
            {result}
          </tbody>
          </Table>
}

const getRow = function(ent, model, modalName, parent){
  const style = {} // task.repetition != null && task.repetition.id == rep.id? {fontWeight:'bold'}:{}
  const tds = []
  model.forEach(prop => tds.push(<td>{getCol(ent, prop, modalName, parent)}</td>))
  return <tr id={ent.id} style={style}>{tds}</tr>
}

const getCol = function(ent, prop, modalName, parent){
  if(prop.custom!=null){
    return prop.custom(ent)
  }

  var content = ent[prop.prop]

  if(prop.link){
    content = <a href='#' onClick={()=>fireEvent(modalName, 'open', [ent, parent])}>{ent[prop.prop]}</a>
  }
  return content
}

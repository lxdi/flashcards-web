import React from 'react';
import ReactDOM from 'react-dom';
import {Button, ButtonToolbar,  DropdownButton, MenuItem,  FormGroup, ControlLabel, FormControl, Alert} from 'react-bootstrap'
import {registerEvent, registerReaction, fireEvent, chkSt} from 'absevents'

import {CommonModal} from '../common-modal'
import {CommonCrudeTemplate} from '../common-crud-template'
import {StatefulTextField} from './stateful-text-field'
import {TextFields} from './text-fields'
import {EntityList} from './entity-list'

const newObjId = "new"
const hoursDefault = 1

const createState = function(isOpen, isStatic, isEdit, obj, parent){
  return {
    isOpen: isOpen,
    mode: {isStatic: isStatic, isEdit: isEdit},
    obj: obj,
    parent: parent
  }
}

//props: name, full:true, mode:'update'/{parentValName}, repName, title, fields: [{type: 'text', label, valName}, {type:'list', valName, modalName, label, model}]
export class EntityModal extends React.Component {
  constructor(props){
    super(props)
    this.state = createState(false, true, false);

    registerEvent(this.props.name, 'open', (stateSetter, obj, parent) => this.setState(createState(true, true, true, obj, parent)))
    registerEvent(this.props.name, 'close', (stateSetter) => this.setState(createState(false, true, false, null, null)))

    if(this.props.full){
      registerReaction(this.props.name, this.props.repName, ['got-full'], (stSetter)=>this.setState({}))
      registerReaction(this.props.name, this.props.repName, ['updated', 'created'], ()=>fireEvent(this.props.name, 'close'))
    }

    registerReactionsForLists(this)
  }

  render(){
    return <CommonModal isOpen = {this.state.isOpen} okHandler = {()=>okHandler(this, this.state.obj, this.state.parent)} cancelHandler={()=>fireEvent(this.props.name, 'close')} title={this.props.title} >
          {getContent(this)}
      </CommonModal>
  }
}

const registerReactionsForLists = function(comp){
  if(comp.props.fields!=null){
    comp.props.fields.forEach(field => {
      if(field.type == 'list'){
        registerReaction(comp.props.modalName, field.modalName, ['close'], (stSetter)=>comp.setState({}))
      }
    })
  }
}

const getContent = function(comp){
  var content = null

  if(comp.state.isOpen){

    if(comp.props.full && !loadFull(comp, comp.state.obj)){
      return 'Loading...'
    }

    content = <CommonCrudeTemplate editing = {comp.state.mode} changeEditHandler = {comp.forceUpdate.bind(comp)} deleteHandler={()=>console.log('TODO deleting deck')}>
                {getFieldsUI(comp)}
            </CommonCrudeTemplate>
  }

  return content
}

const loadFull = function(comp, obj){
  if(obj.isFull || obj.id == newObjId){
    return true
  }

  fireEvent(comp.props.repName, 'get-full', [obj])
  return false
}

const okHandler = function(comp, obj, parent){
  if(comp.props.mode == 'update'){
    if(obj.id==newObjId){
      fireEvent(comp.props.repName, 'create', [obj])
    } else {
      fireEvent(comp.props.repName, 'update', [obj])
    }
  } else {

    if(obj.id==newObjId){
      if(parent[comp.props.mode.parentValName] == null){
        parent[comp.props.mode.parentValName] = []
      }

      parent[comp.props.mode.parentValName].push(obj)
    }

    fireEvent(comp.props.name, 'close')
  }
}

const getFieldsUI = function(comp){
  const result = []

  comp.props.fields.forEach(field => {
    if(field.type == 'text'){
      result.push(<div><TextFields content={[textField(comp.state.obj, field.valName, field.label, comp.state.mode.isEdit)]}/></div>)
    }

    if(field.type == 'list'){
      result.push(<div style={{marginTop:'5px'}}>
                        <div>
                          <Button bsStyle="default" bsSize='xsmall' onClick={() => fireEvent(field.modalName, 'open', [{id: newObjId}, comp.state.obj])}>Create {field.label}</Button>
                        </div>
                        <div>
                          <EntityList ents={comp.state.obj[field.valName]} modalName={field.modalName} model={field.model}/>
                        </div>
                      </div>)
    }
  })

  return result
}

const textField = function(obj, valName, label, isEdit){
  return {
    key: valName,
    label: <ControlLabel>{label}</ControlLabel>,
    field: <StatefulTextField obj={obj} valName={valName} isEdit={isEdit}/>
  }
}

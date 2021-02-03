import React from 'react';
import ReactDOM from 'react-dom';
import {CommonModal} from './common-modal'
import {Button} from 'react-bootstrap'

const defaultState = function(){
  return {
    edit:true
  }
}

// editing{isStatic isEdit} changeEditHandler deleteHandler
//isStatic means a view only mode
export class CommonCrudeTemplate extends React.Component {
  constructor(props){
    super(props)
    this.state = defaultState();
    this.editAbilityHandler = this.editAbilityHandler.bind(this);
  }

  editAbilityHandler(){
    this.props.editing.isEdit = !this.props.editing.isEdit
    this.setState({})
    this.props.changeEditHandler()
  }

  render(){
    return (
        <div>
          {!this.props.editing.isStatic?
            <Button variant='outline-secondary' size="sm" onClick={this.editAbilityHandler}>
              {this.props.editing.isEdit? 'View': 'Edit'}
            </Button>
          : null}

          {!this.props.editing.isStatic && this.props.editing.isEdit && this.props.deleteHandler!=null?
            <Button variant="danger" size="sm" onClick={this.props.deleteHandler}>Delete</Button>
          : null}

          {this.props.children}
      </div>
    )
  }
}

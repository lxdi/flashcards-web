import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from 'react-bootstrap'

//props: obj, valName, valNameUI, readOnly
export class TextArea extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return   <Form.Group controlId={this.props.id}>
                <Form.Control as="textarea" rows={3}
                                readOnly={this.props.readOnly!=null?this.props.readOnly:false}
                                value={this.props.obj[this.props.valName]}
                                placeholder={(this.props.valNameUI!=null?this.props.valNameUI:this.props.valName)}
                                onChange={(e)=>{this.props.obj[this.props.valName] = e.target.value; this.setState({})}}
                                />
              </Form.Group>
  }
}

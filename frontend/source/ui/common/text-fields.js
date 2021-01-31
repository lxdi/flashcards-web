import React from 'react';
import ReactDOM from 'react-dom';

const fieldNameStyle = {textAlign:'right', borderRight:'1px solid lightgrey'}
const fieldStyle = {paddingLeft:'3px'}

export class TextFields extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return <table class='textfields-table-style'>
              {linesUI(this.props.content)}
            </table>
  }
}

const linesUI = function(content){
  const result = []
  const actualFieldNameStyle = {width: maxLabelLength(content)*10+'px'}
  Object.assign(actualFieldNameStyle, fieldNameStyle)

  for(var i in content){
    result.push( <tr key={content[i].key}>
                    <td style={actualFieldNameStyle}>
                      <div style={{paddingRight:'3px'}}>
                        {content[i].label}
                      </div>
                    </td>
                    <td style={fieldStyle}>
                      {content[i].field}
                    </td>
                  </tr>)
  }
  return result
}

const maxLabelLength = function(content){
  var result = 0
  for(var i in content){
    if(content[i].label.length>result){
      result = content[i].label.length
    }
  }
  return result
}

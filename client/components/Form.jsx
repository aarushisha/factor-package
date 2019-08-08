import React from 'react';

const Form = (props) => {
  return (
    <div id="form-container">
      <div>
        Package Name: 
        <br></br>
      <input type="text" size="100"></input>
      </div>
      <div>
        Package Files: 
        <br></br>
      <input onChange={props.updateFileList} id="file" type="file" multiple></input>
        <br></br>
        <div id="fileList"></div>
      </div>

    </div>
  )
}

export default Form;
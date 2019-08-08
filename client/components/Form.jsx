import React from 'react';

const Form = (props) => {
  return (
    <div id="form-container">
      <form>
      <div>
        Package Name: 
        <br></br>
      <input id="package-name" type="text"></input>
      </div>
      <div>
        Package Files: 
        <br></br>
      <input onChange={props.updateFileList} id="file" type="file" multiple></input>
        <br></br>
        <div id="fileList"></div>
      </div>
      <br></br>
      <div>
        Requested Quantities: 
        <br></br>
        <div id="quantities-options">
          <input type="checkbox" value="1"></input>
          <label for="1">1</label>
          <input type="checkbox" value="5"></input>
          <label for="5">5</label>
          <input type="checkbox" value="10"></input>
          <label for="10">10</label>
          <input type="checkbox" value="25"></input>
          <label for="25">25</label>
          <input type="checkbox" value="50"></input>
          <label for="50">50</label>
          <input type="checkbox" value="75"></input>
          <label for="75">75</label>
          <input type="checkbox" value="100"></input>
          <label for="100">100</label>
          <input onChange={props.toggleRequiredQuantity}id ="other-checkbox" type="checkbox" value="Other"></input>
          <label for="Other">Other</label>
          <input id ="other-input" type="text" defaultValue="If Other, type value here"></input>
        </div>
      </div>
      <br></br>
      <div>
        Due Date: <input type="date"></input>
      </div>
      <br></br>
      <div>
        Description/Notes: 
        <textarea rows="10" cols="100"></textarea>
      </div>
      <input type="submit" value="Add Package!"></input>
      </form>
    </div>
  )
}

export default Form;
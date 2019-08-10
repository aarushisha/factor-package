import React from 'react';
import moment from 'moment';

const Form = (props) => {
  return (
    <div id="form-container">
      <form encType="multipart/form-data">
      <div>
        Package Name: 
        <br></br>
      <input id="package-name" type="text" required></input>
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
          <br></br>
          <div> If other, please input value here: 
          <input id ="other-input" type="text" size="5"></input>
          </div>
        </div>
      </div>
      <br></br>
      <div>
        Due Date: <input id="due-date" type="date" className="datepicker" min={moment().add(1, 'days').format("YYYY-MM-DD")}></input>
      </div>
      <br></br>
      <div>
        Description/Notes: 
        <textarea id="description-notes" rows="10" cols="100"></textarea>
      </div>
      </form>  
      <button id="button-add-package" onClick={() => props.addPackage()}>Add package!</button>  
    </div>
  )
}

export default Form;
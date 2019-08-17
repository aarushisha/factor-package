import React from 'react';
import moment from 'moment';

const PackageView = (props) => {
  return (
    <div id="package-view-container">
      <div className="header-view">
        <div className="package-view-name">{props.selectedPackage.name}</div>
        <div id="dates">
          <div id="date-added">Date Added: {moment(props.selectedPackage.addedDate).utc().format('MM/DD/YYYY')}</div>
          <div id="due-date-view">Expected Delivery Date: {moment(props.selectedPackage.dueDate).utc().format('MM/DD/YYYY')}</div>
        </div>
      </div>     
      <div> Quantities Requested:
        {props.selectedPackage.quantities === undefined || props.selectedPackage.quantities.toString() === [].toString() ? " N/A" : props.selectedPackage.quantities.map(quantity => <li>{quantity}</li>)}
      </div>
      <div> Attachments: 
        {props.selectedPackage.fileNames === undefined || props.selectedPackage.fileNames.toString() === [].toString() ? " N/A" : props.selectedPackage.fileNames.map(fileName => <li>{fileName}</li>)}
      </div>
      {props.selectedPackage.description === "" ? "" : <div><div>Description & Notes:</div><div>{props.selectedPackage.description}</div></div>}
    </div>
  )
}

export default PackageView;
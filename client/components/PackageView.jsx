import React from 'react';
import moment from 'moment';

const PackageView = (props) => {
  return (
    <div id="package-view-container">
      <div>Package Name: {props.selectedPackage.name}</div>
      <div>Date Added: {moment(props.selectedPackage.addedDate).utc().format('MM/DD/YYYY')}</div>
      <div>Due Date: {moment(props.selectedPackage.dueDate).utc().format('MM/DD/YYYY')}</div>
      {props.selectedPackage.description === "" ? "" : <div>Description: {props.selectedPackage.description}</div>}
      <div> Quantities Requested: 
        {props.selectedPackage.quantities === undefined ? "" : props.selectedPackage.quantities.map(quantity => <div>{quantity}</div>)}
      </div>
      <div> Attachmentns: 
        {props.selectedPackage.fileNames === undefined ? "" : props.selectedPackage.fileNames.map(fileName => <div>{fileName}</div>)}
      </div>
    </div>
  )
}

export default PackageView;
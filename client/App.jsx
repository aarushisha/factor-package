import React from 'react';
import ReactDom from 'react-dom';
import Modal from 'react-awesome-modal';
import Form from './components/Form.jsx';
import axios from 'axios';
import PackageView from './components/PackageView.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleForm: false,
      visiblePackage: false,
      packages: [],
      selectedPackage: {}
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.showPackage = this.showPackage.bind(this);
    this.hidePackage = this.hidePackage.bind(this);
    this.updateFileList = this.updateFileList.bind(this);
    this.addPackage = this.addPackage.bind(this);
    this.toggleRequiredQuantity = this.toggleRequiredQuantity.bind(this);
    this.getPackages = this.getPackages.bind(this);
    this.getPackage = this.getPackage.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.getAttachment = this.getAttachment.bind(this);
  }

  getAttachment() {
    var name = event.target.innerHTML;
    axios.get(`/attachment?NAME=${name}`,)
    .then(window.open(`/attachment?NAME=${name}`));
  }

  uploadFiles() {
    const data = new FormData();
    var input = document.getElementById('file');
    var files = input.files;
    for (var i = 0; i < files.length; i++) {
      data.append('file', files[i], files[i].name)
    }
    console.log(data);
    axios.post('/upload', data)
  }

  showForm() {
    this.setState({visibleForm: true})
  }

  hideForm() {
    this.setState({visibleForm: false})
  }

  showPackage() {
    this.setState({visiblePackage: true})
  }

  hidePackage() {
    this.setState({visiblePackage: false})
  }

  toggleRequiredQuantity() {
    var otherCheckbox = document.getElementById("other-checkbox");
    var otherInput = document.getElementById("other-input");
    console.log(otherCheckbox, otherInput);
    if (otherInput.hasAttribute('required') !== true) {
      otherInput.setAttribute('required', true);
    } else {
      otherInput.removeAttribute('required');
    }
  }

  updateFileList() {
    var input = document.getElementById('file');
    var output = document.getElementById('fileList');
    for (var i = 0; i < input.files.length; i++) {
      output.innerHTML += '<li>' + input.files.item(i).name + '</li>'
    }
  }

  addPackage() {
    var button = document.getElementById('button-add-package');
    var name = document.getElementById("package-name").value;
    var otherCheckbox = document.getElementById("other-checkbox");
    var otherInput = document.getElementById("other-input");
    var fileList = document.getElementById('fileList');
    var inputFileList  =  document.getElementById('file').files;
    var files = [];
    for (var i = 0; i < fileList.childNodes.length; i++) {
      if (fileList.childNodes[i].innerHTML !== "") {
        files.push(fileList.childNodes[i].innerHTML);
      }
    }
    var dueDate = document.getElementById("due-date").value;
    var description = document.getElementById('description-notes').value;
    var otherValue = parseInt(otherInput.value);
    var checkboxes = document.getElementById('quantities-options').childNodes;
    var quantities = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true && checkboxes[i].value !== "Other") {
        quantities.push(parseInt(checkboxes[i].value));
      }
    }
    if (Number.isNaN(otherValue) === false) {
      quantities.push(parseInt(otherInput.value));
    }
    var dataObj = {name: name, files: files, dueDate: dueDate, description: description, quantities: quantities, fileList: inputFileList};
    console.log(dataObj);
    var checkboxes2 = document.querySelectorAll('input[type="checkbox"]');
    var checkedOne = Array.prototype.slice.call(checkboxes2).some(x => x.checked);
    if (name === "") {
      alert('Please fill out package name');
    } else if (otherInput.hasAttribute('required', true) && (otherInput.value === "" || Number.isNaN(otherValue))) {
      alert('Please enter appropriate requested quantity')
    } else if (dueDate === "") {
      alert('Please enter a due date')
    } else if (checkedOne === false) {
      alert('Please select a quantity')
    }
    else {
      //send request to server with form data (how to send attachments to server to save?)
      axios.post('/packages', dataObj)
        .then(response => {
          console.log(response)
        })
        .then(() => location.reload(true))
        .catch(err => console.log(err));
      location.reload();
    }
  }

  componentDidMount() {
    this.getPackages();
  }

  getPackages() {
    axios.get('/packages')
      .then(results => this.setState({packages: results.data}))
  }

  getPackage() {
    var name = event.target.innerHTML;
    axios.post('/package', {name: name})
    .then(results => {
      var data = results.data;
      var name = data[0].name;
      var dueDate = data[0].due_date;
      var addedDate = data[0].date_added;
      var description = data[0].description;
      var fileNames = [];
      var quantities = [];
      for (var i = 0; i < data.length; i++) {
        if (!fileNames.includes(data[i].file_name)) {
          fileNames.push(data[i].file_name)
        }
        if (!quantities.includes(data[i].quantity)) {
          quantities.push(data[i].quantity)
        }
      }
      var dataObj = {name: name, dueDate: dueDate, addedDate: addedDate, description: description, fileNames: fileNames, quantities: quantities}
      console.log(dataObj);
      this.setState({selectedPackage: dataObj})
    })
    this.showPackage();
  }

  render() {
    return (
      <div id="packages-container">
        <div id="packages">
          <div id="create-package"><button onClick={() => this.showForm()}>Create New Package</button></div>
          <br></br>
        </div>
        <div id="packages-list">
          {this.state.packages.map(pack => <div className="individual-package" onClick={() => this.getPackage()}>{pack.name}</div>)}
        </div>
        <Modal visible={this.state.visibleForm} width="50%" height="95%" effect="fadeInUp" onClickAway={() => this.hideForm()}>
          <div>
            <Form uploadFiles={this.uploadFiles} toggleRequiredQuantity={this.toggleRequiredQuantity} updateFileList={this.updateFileList} addPackage={this.addPackage}/>
          </div>
        </Modal>
        <Modal visible={this.state.visiblePackage} width="50%" height="95%" effect="fadeInUp" onClickAway={() => this.hidePackage()}>
          <div>
            <PackageView getAttachment={this.getAttachment} selectedPackage={this.state.selectedPackage}/>
          </div>
        </Modal>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));
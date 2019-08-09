import React from 'react';
import ReactDom from 'react-dom';
import Modal from 'react-awesome-modal';
import Form from './components/Form.jsx';
import axios from 'axios';

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
    output.innerHTML = '<ul>';
    for (var i = 0; i < input.files.length; i++) {
      output.innerHTML += '<li>' + input.files.item(i).name + '</li>'
    }
    output.innerHTML += '</ul>';
  }

  addPackage() {
    var button = document.getElementById('button-add-package');
    var name = document.getElementById("package-name").value;
    var otherCheckbox = document.getElementById("other-checkbox");
    var otherInput = document.getElementById("other-input");
    var files = document.getElementById('file').files;
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
    var dataObj = {name: name, files: files, dueDate: dueDate, description: description, quantities: quantities };
    console.log(dataObj);
    if (name === "") {
      alert('Please fill out package name');
    } else if (otherInput.hasAttribute('required', true) && (otherInput.value === "" || Number.isNaN(otherValue))) {
      alert('Please enter appropriate requested quantity')
    } else {
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

  }

  render() {
    return (
      <div id="packages-container">
        <div id="packages">
          <span>Packages</span><span id="create-package"><button onClick={() => this.showForm()}>Create New Package</button></span>
          <br></br>
        </div>
        <div id="packages-list">
          {this.state.packages.map(pack => <div>{pack.name}</div>)}
        </div>
        <Modal visible={this.state.visibleForm} width="50%" height="95%" effect="fadeInUp" onClickAway={() => this.hideForm()}>
          <div>
            <Form toggleRequiredQuantity={this.toggleRequiredQuantity} updateFileList={this.updateFileList} addPackage={this.addPackage}/>
          </div>
        </Modal>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));
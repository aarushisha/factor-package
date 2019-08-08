import React from 'react';
import ReactDom from 'react-dom';
import Modal from 'react-awesome-modal';
import Form from './components/Form.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleForm: false,
      visiblePackage: false,
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.showPackage = this.showPackage.bind(this);
    this.hidePackage = this.hidePackage.bind(this);
    this.updateFileList = this.updateFileList.bind(this);

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

  updateFileList() {
    var input = document.getElementById('file');
    var output = document.getElementById('fileList');
    output.innerHTML = '<ul>';
    for (var i = 0; i < input.files.length; i++) {
      output.innerHTML += '<li>' + input.files.item(i).name + '</li>'
    }
    output.innerHTML += '</ul>';
  }

  render() {
    return (
      <div id="packages-container">
        <div id="packages">
        <span>Packages</span><span id="create-package"><button onClick={() => this.showForm()}>Create New Package</button></span>
        </div>
        <Modal visible={this.state.visibleForm} width="50%" height="80%" effect="fadeInUp" onClickAway={() => this.hideForm()}>
          <div>
            <Form updateFileList={this.updateFileList}/>
          </div>
        </Modal>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));
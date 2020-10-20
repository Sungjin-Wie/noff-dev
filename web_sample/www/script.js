class ImageUpload extends React.Component {

//the part it is basically keeping what state needs to be stored in the react js program
// react js deals with state so that it know. so that it can redraw the entire page anytime needed.
//and the state determines especially what state it's in now we need to know
//what file was uploaded and the image and then whatever messsage we're generating on that
//image because we want to put an message below the image handle submit.
// this happens when you click the button to actually upload the image we
//essentailly let whatever default was going to happend on that event
//and now we actually get the data from


  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '', message: '' };
  }

  _handleSubmit(e) {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      let imageFormData = new FormData();
  
      imageFormData.append('image', this.state.file);
      
      var xhr = new XMLHttpRequest();
      var z = this;
      
      xhr.open('post', '/api/image', true);
      
      xhr.onload = function () {
        if (this.status == 200) {
          var msg = JSON.parse(this.response)
          console.log("**" + msg.pred[0].name + msg.pred[0].prob)
          var prob = Math.round(msg.pred[0].prob * 100)
          z.setState({message:`Composited`})
          resolve(this.response);
        } else {
          reject(this.statusText);
        }
      };
      
      xhr.send(imageFormData);
  
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        message: '',
        imagePreviewUrl: reader.result });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = React.createElement("img", { src: imagePreviewUrl });
    } else {
      $imagePreview = React.createElement("div", { className: "previewText" }, "Please select an Image for Preview");
    }

    return (
      React.createElement("div", { className: "previewComponent" },
      React.createElement("form", { onSubmit: e => this._handleSubmit(e) },
      React.createElement("input", { className: "fileInput",
        type: "file",
        onChange: e => this._handleImageChange(e) }),

      React.createElement("button", { className: "submitButton",
        type: "submit",
        onClick: e => this._handleSubmit(e) }, "Compositing Image")),
      React.createElement("div", { className: "imgPreview" },$imagePreview),
      React.createElement("span", {}, this.state.message),
      )
      );
  }}


ReactDOM.render(React.createElement(ImageUpload, null), document.getElementById("mainApp"));

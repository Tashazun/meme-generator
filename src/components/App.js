
import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      text: 'Witty repartee!',
      image: null

    };
  }

  handleImageSrc({ target }) {
    this.setState({ image: target.value });
  }

  handleUpload({ target }) {
    const reader = new FileReader();

    reader.readAsDataURL(target.files[0]);

    reader.onload = () => {
      this.setState({ image: reader.result });
    };
  }

  handleExport() {
    dom2image.toBlob(this.imageExport).then(blob => {
      fileSaver.saveAs(blob, 'cute-image.png');
    });
  }

  render() {
    const { text, image } = this.state;

    return (
      <main>
        <h1>Generate the Memes</h1>
        <fieldset>
          <div>
            <label>
              Text:
              <input value={text}/>
            </label>
          </div>
        </fieldset>

        <section>
          <div>
            <label>
              Image Src:
              <input onChange={event => this.handleImageSrc(event)}/>
            </label>
          </div>
          <div>
            <label>
              Image:
              <input 
                type="file" 
                onChange={event => this.handleUpload(event)}
              />
            </label>
          </div>

          <div>
            <button onClick={() => this.handleExport()}>
              Export
            </button>
          </div>

          <div className="image-container"
            ref={node => this.imageExport = node}
          >
            <h1>What an image!</h1>
            <img src={image}/>
          </div>
        </section>
      </main>
    );


  }

}
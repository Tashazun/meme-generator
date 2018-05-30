import React, { Component } from 'react';
import dom2image from 'dom-to-image';
import fileSaver from 'file-saver';
import meme from './meme.jpg';


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      header: 'Witty repartee!',
      footer: 'And some more!',
      image: null

    };
    this.headerChange = this.headerChange.bind(this);
    this.footerChange = this.footerChange.bind(this);
    this.handleImageSrc = this.handleImageSrc.bind(this);
    this.handleExport = this.handleExport.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  headerChange({ target }) {
    this.setState({ header: target.value });
  }

  footerChange({ target }) {
    this.setState({ footer: target.value });
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
    const { header, footer, image } = this.state;

    return (
      <main>
        <h1>Is it A Pigeon?</h1>
        <h2>You Tell Me!</h2>
        <fieldset>
          <div>
            <label>
              Header:
              <input value={header} onChange={event => this.headerChange(event)}/>
            </label>
            <br />
            <label>
              Footer:
              <input value={footer} onChange={event => this.footerChange(event)}/>
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
              Export dis meme
            </button>
          </div>

          <div className="image-container" ref={node => this.imageExport = node}>
            <div id="memeHeader">{header}</div>
            <div id="memeFooter">{footer}</div>
            <img id="topImage" src={image}/>
            <img id="baseImage" src={meme}/>
          </div>
        </section>
      </main>
    );

  }

}
"use strict"

class AudioCacher {
  constructor(audioContext, path) {
    this.ctx = audioContext;
    this.filePath = path;
  }

  CacheAudio(audioURL) {
    // create a promise to async receive the buffer.
    return new Promise( (resolve, reject)=>{
      let req = new XMLHttpRequest();
      req.responseType = `arraybuffer`;

      // Check if the given url/path is a blob or not.
      if(audioURL.includes(`http`)) req.open(`GET`, audioURL, true);
      else req.open(`GET`, `${this.filePath + audioURL}`, true);
      // Send a request to obtain data from the url.
      req.send();

      // The file has been received.
      req.onload = ()=>{
        // Decode the file, and store the data.
        this.ctx.decodeAudioData(req.response, (buffer)=>{
          // Return the decoded audio data as buffer through the promise.
          resolve(buffer);
        },(err)=>{
          // Return an error message through the promise.
          reject(`Rejected: ${err}`);
        });
      }
    });
  }

}

"use strict"

var setupComplete = false;

var audioCtx, masterGain, audioData, audioCacher, rec;
/*
window.addEventListener(`click`, ()=>{
  SetupAudioSystem(`audio/`);
});

document.body.addEventListener(`touchstart`, ()=>{
  SetupAudioSystem(`audio/`);
});
*/

// Set main volume
function SetVolume(volume) {
  masterGain.gain.value = volume;
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// maybe rewrite record script?
function SetRecorder(recorder) {
  rec = recorder;
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

/// Setup the main variables for the AudioSystem
async function SetupAudioSystem(filePath) {
  if(!setupComplete) {
    try {
      // Change audioContext to webkit when safari is being used.
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext( {sampleRate: 48000} );
      masterGain = audioCtx.createGain();
      masterGain.connect(audioCtx.destination);

      audioData = new AudioData(filePath);
      audioCacher = new AudioCacher( audioCtx, audioData.GetPath() );

      setupComplete = true;

      PreloadSound(`test`, `audio.mp3`);
    }
    catch(err) {
      console.error(err);
      console.log(`Did not setup main audio!`);
    }

  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // just for testing purposes
  else {
    // if(!isRecording) {
    //   rec.start();
    //   isRecording = true;
    // }
    // else {
    //   rec.stop();
    //   isRecording = false;
    // }
  }
  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
}

/// Preload & cache an audiofile for fast playback.
async function PreloadSound(name, fileName) {
  // Stop the this function if a sound with given name already exists.
  if(audioData.IsCached(name)) return;
  // Create & add a cached sound
  try {
    let sound = {
      name: name,
      buffer: await audioCacher.CacheAudio(fileName)
    };
    audioData.AddCache(sound);
  } catch (err) {
    console.error(err);
  }
}

/// Play the sound with given name as a buffer through a buffersource.
async function PlaySound(name, loop) {
  try {
    // Create a playable sound
    let cSound, pSound;
    cSound = await audioData.GetCached(name);
    pSound = {
      name: cSound.name,
      source: audioCtx.createBufferSource(),
      gain: audioCtx.createGain()
    }
    // Assign the sound & gain to the masterGain
    pSound.source.buffer = cSound.buffer;
    pSound.source.connect(pSound.gain);
    pSound.gain.connect(masterGain);
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    // create panner for 3d sound (source -> gain -> panner)

    if(loop) pSound.source.loop = true;

    // Remove the playable sound after it has stopped playing.
    pSound.source.onended = ()=>{
      if(audioData.IsPlaying(pSound.name));
    }

    // Start & add the playable sound
    pSound.source.start(0);
    audioData.AddPlaying(pSound);
  }
  catch(err) {
    // Log if there are any errors.
    console.log(err);
  }
}

/// Stop sound with given name.
// delay > the amount of time before the sound stops.
// fadeTime > the amout of time it takes for the volume to reach 0 after the delay.
// exponentional > controls if the fade will be done in a straightline or a bezier curve.
async function StopSound(name, delay, fadeTime, exponentional) {
  try {
    // Gather sound
    let pSound = await audioData.GetPlaying(name);
    // Check if delay is assigned, if not set it to 0 to avoid possible issues.
    if(delay == null) delay = 0;

    if(fadeTime == null || fadeTime <= 0) {
      // If there is no fade, stop immediately after the delay.
      setTimeout( ()=>{
        pSound.source.stop(0);
        pSound.source.disconnect();
        pSound.gain.disconnect();
        audioData.RemovePlaying(name);
      }, delay);
    }
    else {
      // Fade the volume after the delay
      setTimeout( ()=>{
        if(!exponentional) pSound.gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + fadeTime/1000);
        else pSound.gain.gain.exponentialRampToValueAtTime(0.0000001, audioCtx.currentTime + fadeTime/1000);

        setTimeout( ()=>{
          // Stop the sound 10 miliseconds after the fade is completed
          pSound.source.stop(0);
          pSound.source.disconnect();
          pSound.gain.disconnect();
          audioData.RemovePlaying(name);
        }, fadeTime + 10 );

      }, delay);
    }
  }
  catch(err) {
    // Log if there are any errors.
    console.log(err);
  }

}

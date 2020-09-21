"use strict"

/// This class is meant to cache('store') buffers from audiofiles, and keep track which buffers are playing.
// This class has functions to make storing/removing buffers easier.
class AudioData {
  constructor(path) {
    this.filePath = path;
    this.cachedSounds = [];
    this.playingSounds = [];
  }

  /// Check if a sound is cached.
  IsCached(name) {
    let result = false;
    this.cachedSounds.forEach( (sound)=>{
      if(sound.name == name) result = true;
    });
    return result;
  }

  /// Add a sound (buffer) to the cache.
  AddCache(sound) {
    this.cachedSounds.forEach( (cSound)=>{
      if(cSound.name == sound.name) return;
    });

    this.cachedSounds.push(sound);
  }

  /// Remove a sound from the cache.
  RemoveCache(name) {
    if(this.IsCached(name)) {
      for(let i = 0; i < this.cachedSounds.length; ++i) {
        if(this.cachedSounds[i].name == name) {
          this.cachedSounds.splice(i, 1);
          return;
        }
      }
    }
  }

  /// Get a sound from the cache.
  // Has to be called with await infront to work (in an async function).
  GetCached(name) {
    return new Promise( (resolve, reject)=>{
      this.cachedSounds.forEach( (cSound)=>{
        if(cSound.name == name) resolve(cSound);
      });
      reject(`There is no cached sound with this name!`);
    });
  }

  /// Check is a sound is currently playing.
  IsPlaying(name) {
    let result = false;
    this.playingSounds.forEach( (sound)=>{
      if(sound.name == name) result = true;
    });
    return result;
  }

  /// Add a playing sound.
  AddPlaying(sound) {
    if(!this.IsPlaying(sound.name)) this.playingSounds.push(sound);
  }

  /// Remove a playing sound.
  RemovePlaying(name) {
    if(this.IsPlaying(name)) {
      for(let i = 0; i < this.playingSounds.length; ++i) {
        if(this.playingSounds[i].name == name) {
          this.playingSounds.splice(i, 1);
          return;
        }
      }
    }
  }

  /// Get a playing sound.
  // Has to be called with await infront to work (in an async function).
  GetPlaying(name) {
    return new Promise( (resolve, reject)=>{
      this.playingSounds.forEach( (pSound)=>{
        if(pSound.name == name) resolve(pSound);
      });
      reject(`There is no sound playing with this name!`);
    });
  }

  /// Retrieve the path where the audiofiles are stored.
  GetPath() {return this.filePath;}

}

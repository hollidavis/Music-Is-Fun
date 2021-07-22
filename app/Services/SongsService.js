import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(res.results)
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMyPlaylist() {
    const res = await sandBoxApi.get()
    console.log(res.data)

    ProxyState.playlist = res.data.map(p => new Song(p))
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * 
   */
  async addSong() {
    const res = await sandBoxApi.post('', ProxyState.activeSong)
    console.log(res.data)

    const newSong = new Song(res.data)
    console.log(newSong)
    ProxyState.playlist = [...ProxyState.playlist, newSong]
    console.log(ProxyState.playlist)

    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
  }

  setActiveSong(id) {
    let foundSong = ProxyState.songs.find(s => s.id == id)
    ProxyState.activeSong = foundSong
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    const res = await sandBoxApi.delete(id)
    ProxyState.playlist = ProxyState.playlist.filter(p => p.id != id)
  }
}

const service = new SongsService();
export default service;

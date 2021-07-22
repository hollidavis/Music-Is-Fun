import { ProxyState } from "../AppState.js";
import songService from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let template = ''
  ProxyState.songs.forEach(s => {
    if (s.title && s.kind == "song") {
      template += `<div class="d-flex justify-content-between my-2">
    <p class="m-0" onclick="app.songsController.setActiveSong('${s.id}')"><small>${s.title}</small></p>
    <div>
    <button type="button" class="btn btn-primary btn-sm" onclick="app.songsController.setActiveSong('${s.id}')">Preview</button>
    </div>
</div>`
    }
  })
  document.getElementById('results').innerHTML = template
}

/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = ''
  ProxyState.playlist.forEach(p => {
    template += p.playlistTemplate
  })
  document.getElementById('playlist').innerHTML = template
  if (!template) {
    document.getElementById('playlist').innerHTML = `<p>Search for songs to add to your playlist!</p>`
  }

}

function _drawActiveSong() {
  document.getElementById('songs').innerHTML = ProxyState.activeSong.Template
}


//Public
export default class SongsController {
  constructor() {
    ProxyState.on('songs', _drawResults)
    ProxyState.on('playlist', _drawPlaylist)
    ProxyState.on('activeSong', _drawActiveSong)
    this.getMyPlaylist()

  }
  async getMyPlaylist() {
    try {
      await songService.getMyPlaylist()
    } catch (error) {
      console.error(error)
    }
  }
  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  async setActiveSong(id) {
    try {
      await songService.setActiveSong(id)
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * 
   */
  async addSong() {
    try {
      await songService.addSong()
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  async removeSong(id) {
    try {
      await songService.removeSong(id)
    } catch (error) {
      console.error(error)
    }
  }
}


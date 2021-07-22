export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt = data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get Template() {
    return `
<div class="card shadow">
    <img class="card-img-top" src="" alt="">
    <div class="card-body text-center">
        <h3>${this.artist} - ${this.title}</h3>
        <p>${this.album} | Buy now: ${this.price}</p>
        <audio controls>
          <source src="${this.preview}">
        </audio>
    </div>
    <div class = "text-right">
    <button type="button" class="btn btn-primary" onclick="app.songsController.addSong('${this._id}')">Add to Playlist</button>
    </div>
</div>
        `;
  }

  get playlistTemplate() {
    return `<p>${this.title}</p>`
  }
}

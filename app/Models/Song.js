export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt = data.albumArt || data.artworkUrl100.replace(/100x100/g, "200x200");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this.id = data.trackId || data._id;
    this.kind = data.kind.toLowerCase()
  }

  get Template() {
    return `
<div class="card w-50 shadow p-0 side-bar-scroll mt-2">
    <img class="img-fix card-img-top" src="${this.albumArt}" alt="${this.title}">
    <div class="card-body text-center p-1">
        <h5>${this.artist} - ${this.title}</h5>
        <p>${this.album} | Buy now: ${this.price}</p>
        <audio controls>
          <source src="${this.preview}">
        </audio>
    </div>
    <div class = "text-right">
</div>
        `;
  }

  get playlistTemplate() {
    return `
    <div class="">
    <div class="d-flex justify-content-between">
    <p><b>${this.artist} - ${this.title}</b></p>
    <button type="button" class="btn btn-danger" onclick="app.songsController.removeSong('${this.id}')">X</button>
    </div>
    <p>${this.album}</p>
    </div>
    `
  }
}

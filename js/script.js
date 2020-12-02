var app = new Vue ({ //instanzio vue
  el: "#app",
  data: {
    moviesDb: [], //creo una proprietà email che è un array vuoto in cui pusherò tutti i dischi, ogni disco è un oggetto contennete informazioni
    inputSearch: ""
  },
  methods: {
    cercaFilm: function () {
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT', {params: {query: this.inputSearch}})
      .then(risposta => {
        console.log(risposta.data.results);
        this.moviesDb = risposta.data.results;
      });
    }
  }
});

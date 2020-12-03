var app = new Vue ({ //instanzio vue
  el: "#app",
  data: {
    moviesDb: [],
    seriesDb: [],
    totalDb: [],
    inputSearch: ""
  },
  methods: {
    cercaFilm: function () {
      if (this.inputSearch != "") {
        let movies = 'https://api.themoviedb.org/3/search/movie?api_key=00fc6f8f5568da14692dfb2724b20a69&language=it-IT';
        let series = 'https://api.themoviedb.org/3/search/tv?api_key=00fc6f8f5568da14692dfb2724b20a69&language=it-IT';

        let requestMovies = axios.get(movies, {params: {query: this.inputSearch}});
        let requestSeries = axios.get(series, {params: {query: this.inputSearch}});

        axios.all([requestMovies, requestSeries])
        .then(axios.spread((...responses) => {
          this.moviesDb = responses[0].data.results;
          // console.log('THIS.MOVIESDB', this.moviesDb)
          this.seriesDb = responses[1].data.results;
          // console.log('THIS.SERIESDB', this.seriesDb)
          this.roundRate();
          this.languageFlag();
          this.resizePoster();
        }))
      } else {
        this.moviesDb = [];
        this.seriesDb = [];
      }

    },
    roundRate: function () {
      this.moviesDb.forEach((item) => {
        item.vote_average = Math.ceil(item.vote_average / 2);
      });
      this.seriesDb.forEach((item) => {
        item.vote_average = Math.ceil(item.vote_average / 2);
      });
    },
    languageFlag: function () {
      this.moviesDb.forEach((item) => {
        item.original_language = "img/"+item.original_language+".svg";
      });
      this.seriesDb.forEach((item) => {
        item.original_language = "img/"+item.original_language+".svg";
      });
    },
    resizePoster: function () {
      this.moviesDb.forEach((item) => {
        item.poster_path = "https://image.tmdb.org/t/p/w342"+item.poster_path;
      });
      this.seriesDb.forEach((item) => {
        item.poster_path = "https://image.tmdb.org/t/p/w342"+item.poster_path;
      });
    }
  }
});

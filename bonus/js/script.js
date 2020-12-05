var app = new Vue ({
  el: "#app",
  data: {
    moviesDb: [],
    seriesDb: [],
    totalDb: [],
    inputSearch: "",
    cast: [],
    genres: []
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
          this.seriesDb = responses[1].data.results;
          this.arrayManagement();
          this.totalDb = this.unioneArray();
          // console.log('THIS.TOTALDB', this.totalDb);
        }))
      } else {
        this.moviesDb = [];
        this.seriesDb = [];
        this.totalDb = [];
      }
    },
    arrayManagement: function () {
      this.moviesDb.forEach((item) => {
        item.vote_average = Math.ceil(item.vote_average / 2);
        item.original_language = "img/"+item.original_language+".svg";
        item.poster_path = "https://image.tmdb.org/t/p/w342"+item.poster_path;
        item.type = "movie";
      });
      this.seriesDb.forEach((item) => {
        item.vote_average = Math.ceil(item.vote_average / 2);
        item.original_language = "img/"+item.original_language+".svg";
        item.poster_path = "https://image.tmdb.org/t/p/w342"+item.poster_path;
        item.type = "TVseries";
      });
    },
    unioneArray: function () {
      return [...this.moviesDb,...this.seriesDb];
    },
    genresCast: function (type, id) {
      if (type == "movie") {
        this.cast = [];
        this.genres = [];
        axios.get("https://api.themoviedb.org/3/movie/" + id + "?api_key=00fc6f8f5568da14692dfb2724b20a69&language=it-IT&append_to_response=credits")
        .then(risposta => {
          // for (var i = 0; i < 5; i++) {
          //   this.cast.push(risposta.data.credits.cast[i].name);
          //   this.genres.push(risposta.data.genres[i].name);
          // }
          risposta.data.credits.cast.forEach((item, i) => {
            if (i<5) {
              this.cast.push(item.name);
            }
          });
          risposta.data.genres.forEach((item, i) => {
            if (i<4) {
              this.genres.push(item.name);
            }
          });
        })
      } else {
        this.cast = [];
        this.genres = [];
        axios.get("https://api.themoviedb.org/3/tv/" + id + "?api_key=00fc6f8f5568da14692dfb2724b20a69&language=it-IT&append_to_response=credits")
        .then(risposta => {
          // for (var i = 0; i < 5; i++) {
          //   this.cast.push(risposta.data.credits.cast[i].name);
          //   this.genres.push(risposta.data.genres[i].name);
          // }
          risposta.data.credits.cast.forEach((item, i) => {
            if (i<5) {
              this.cast.push(item.name);
            }
          });
          risposta.data.genres.forEach((item, i) => {
            if (i<4) {
              this.genres.push(item.name);
            }
          });
        })
      }
    }
  }
});

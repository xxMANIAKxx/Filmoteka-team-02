parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"k3YC":[function(require,module,exports) {
module.exports="/Filmoteka-team-02/no_picture.1801d039.jpg";
},{}],"rV7j":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.noPosterImage=exports.pagination=exports.renderMoviesInputTitle=exports.renderMoviesFirstLoad=exports.fetchMoviesByGenre=exports.fetchMovieById=exports.fetchInputMovieTitle=exports.fetchFirstLoadMovies=exports.paginationButtons=exports.galleryOfMovies=exports.inputFormGenreChange=exports.inputFormTitle=exports.inputFormButton=void 0;const e=document.querySelector(".search-form__input");exports.inputFormTitle=e;const t=document.querySelector(".search-form__btn");exports.inputFormButton=t;const n=document.querySelector(".header__genre-option");exports.inputFormGenreChange=n;const a=document.querySelector(".gallery_movies");exports.galleryOfMovies=a;const o=document.querySelector(".genres"),i=document.querySelector(".pagination_buttons");exports.paginationButtons=i;const s=require("../images/misc/no_picture.jpg");exports.noPosterImage=s;const r="?api_key=fd87aef18dfd3a2446d882cb85b7272d",c="https://api.themoviedb.org/3",l="/trending/all/day",d="/search/movie",p="/discover/movie",m="/genre/movie/list",v="/genre/tv/list",_="/trending/movie/day",g="/trending/movie/week",u=async e=>{const t=await fetch(`${c}${l}${r}&page=${e}&include_adult=false`);return await t.json()};exports.fetchFirstLoadMovies=u;const $=async(e,t)=>{const n=await fetch(`${c}/search/movie${r}&query=${t}&page=${e}&include_adult=false`);return await n.json()};exports.fetchInputMovieTitle=$;const y=async(e,t="movie")=>{const n=await fetch(`${c}/${t}/${e}${r}`);return await n.json()};exports.fetchMovieById=y;const f=async(e,t)=>{const n=await fetch(`${c}/discover/movie${r}&page=${e}&include_adult=false&with_genres=${t}`);return await n.json()};exports.fetchMoviesByGenre=f;let h=async e=>{const t=await F();a.innerHTML="";const n=e.map(({poster_path:e,title:n,name:a,genre_ids:o,release_date:i,first_air_date:r,vote_average:c,id:l,media_type:d,original_title:p,original_name:m})=>`\n                <li class="movie-card" data-id="${l}" data-type="${d}">\n                    <img class="movie-card__img" src="${null!=e?`https://image.tmdb.org/t/p/w500/${e}`:s}" alt="poster of '${n||a}'"  loading="lazy"/>\n                    <h2 class="movie-card__title">${n||a}</h2>\n                    <div class="movie-card__info">\n                        <p class="movie-card__genre-and-year">\n                            <span class="movie-card__genre">${o.map(e=>t[e]).splice(0,2).join(", ")}</span>\n                            <span class="movie-card__year">| ${(i||(r||"no-data")).slice(0,4)}</span>\n                        </p>\n                        <p class="movie-card__vote-average">${c.toFixed(2)}</p>\n                    </div>\n                </li>\n            `).join("");return a.insertAdjacentHTML("beforeend",n)};exports.renderMoviesFirstLoad=h;let x=async e=>{const t=await F();a.innerHTML="";const n=e.map(({poster_path:e,title:n,name:a,genre_ids:o,release_date:i,first_air_date:r,vote_average:c,id:l,media_type:d,original_title:p,original_name:m})=>`\n                <li class="movie-card" data-id="${l}" data-type="movie">\n                    <img class="movie-card__img" src="${null!=e?`https://image.tmdb.org/t/p/w500/${e}`:s}" alt="${n||a}" loading="lazy" />\n                    <h2 class="movie-card__title">${n||a}</h2>\n\n                    <div class="movie-card__info">\n                        <p class="movie-card__genre-and-year">\n                            <span class="movie-card__genre">${o.map(e=>t[e]).splice(0,2).join(", ")}</span>\n                            <span class="movie-card__year">${(i||(r||"no-data")).slice(0,4)}</span>\n                        </p>\n                        <p class="movie-card__vote-average">${c.toFixed(2)}</p>\n                    </div>\n                </li>\n            `).join("");return a.insertAdjacentHTML("beforeend",n)};exports.renderMoviesInputTitle=x;const M=async()=>{const e=await fetch(`${c}/genre/movie/list${r}&language=en-US`),t=await fetch(`${c}/genre/tv/list${r}&language=en-US`),n=await e.json(),a=await t.json(),o=[...new Map([...n.genres,...a.genres].map(e=>[e.id,e])).values()];return j=o,o};let w,j;console.log(j);const F=async()=>(w||(w=await M()),w.reduce((e,t)=>({...e,[t.id]:t.name}),{}));let T=()=>{o.innerHTML="";const e=allGenresListMenu.map(e=>`\n                <div>\n                    <ul>\n                        <li class="genres">${e}</li>\n                    </ul>\n                </div>\n            `).join("");return o.insertAdjacentHTML("beforeend",e)};const b=async(e,t)=>{};exports.pagination=b;
},{"../images/misc/no_picture.jpg":"k3YC"}],"MgTz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeFromLibrary=exports.addToLibrary=exports.remove=exports.load=exports.save=void 0;const e=(e,r)=>{try{const o=JSON.stringify(r);localStorage.setItem(e,o)}catch(t){console.error("Set state error: ",t.message)}};exports.save=e;const r=e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(r){console.error("Get state error: ",r.message)}};exports.load=r;const t=e=>{try{localStorage.removeItem(e)}catch(r){console.error("Get state error: ",r.message)}};exports.remove=t;const o=(t,o,s="watchedList")=>{const a=r(s);if(null==a){let r=[];return r.push({movieId:t,type:o}),e(s,r)}let c=!1;return a.forEach(e=>{e.movieId==t&&e.type===o&&(c=!0)}),c?alert("Movie already on the list."):(a.push({movieId:t,type:o}),e(s,a))};exports.addToLibrary=o;const s=(t,o,s="watchedList")=>{let a=r(s);return a=a.filter(e=>{if(e.movieId!=t&&e.type!=o)return e}),e(s,a)};exports.removeFromLibrary=s;
},{}],"RSqK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addModalListenerFunction=exports.getMovieAndDisplayModal=void 0;var t=require("./fetchData"),e=require("./utils");const s=document.querySelector("[data-modal]");document.addEventListener("click",t=>{!t.target.matches("[data-modal-close]")&&t.target.closest("[data-modal]")||s.classList.add("is-hidden")}),document.addEventListener("keydown",t=>{"Escape"===t.code&&s.classList.add("is-hidden")});const n=()=>{document.querySelectorAll(".movie-card").forEach(t=>{t.addEventListener("click",()=>{i(t.dataset.id,t.dataset.type)})})};exports.addModalListenerFunction=n;const i=async(n,i)=>{var a,l;const o=await(0,t.fetchMovieById)(n,i);let r=!1,d=!1;null===(a=(0,e.load)("watchedList"))||void 0===a||a.forEach(t=>{t.movieId==n&&t.type===i&&(r=!0)}),null===(l=(0,e.load)("queueList"))||void 0===l||l.forEach(t=>{t.movieId==n&&t.type===i&&(d=!0)}),s.classList.remove("is-hidden");let c=`\n      <ul class="modal__pic">\n          <li class="pic">\n              <picture>\n                  <source\n                      src="${o.poster_path?`https://image.tmdb.org/t/p/w300/${o.poster_path}`:t.noPosterImage}"\n                      srcset="${o.poster_path?`https://image.tmdb.org/t/p/w300/${o.poster_path}`:t.noPosterImage} 2x"\n                      media="(min-width:320px) and (max-width:767px)"/>\n                  <source\n                      src="${o.poster_path?`https://image.tmdb.org/t/p/w500/${o.poster_path}`:t.noPosterImage}"\n                      srcset="${o.poster_path?`https://image.tmdb.org/t/p/w500/${o.poster_path}`:t.noPosterImage} 2x"\n                      media="(min-width:768px) and (max-width:1023px)"/>\n                  <source\n                      src="${o.poster_path?`https://image.tmdb.org/t/p/w500/${o.poster_path}`:t.noPosterImage}"\n                      srcset="${o.poster_path?`https://image.tmdb.org/t/p/w500/${o.poster_path}`:t.noPosterImage} 2x"\n                      media="(min-width:1024px)"/>\n                  <img src="${o.poster_path?`https://image.tmdb.org/t/p/w500/${o.poster_path}`:t.noPosterImage}" \n                      alt="A FISTFUL OF LEAD"\n                  />\n              </picture>\n          </li>\n\n          <button class="modal__close-btn" type="button">\n              <svg class="modal__close-icon" width="18" height="18" data-modal-close>\n                  <use xlink:href="../images/svg/modal-close-btn.svg#close-btn"></use>\n              </svg>\n          </button>\n        \n        <ul class="modal__description">\n            <ul class="description__list">\n                <li class="description__film">${void 0===o.title?o.name:o.title}</li>\n                    <ul class="description__vote">\n                        <li class="vote__text">Vote / Votes</li>\n                        <li class="vote__value"><span class="vote__mark">${o.vote_average.toFixed(1)}</span> / <span class="votes__mark">${o.vote_count}\n                        </span></li>\n                    </ul>\n                    <ul class="description__popularity">\n                        <li class="popularity__text">Popularity</li>\n                        <li class="popularity__value">${o.popularity.toFixed(1)}</li>\n                    </ul>\n                    <ul class="description__title">\n                        <li class="title__text">Original Title</li>\n                        <li class="title__value">${void 0===o.original_title?o.original_name:o.original_title}</li>\n                    </ul>\n                    <ul class="description__genre">\n                        <li class="genre__text">Genre</li>\n                        <li class="genre__value">${[...o.genres.map(t=>t.name)].join(", ")}</li>\n                    </ul>\n                <li class="description__header">ABOUT</li>\n                <li class="description__text">${o.overview}</li>\n                <ul class="description__btn">\n                    <li><button class="watched-btn">ADD TO WATCHED</button></li>\n                    <li><button class="queue-btn">ADD TO QUEUE</button></li>\n                    <li></li>\n                </ul>\n            </ul>\n        </ul>`;s.innerHTML=c;let p=document.querySelector(".watched-btn"),u=document.querySelector(".queue-btn");r&&(p.innerHTML="On List"),d&&(u.innerHTML="On List");const _=(t,s,a)=>{let l;null!=a&&("watched"===a?l=r:"queue"===a&&(l=d),l?((0,e.removeFromLibrary)(n,i,s),t.innerHTML=`Add to ${a}`):((0,e.addToLibrary)(n,i,s),t.innerHTML="Added"),"watched"===a?r=!r:"queue"===a&&(d=!d))};p.addEventListener("click",()=>{_(p,"watchedList","watched")}),u.addEventListener("click",()=>{_(u,"queueList","queue")})};exports.getMovieAndDisplayModal=i;
},{"./fetchData":"rV7j","./utils":"MgTz"}]},{},["RSqK"], null)
//# sourceMappingURL=/Filmoteka-team-02/modal.d1c85e05.js.map
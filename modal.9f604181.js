parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"k3YC":[function(require,module,exports) {
module.exports="/Filmoteka-team-02/no_picture.1801d039.jpg";
},{}],"rV7j":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.noPosterImage=exports.renderMoviesInputTitle=exports.renderMoviesFirstLoad=exports.fetchMoviesByGenre=exports.fetchMovieById=exports.fetchInputMovieTitle=exports.fetchFirstLoadMovies=exports.paginationButtons=exports.galleryOfMovies=exports.inputFormGenreChange=exports.inputFormTitle=exports.inputFormButton=void 0;const e=document.querySelector(".search-form__input");exports.inputFormTitle=e;const t=document.querySelector(".search-form__btn");exports.inputFormButton=t;const n=document.querySelector(".header__genre-option");exports.inputFormGenreChange=n;const a=document.querySelector(".gallery_movies");exports.galleryOfMovies=a;const i=document.querySelector(".genres"),o=document.querySelector(".pagination_buttons");exports.paginationButtons=o;const s=require("../images/misc/no_picture.jpg");exports.noPosterImage=s;const r="?api_key=fd87aef18dfd3a2446d882cb85b7272d",c="https://api.themoviedb.org/3",d="/trending/all/day",l="/search/movie",p="/discover/movie",m="/genre/movie/list",v="/genre/tv/list",_="/trending/movie/day",g="/trending/movie/week",u=async e=>{const t=await fetch(`${c}${d}${r}&page=${e}&include_adult=false`);return await t.json()};exports.fetchFirstLoadMovies=u;const $=async(e,t)=>{const n=await fetch(`${c}/search/movie${r}&query=${t}&page=${e}&include_adult=false`);return await n.json()};exports.fetchInputMovieTitle=$;const y=async(e,t="movie")=>{const n=await fetch(`${c}/${t}/${e}${r}`);return await n.json()};exports.fetchMovieById=y;const f=async(e,t)=>{const n=await fetch(`${c}/discover/movie${r}&page=${e}&include_adult=false&with_genres=${t}`);return await n.json()};exports.fetchMoviesByGenre=f;let h=async e=>{const t=await F();a.innerHTML="";const n=e.map(({poster_path:e,title:n,name:a,genre_ids:i,release_date:o,first_air_date:r,vote_average:c,id:d,media_type:l,original_title:p,original_name:m})=>`\n                <li class="movie-card" data-id="${d}" data-type="${l}">\n                    <img class="movie-card__img" src="${null!=e?`https://image.tmdb.org/t/p/w500/${e}`:s}" alt="poster of '${n||a}'"  loading="lazy"/>\n                    <h2 class="movie-card__title">${n||a}</h2>\n                    <div class="movie-card__info">\n                        <p class="movie-card__genre-and-year">\n                            <span class="movie-card__genre">${i.map(e=>t[e]).splice(0,2).join(", ")}</span>\n                            <span class="movie-card__year">| ${(o||(r||"no-data")).slice(0,4)}</span>\n                        </p>\n                        <p class="movie-card__vote-average">${c.toFixed(2)}</p>\n                    </div>\n                </li>\n            `).join("");return a.insertAdjacentHTML("beforeend",n)};exports.renderMoviesFirstLoad=h;let x=async e=>{const t=await F();a.innerHTML="";const n=e.map(({poster_path:e,title:n,name:a,genre_ids:i,release_date:o,first_air_date:r,vote_average:c,id:d,media_type:l,original_title:p,original_name:m})=>`\n                <li class="movie-card" data-id="${d}" data-type="movie">\n                    <img class="movie-card__img" src="${null!=e?`https://image.tmdb.org/t/p/w500/${e}`:s}" alt="${n||a}" loading="lazy" />\n                    <h2 class="movie-card__title">${n||a}</h2>\n\n                    <div class="movie-card__info">\n                        <p class="movie-card__genre-and-year">\n                            <span class="movie-card__genre">${i.map(e=>t[e]).splice(0,2).join(", ")}</span>\n                            <span class="movie-card__year">${(o||(r||"no-data")).slice(0,4)}</span>\n                        </p>\n                        <p class="movie-card__vote-average">${c.toFixed(2)}</p>\n                    </div>\n                </li>\n            `).join("");return a.insertAdjacentHTML("beforeend",n)};exports.renderMoviesInputTitle=x;const M=async()=>{const e=await fetch(`${c}/genre/movie/list${r}&language=en-US`),t=await fetch(`${c}/genre/tv/list${r}&language=en-US`),n=await e.json(),a=await t.json(),i=[...new Map([...n.genres,...a.genres].map(e=>[e.id,e])).values()];return j=i,i};let w,j;const F=async()=>(w||(w=await M()),w.reduce((e,t)=>({...e,[t.id]:t.name}),{}));let T=()=>{i.innerHTML="";const e=j.map(e=>`\n                <div>\n                    <ul>\n                        <li class="genres">${e}</li>\n                    </ul>\n                </div>\n            `).join("");return i.insertAdjacentHTML("beforeend",e)};
},{"../images/misc/no_picture.jpg":"k3YC"}],"qF0P":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getAllLibraryMovies=void 0;var e=require("./fetchData"),t=require("./modal");const i=async(i,r)=>{let a=[];e.galleryOfMovies.innerHTML="","watchedList"===r?e.galleryOfMovies.setAttribute("data-listtype","watched"):e.galleryOfMovies.setAttribute("data-listtype","queue");const s=[];if(null!=i){for(const t of i){let i=await(0,e.fetchMovieById)(t.movieId,t.type).then(e=>e);i={...i,genre_ids:[...i.genres.map(e=>e.id)],media_type:t.type},s.push(i)}a=[...s],await(0,e.renderMoviesFirstLoad)(a),(0,t.addModalListenerFunction)()}};exports.getAllLibraryMovies=i;
},{"./fetchData":"rV7j","./modal":"RSqK"}],"MgTz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.removeFromLibrary=exports.addToLibrary=exports.remove=exports.load=exports.save=void 0;const e=(e,r)=>{try{const o=JSON.stringify(r);localStorage.setItem(e,o)}catch(t){console.error("Set state error: ",t.message)}};exports.save=e;const r=e=>{try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(r){console.error("Get state error: ",r.message)}};exports.load=r;const t=e=>{try{localStorage.removeItem(e)}catch(r){console.error("Get state error: ",r.message)}};exports.remove=t;const o=(t,o,s="watchedList")=>{const a=r(s);if(null==a){let r=[];return r.push({movieId:t,type:o}),e(s,r)}let c=!1;return a.forEach(e=>{e.movieId==t&&e.type===o&&(c=!0)}),c?alert("Movie already on the list."):(a.push({movieId:t,type:o}),e(s,a))};exports.addToLibrary=o;const s=(t,o,s="watchedList")=>{let a=r(s);return a=a.filter(e=>{if(e.movieId!=t)return e}),e(s,a)};exports.removeFromLibrary=s;
},{}],"pnJs":[function(require,module,exports) {
module.exports="/Filmoteka-team-02/symbol-defs.335e4bc3.svg";
},{}],"RSqK":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.addModalListenerFunction=exports.getMovieAndDisplayModal=void 0;var e=require("./fetchData"),t=require("./libraryHelper"),s=require("./utils");const i=document.querySelector("[data-modal]"),a=require("../images/svg/symbol-defs.svg");document.addEventListener("click",e=>{!e.target.matches("[data-modal-close]")&&e.target.closest(".modal")||i.classList.add("is-hidden")}),document.addEventListener("keydown",e=>{"Escape"===e.code&&i.classList.add("is-hidden")});const l=()=>{document.querySelectorAll(".movie-card").forEach(e=>{e.addEventListener("click",()=>{n(e.dataset.id,e.dataset.type)})})};exports.addModalListenerFunction=l;const n=async(l,n)=>{var o,r;const d=await(0,e.fetchMovieById)(l,n);console.log(d);let c=!1,p=!1;null===(o=(0,s.load)("watchedList"))||void 0===o||o.forEach(e=>{e.movieId==l&&e.type===n&&(c=!0)}),null===(r=(0,s.load)("queueList"))||void 0===r||r.forEach(e=>{e.movieId==l&&e.type===n&&(p=!0)}),i.classList.remove("is-hidden");let u=`\n  <div class="modal">\n      <ul class="modal__pic">\n          <li class="pic">\n              <picture>\n                  <source\n                      src="${d.poster_path?`https://image.tmdb.org/t/p/w300/${d.poster_path}`:e.noPosterImage}"\n                      srcset="${d.poster_path?`https://image.tmdb.org/t/p/w300/${d.poster_path}`:e.noPosterImage} 2x"\n                      media="(min-width:320px) and (max-width:767px)"/>\n                  <source\n                      src="${d.poster_path?`https://image.tmdb.org/t/p/w500/${d.poster_path}`:e.noPosterImage}"\n                      srcset="${d.poster_path?`https://image.tmdb.org/t/p/w500/${d.poster_path}`:e.noPosterImage} 2x"\n                      media="(min-width:768px) and (max-width:1023px)"/>\n                  <source\n                      src="${d.poster_path?`https://image.tmdb.org/t/p/w500/${d.poster_path}`:e.noPosterImage}"\n                      srcset="${d.poster_path?`https://image.tmdb.org/t/p/w500/${d.poster_path}`:e.noPosterImage} 2x"\n                      media="(min-width:1024px)"/>\n                  <img src="${d.poster_path?`https://image.tmdb.org/t/p/w500/${d.poster_path}`:e.noPosterImage}" \n                      alt="A FISTFUL OF LEAD"\n                  />\n              </picture>\n          </li>\n\n          <button class="modal__close-btn" type="button">\n              <svg class="modal__close-icon" viewBox="-3 -3 60 55" data-modal-close>\n              <use xlink:href="${a}#icon-close"></use>\n              </svg>\n          </button>\n        \n        <ul class="modal__description">\n            <ul class="description__list">\n                <li class="description__film">${void 0===d.title?d.name:d.title}</li>\n                    <ul class="description__vote">\n                        <li class="vote__text">Vote / Votes</li>\n                        <li class="vote__value"><span class="vote__mark">${d.vote_average.toFixed(1)}</span> / <span class="votes__mark">${d.vote_count}\n                        </span></li>\n                    </ul>\n                    <ul class="description__popularity">\n                        <li class="popularity__text">Popularity</li>\n                        <li class="popularity__value">${d.popularity.toFixed(1)}</li>\n                    </ul>\n                    <ul class="description__title">\n                        <li class="title__text">Original Title</li>\n                        <li class="title__value">${void 0===d.original_title?d.original_name:d.original_title}</li>\n                    </ul>\n                    <ul class="description__genre">\n                        <li class="genre__text">Genre</li>\n                        <li class="genre__value">${[...d.genres.map(e=>e.name)].join(", ")}</li>\n                    </ul>\n                <li class="description__header">ABOUT</li>\n                <li class="description__text">${d.overview}</li>\n                <ul class="description__btn">\n                    <li><button class="watched-btn">ADD TO WATCHED</button></li>\n                    <li><button class="queue-btn">ADD TO QUEUE</button></li>\n                    <li></li>\n                </ul>\n            </ul>\n        </ul>\n  </div>`;i.innerHTML=u;let _=document.querySelector(".watched-btn"),m=document.querySelector(".queue-btn");c&&(_.innerHTML="On List"),p&&(m.innerHTML="On List");const h=(e,t,i)=>{let a;null!=i&&("watched"===i?a=c:"queue"===i&&(a=p),a?((0,s.removeFromLibrary)(l,n,t),e.innerHTML=`Add to ${i}`):((0,s.addToLibrary)(l,n,t),e.innerHTML="Added"),"watched"===i?c=!c:"queue"===i&&(p=!p))};_.addEventListener("click",()=>{if(h(_,"watchedList","watched"),document.location.href.includes("library")&&"watched"===e.galleryOfMovies.dataset.listtype){let e=(0,s.load)("watchedList");(0,t.getAllLibraryMovies)(e,"watchedList")}}),m.addEventListener("click",()=>{if(h(m,"queueList","queue"),document.location.href.includes("library")&&"queue"===e.galleryOfMovies.dataset.listtype){let e=(0,s.load)("queueList");(0,t.getAllLibraryMovies)(e,"queueList")}})};exports.getMovieAndDisplayModal=n;
},{"./fetchData":"rV7j","./libraryHelper":"qF0P","./utils":"MgTz","../images/svg/symbol-defs.svg":"pnJs"}]},{},["RSqK"], null)
//# sourceMappingURL=/Filmoteka-team-02/modal.9f604181.js.map
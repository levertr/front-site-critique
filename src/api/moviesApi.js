import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import request from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);
const API_ROOT = 'http://localhost:8080/';
const encode = encodeURIComponent; //encodage des paramètres de la requête (servira au CRUD)
const responseBody = res => res.body; // retourner la réponse de l'API en json
const headers = {
  'Accept' : 'application/json',
  'Content-Type' : 'application/json'
};
//définition des requêtes standardisées
const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).then(responseBody)
};
const Movies = {
  all: requests.get(`api/movies/`), //Récupérer la liste complète des films sans filtre, retourne un tableau
  create: movie => requests.post(`api/movies`,  movie ).set({
    'Accept' : 'application/json',
  'Content-Type' : 'application/json'
  }),
  update: movie => requests.put(`api/movies`,  movie ).set({
    'Accept' : 'application/json',
  'Content-Type' : 'application/json'
  }),
  delete: id => requests.del(`api/movies/${id}`),
  findOneById : id => requests.get(`api/movies/${encode(id)}`),
};
const Articles = {
  getPage: params => requests.post(`api/articles/page`, params), //Récupérer la liste complète des films sans filtre, retourne un tableau
};
export default {
    Movies,
    Articles
  };
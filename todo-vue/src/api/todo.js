import axios from 'axios';

const uri = 'http://localhost:8080/todos';

export default {
  create: (req) => axios.post(uri, req),
  list: () => axios.get(uri),
};

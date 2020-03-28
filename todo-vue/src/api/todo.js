import axios from 'axios';

const uri = 'http://localhost:8080/todos';

export default {
  create: (req) => axios.post(uri, req),
  list: (pageNo) => axios.get(uri, {
    params: {
      pageNo,
    },
  }),
  delete: (id) => axios.delete(`${uri}/${id}`),
  update: (id, req) => axios.patch(`${uri}/${id}`, req),
};

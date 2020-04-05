import axios from 'axios';

const uri = 'http://localhost:8080/todos';

export default {
  create: (req) => axios.post(uri, req),
  list: (requestData) => {
    const pageNo = requestData.paging.no;
    const { text, type, completed } = requestData.condition;
    return axios.get(uri, {
      params: {
        pageNo,
        text,
        type,
        completed,
      },
    });
  },
  delete: (id) => axios.delete(`${uri}/${id}`),
  update: (id, req) => axios.patch(`${uri}/${id}`, req),
};

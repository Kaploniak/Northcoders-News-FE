import axios from "axios";
const baseURL = "https://news-app-kaploniak.herokuapp.com/api";

export const getAllArticles = async () => {
  const { data } = await axios.get(`${baseURL}/articles`, {
    params: {}
  });
  return data;
};

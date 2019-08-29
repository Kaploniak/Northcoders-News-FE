import axios from "axios";
const baseURL = "https://news-app-kaploniak.herokuapp.com/api";

export const getAllArticles = async ({
  sort_by,
  order,
  author,
  topic,
  limit,
  p
}) => {
  const { data } = await axios.get(`${baseURL}/articles`, {
    params: {
      sort_by,
      order,
      author,
      topic,
      limit,
      p
    }
  });
  return data;
};

export const getArticleById = async article_id => {
  const { data } = await axios.get(`${baseURL}/articles/${article_id}`, {
    params: {}
  });
  return data;
};

export const getAllCommentsByArticleId = async ({
  article_id,
  sort_by,
  order
}) => {
  const { data } = await axios.get(
    `${baseURL}/articles/${article_id}/comments`,
    {
      params: { sort_by, order }
    }
  );
  return data;
};

export const getAllTopics = async () => {
  const { data } = await axios.get(`${baseURL}/topics`);
  return data;
};

export const patchVotes = ({ likeDifference, article_id, comment_id }) => {
  if (article_id) {
    return axios.patch(`${baseURL}/articles/${article_id}`, {
      inc_votes: likeDifference
    });
  } else if (comment_id) {
    return axios.patch(`${baseURL}/comments/${comment_id}`, {
      inc_votes: likeDifference
    });
  }
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`${baseURL}/users`);
  return data;
};

export const postNewTopic = async ({ slug, description }) => {
  await axios.post(`${baseURL}/topics`, { slug, description });
};

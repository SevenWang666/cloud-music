import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (category, alpha, count, area) => {
  return axiosInstance.get(
    `/artist/list?type=${category}&initial=${alpha.toLowerCase()}&offset=${count}&area=${area}`
  );
};

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = (id) => {
  return axiosInstance.get(`/artists?id=${id}`);
};

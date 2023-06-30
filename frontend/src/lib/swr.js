import apiClient from "./apiClient";

export const swrConfig = {
  fetcher: (url) => apiClient.get(url).then((res) => res.data),
};

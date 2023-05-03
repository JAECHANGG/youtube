export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchByKeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: "snippet", id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideos(id) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          relatedToVideoId: id,
        },
      })
      .then((res) => res.data.items) // videos/search.json 에서 데이터를 가져온 뒤
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId }))); // items의 id가 객체이므로 map을 돌려 id를 문자열로 바꿔준다.
  }

  async #searchByKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
        },
      })
      .then((res) => res.data.items) // videos/search.json 에서 데이터를 가져온 뒤
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId }))); // items의 id가 객체이므로 map을 돌려 id를 문자열로 바꿔준다.
  }

  async #mostPopular() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }
}

// js에서 함수앞에 #을 붙이면 프라이빗 함수이다.
// 클래스 내부적으로는 호출이 가능하나 외부에서는 호출할 수 없다.

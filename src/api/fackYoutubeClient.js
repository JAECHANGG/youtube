import axios from "axios";

export default class FakeYoutubeClient {
  async search({ params }) {
    const isRelated = params.relatedToVideoId;
    return isRelated
      ? axios.get("/videos/related.json")
      : axios.get("/videos/search.json");
  }

  async videos() {
    return axios.get("/videos/popular.json");
  }

  async channels() {
    return axios.get("/videos/channel.json");
  }
}

// js에서 함수앞에 #을 붙이면 프라이빗 함수이다.
// 클래스 내부적으로는 호출이 가능하나 외부에서는 호출할 수 없다.

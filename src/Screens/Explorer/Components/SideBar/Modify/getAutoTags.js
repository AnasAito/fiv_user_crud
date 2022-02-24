import { get } from "lodash";
import https from "https";
const axios = require("axios");

const httpsAgent = new https.Agent({ keepAlive: true });
const prepareApiUrl = (link) => {
  const baseUrl = "https://api.semanticscholar.org/v1/paper/";
  //support axriv
  if (link.includes("arxiv")) {
    const list_ = link.split("/");
    const arxivId = list_[list_.length - 1].replace(".pdf", "");
    return baseUrl + "arXiv:" + arxivId;
  }
  // support semantic scholar
  if (link.includes("semanticscholar")) {
    return baseUrl + "url:" + link;
  }
};
export const getKeywords = async (link, setTags, setloading) => {
  console.log(link);
  setloading(true);
  const url = prepareApiUrl(link);
  console.log("for api ", url);
  axios
    .get(url, {
      httpsAgent,

      //is the same as set the entire url
    })
    .then((res) => {
      let status = res.status;
      console.log(status);
      //This should now output the html content
      const data = res.data;
      const topics = get(data, "topics", []).map((t) => t.topic);
      console.log(topics);
      setTags(topics);
      setloading(false);
      //return topics.map((t) => t.topic);
    })
    .catch((err) => {
      console.error(err);
      setTags([]);
      setloading(false);
      //setTags([...tags, ...[]]);
    });
};
const schema = { "get.auto.tags": getKeywords };
export default schema;

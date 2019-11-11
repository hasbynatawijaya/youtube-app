import axios from "axios";

export default axios.create({
  baseURL: "https://slack.com/api"
});

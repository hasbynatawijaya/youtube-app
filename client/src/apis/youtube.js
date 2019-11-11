import axios from "axios";

const KEY = "AIzaSyB7NuHO3ZdViPgw3ZSsiw4qbq2Fh8mnSQM";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResult: 5,
    key: KEY
  }
});

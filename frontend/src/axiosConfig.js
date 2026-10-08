import axios from "axios";

axios.interceptors.request.use((config) => {
  if (
    typeof config.url === "string" &&
    config.url.startsWith("http://localhost:3000")
  ) {
    config.url = config.url.replace(
      "http://localhost:3000",
      import.meta.env.VITE_API_URL
    );
  }

  return config;
});
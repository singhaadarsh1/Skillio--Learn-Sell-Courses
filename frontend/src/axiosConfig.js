import axios from "axios";

axios.interceptors.request.use((config) => {
  if (
    typeof config.url === "string" &&
    config.url.startsWith("http://localhost:3000")
  ) {
    const apiUrl =
      import.meta.env.VITE_API_URL ||
      window.location.origin;

    config.url = config.url.replace(
      "http://localhost:3000",
      apiUrl
    );
  }

  return config;
});
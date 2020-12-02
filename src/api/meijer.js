import axios from "axios";
export default axios.create({
  baseURL: "https://meijerdigital.azurewebsites.net/api",
  headers: {
    "x-functions-key":
      "VockV3fu1c7vBvaG7A4oMALa9WIrPekx8jeH5HeBzuxir2X6NcAE5w==",
  },
});

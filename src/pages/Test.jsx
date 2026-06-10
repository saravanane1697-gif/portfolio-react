import axios from "axios";
import { authHeader } from "../services/authHeader";

export default function Test() {
  axios
    .get("https://localhost:7090/api/profile/secure", authHeader())
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}

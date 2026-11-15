import ky from "ky";
import { env } from "../config/env";

export const apiClient = ky.create({ prefix: "http://localhost:8080",});
// src/Services/RatingandRecommendation.js

import axios from "axios";
import { BASE_URL } from "../Constants/Urls";
import apiClient from "./ApiClient";

// Submit a movie rating and review
export const submitRating = async (payload) => {
  return await apiClient.post(`${BASE_URL}/rating`, payload); // ✅ FIXED
};

// Fetch movie recommendations for a user
export const getRecommendations = async (userId, N = 5) => {
  const res = await apiClient.get(`${BASE_URL}/recommendation/${userId}?N=${N}`);
  return res.data;
};

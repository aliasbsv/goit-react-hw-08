import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://connections-api.goit.global";

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: BASE_URL,
});

// Интерцептор запросов
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return Promise.reject(new Error("No token found"));
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/contacts");
      return response.data;
    } catch (error) {
      toast.error("Something went wrong. Please, try again later.");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/add",
  async (contact, thunkAPI) => {
    try {
      const response = await api.post("/contacts", contact);
      toast.success("Contact added successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to add contact. Please try again.");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (contactId, thunkAPI) => {
    try {
      await api.delete(`/contacts/${contactId}`);
      toast.success("Contact deleted successfully!");
      return contactId;
    } catch (error) {
      toast.error("Failed to delete contact. Please try again.");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/update",
  async ({ contactId, contact }, thunkAPI) => {
    try {
      const response = await api.patch(`/contacts/${contactId}`, contact);
      toast.success("Contact updated successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to update contact. Please try again.");
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "An unknown error occurred"
      );
    }
  }
);

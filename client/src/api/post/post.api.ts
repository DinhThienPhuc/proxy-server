/* POST API REQUESTS
   ========================================================================== */

import { ExamItem, IPostListResponse, IPostResponse } from "./post.interface";
import { requestWithJwt, requestWithoutJwt } from "../request";

import { AxiosResponse } from "axios";

export const getPosts = (): Promise<AxiosResponse<IPostListResponse>> => {
  return requestWithJwt.get<IPostListResponse>("/posts");
};

export const getPostById = (
  id: string,
): Promise<AxiosResponse<IPostResponse>> => {
  return requestWithJwt.get<IPostResponse>(`/posts/${id}`);
};

export const getListExams = (): Promise<AxiosResponse<ExamItem[]>> => {
  return requestWithJwt.get<ExamItem[]>("/exams");
};

export const getDetailExams = ({
  id,
}: {
  id?: string;
}): Promise<AxiosResponse<any>> => {
  return requestWithJwt.get<any>(`/exams/${id}`);
};

export const getDashboardData = (): Promise<AxiosResponse<any>> => {
  return requestWithJwt.get<any>("/dashboard");
};

export const saveQuestionsForExam = (
  payload: any,
): Promise<AxiosResponse<any>> => {
  return requestWithJwt.post<any>("/dashboard/create", { data: payload });
};

export const login = (payload: any): Promise<AxiosResponse<any>> => {
  return requestWithoutJwt.post<any>("/auth/login", { data: payload });
};

export const register = (payload: any): Promise<AxiosResponse<any>> => {
  return requestWithoutJwt.post<any>("/auth/register", { data: payload });
};

export const refresh = (payload: any): Promise<AxiosResponse<any>> => {
  return requestWithJwt.post<any>("/auth/refresh", { data: payload });
};

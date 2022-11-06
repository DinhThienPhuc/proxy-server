/* POST API REQUESTS
   ========================================================================== */

import { ExamItem, IPostListResponse, IPostResponse } from "./post.interface";

import { AxiosResponse } from "axios";
import { requestWithoutJwt } from "../request";

export const getPosts = (): Promise<AxiosResponse<IPostListResponse>> => {
  return requestWithoutJwt.get<IPostListResponse>("/posts");
};

export const getPostById = (
  id: string,
): Promise<AxiosResponse<IPostResponse>> => {
  return requestWithoutJwt.get<IPostResponse>(`/posts/${id}`);
};

export const getListExams = (): Promise<AxiosResponse<ExamItem[]>> => {
  return requestWithoutJwt.get<ExamItem[]>("/exams");
};

export const getDetailExams = ({
  id,
}: {
  id?: string;
}): Promise<AxiosResponse<any>> => {
  return requestWithoutJwt.get<any>(`/exams/${id}`);
};

export const getDashboardData = (): Promise<AxiosResponse<any>> => {
  return requestWithoutJwt.get<any>("/dashboard");
};

export const saveQuestionsForExam = (
  payload: any,
): Promise<AxiosResponse<any>> => {
  return requestWithoutJwt.post<any>("/dashboard/create", { data: payload });
};

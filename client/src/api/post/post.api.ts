/* POST API REQUESTS
   ========================================================================== */

import { requestWithJwt, requestWithoutJwt } from "../request";

import { AxiosResponse } from "axios";
import { DataListExam, ListExamParams } from "./post.interface";

export const getListExams = ({params}: {params?: ListExamParams}): Promise<AxiosResponse<DataListExam>> => {
  return requestWithJwt.get<DataListExam>("/exams", {params: params});
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

export const markExam = (
  id: string,
  payload: any,
): Promise<AxiosResponse<any>> => {
  return requestWithJwt.post<any>(`/exams/${id}`, { data: payload });
};

/* POST API INTERFACES
   ========================================================================== */

import { IBaseResponse } from "../interfaces";

export interface IPostData {
  createdAt: string;
  name: string;
  id: string;
}

export interface IPostResponse extends IBaseResponse {
  data: IPostData;
}

export interface IPostListResponse extends IBaseResponse {
  data: IPostData[];
}

export interface ExamItem {
  [key: string]: any;
}

export interface DataListExam  {
  data: ExamItem[];
  page: number;
  size: number;
  totalRecords: number;
};

export interface ListExamParams {
  page?: number
  search?: string
}

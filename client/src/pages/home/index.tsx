/* PAGE: HOME
   ========================================================================== */

import { InputAdornment, Pagination } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import ExamCard from "./components/ExamCard";
import { ExamItem } from "api/post/post.interface";
import SearchIcon from "@mui/icons-material/Search";
import Styled from "./index.style";
import { getListExams } from "api/post/post.api";
import { useTranslation } from "react-i18next";

type ParamsList = {
  search?: string;
  page?: number;
  status?: string;
};

const Home = () => {
  const [dataState, setDataState] = useState<ExamItem[]>([] as ExamItem[]);
  const [filter, setFilter] = useState<string>("all");
  const [page] = useState<number>(10);
  const { t } = useTranslation();

  const filterOptions = useMemo(() => {
    return [
      {
        label: t("homepage.filter.all"),
        value: "all",
      },
      {
        label: t("homepage.filter.pending"),
        value: "pending",
      },
      {
        label: t("homepage.filter.tested"),
        value: "tested",
      },
    ];
  }, [t]);

  const getData = async (params?: ParamsList) => {
    try {
      const listExamsResponse = await getListExams();
      if (!listExamsResponse.data) {
        setDataState([]);
      } else {
        setDataState(listExamsResponse.data);
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangeFilter = (value: string) => {
    setFilter(value);
  };

  return (
    <Styled.Container>
      <Styled.FilterContainer>
        <Styled.FilterTitle>{t("homepage.filter_title")}</Styled.FilterTitle>
        <Styled.FilterDropdown>
          <Styled.FilterLabel>{t("homepage.filter_label")}</Styled.FilterLabel>
          <Styled.Filter
            value={filter}
            onChange={(e) => handleChangeFilter(e.target.value as string)}
          >
            {filterOptions.map((item, index) => (
              <Styled.OptionItem value={item.value} key={index}>
                {item.label}
              </Styled.OptionItem>
            ))}
          </Styled.Filter>
          <Styled.SearchInput
            placeholder={t("homepage.filter_placeholder_search")}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Styled.FilterDropdown>
      </Styled.FilterContainer>
      <Styled.ListExams>
        {dataState?.map?.((item, index) => (
          <ExamCard
            name={item.name}
            description={item.description}
            key={index}
            score={item.score}
            id={item.id}
            status={item.score ? "tested" : "pending"}
          />
        ))}
      </Styled.ListExams>
      <Styled.PaginationContainer>
        <Pagination count={page} />
      </Styled.PaginationContainer>
    </Styled.Container>
  );
};

export default Home;

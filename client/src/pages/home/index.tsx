/* PAGE: HOME
   ========================================================================== */


import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getListExams } from "api/post/post.api";
import { ExamItem } from "api/post/post.interface";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ExamCard from "./components/ExamCard";
import Styled from "./index.style";

const Home = () => {
  const [dataState, setDataState] = useState<ExamItem[]>([] as ExamItem[]);
  const [filter, setFilter] = useState<string>("all");
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

  const getData = async () => {
    try {
      const listExamsResponse = await getListExams();
      if (!listExamsResponse.data) {
        setDataState([]);
      } else setDataState(listExamsResponse.data);
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
        </Styled.FilterDropdown>
        <Styled.SearchInput
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Styled.FilterContainer>
      <Styled.ListExams>
        {dataState.map((item, index) => (
          <ExamCard
            name={item.name}
            description={item.description}
            key={index}
            score={item.score}
            id={item.id}
            status={item.status}
          />
        ))}
      </Styled.ListExams>
    </Styled.Container>
  );
};

export default Home;

/* PAGE: DASHBOARD
   ========================================================================== */

// TODO: remove later

import { getDashboardData, saveQuestionsForExam } from "api/post/post.api";
import { useCallback, useEffect, useMemo, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoadingButton from "@mui/lab/LoadingButton";
import Styled from "./index.style";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [checked, setChecked] = useState<any>({});
  const [loading, setLoading] = useState<string>("");

  const parseCheck = useCallback((examQuestions: any[]) => {
    const result: any = {};
    examQuestions.forEach((data: any) => {
      const examId = (data?.examId as string) || "";
      if (!result[examId]) {
        result[examId] = [];
      }
      result[examId].push(data?.questionId);
    });
    setChecked(result);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const response = await getDashboardData();
      setData(response.data);
      parseCheck(response.data?.examsQuestions);
    } catch (error) {
      setData(null);
    }
  }, [parseCheck]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggle = useCallback(
    (examId: string, questionId: string) => () => {
      const currentIndex = checked?.[examId]?.indexOf?.(questionId);
      const newChecked = { ...checked };

      if (currentIndex >= 0) {
        newChecked[examId].splice(currentIndex, 1);
      } else {
        if (!newChecked[examId]) {
          newChecked[examId] = [];
        }
        newChecked[examId].push(questionId);
      }

      setChecked(newChecked);
    },
    [checked],
  );

  const handleSaveQuestionsForExam = useCallback(
    (examId: string) => async (event: any) => {
      setLoading(examId);
      try {
        event?.stopPropagation?.();
        await saveQuestionsForExam({
          examId,
          questionIds: checked[examId],
        });
        await fetchData();
        setLoading("");
      } catch (error) {
        setLoading("");
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [checked, fetchData],
  );

  const getListQuestions = useCallback(
    (examId: string) => {
      return (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {(data?.questions || []).map((question: any) => {
            const labelId = `checkbox-list-label-${question.id}`;

            return (
              <Styled.Wrap key={question.id} disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(examId, question.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked?.[examId]?.indexOf?.(question.id) >= 0}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={question.title} />
                </ListItemButton>
              </Styled.Wrap>
            );
          })}
        </List>
      );
    },
    [checked, data?.questions, handleToggle],
  );

  const content = useMemo(() => {
    return (data?.exams || []).map((exam: any) => {
      return (
        <Accordion key={exam.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Styled.Summary>
              <Typography>Exam name: {exam?.name || ""}</Typography>
              <LoadingButton
                loading={exam.id === loading}
                variant="outlined"
                onClick={handleSaveQuestionsForExam(exam.id)}
              >
                Save questions for this exam
              </LoadingButton>
            </Styled.Summary>
          </AccordionSummary>
          <AccordionDetails>{getListQuestions(exam.id)}</AccordionDetails>
        </Accordion>
      );
    });
  }, [data?.exams, getListQuestions, handleSaveQuestionsForExam, loading]);

  return <Styled.Container>{content}</Styled.Container>;
};

export default Dashboard;

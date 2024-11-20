import { Button, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { QuestionData, QuestionStats } from '@/types';
import QuestionDetailsModal from '@/components/ui/QuestionDetailsModal/QuestionDetailsModal';

type StatsTableRowProps = {
  stat: QuestionStats;
  fetchQuestion: (questionId: string) => Promise<QuestionData>;
};

const StatsTableRow = ({ stat, fetchQuestion }: StatsTableRowProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const [question, setQuestion] = React.useState<QuestionData | null>(null);
  React.useEffect(() => {
    if (showModal) {
      fetchQuestion(stat.questionId.toString()).then(setQuestion);
    }
  }, [showModal, fetchQuestion, stat.questionId]);
  return (
    <>
      <TableRow>
        <TableCell>
          <Button
            onClick={() => {
              setShowModal(true);
            }}
          >
            {stat.questionId}
          </Button>
        </TableCell>
        <TableCell>{stat.total}</TableCell>
        <TableCell>{stat.correct}</TableCell>
        <TableCell>{((stat.correct / stat.total) * 100).toFixed(2)}%</TableCell>
      </TableRow>
      <QuestionDetailsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        question={question}
        editable={false}
      />
    </>
  );
};
export default StatsTableRow;

import React, { useContext, useEffect } from 'react';
import DataTable, { defaultThemes } from 'react-data-table-component';
import { QuizContext } from '../../context/quiz/QuizProvider';

const Questions = () => {
  const { getQuestions, questions } = useContext(QuizContext);

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      name: 'Text',
      selector: 'questionText',
      sortable: true,
    },
    {
      name: 'Category',
      selector: 'category',
      sortable: true,
    },
    {
      name: 'Submitted By',
      selector: 'user.displayName',
      sortable: true,
    },
  ];

  return (
    <>
      <DataTable
        title='Sumitted questions'
        columns={columns}
        data={questions}
        customStyles={customStyles}
        pagination
        selectableRows
        dense
      />
    </>
  );
};

const customStyles = {
  header: {
    style: {
      minHeight: '56px',
    },
  },
  headRow: {
    style: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: defaultThemes.default.divider.default,
    },
  },
  headCells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
  cells: {
    style: {
      '&:not(:last-of-type)': {
        borderRightStyle: 'solid',
        borderRightWidth: '1px',
        borderRightColor: defaultThemes.default.divider.default,
      },
    },
  },
};

export default Questions;

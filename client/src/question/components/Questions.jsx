import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import DataTable, { defaultThemes } from 'react-data-table-component';
import { useForm } from 'react-hook-form';
import { QuestionContext } from '../../context/question/QuestionProvider';
import { QuizContext } from '../../context/quiz/QuizProvider';
import Button from '../../shared/components/FormElements/Button';
import Spinner from '../../shared/components/UIElements/Spinner';
import Question from './Question';

const Questions = () => {
  const { quizzes, addQuestionsToQuiz } = useContext(QuizContext);
  const { getQuestions, loading, questions, totalResults } = useContext(
    QuestionContext
  );
  const { register, handleSubmit } = useForm();

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (questions.length === 0) getQuestions();
    // eslint-disable-next-line
  }, []);

  const onDeleteHandler = useCallback((id) => {
    alert(`Delete question (id: ${id}) - not implemented yet`);
  }, []);

  const onEditHandler = useCallback((id) => {
    alert(`Edit question (id: ${id}) - not implemented yet`);
  }, []);

  const actions = (
    <Button
      key='add'
      color='primary'
      style={{ marginRight: '0' }}
      to='/questions/new'
    >
      Add Question
    </Button>
  );

  const columns = useMemo(
    () => [
      {
        name: 'Text',
        selector: 'questionText',
        sortable: true,
        grow: 2,
        wrap: true,
      },
      {
        name: 'Category',
        selector: 'category',
        sortable: true,
        center: true,
      },
      {
        name: 'Submitted By',
        selector: 'submittedBy.displayName',
        sortable: true,
        center: true,
      },
      {
        name: 'Submitted On',
        selector: 'createdAt',
        sortable: true,
        format: (row) => `${new Date(row.createdAt).toLocaleString()}`,
      },
      {
        name: 'Actions',
        sortable: false,
        center: true,
        button: true,
        cell: (row) => (
          <div className='center'>
            <Button
              size='small'
              color='warning'
              onClick={() => onEditHandler(row.id)}
            >
              <i className='fas fa-edit'></i>
            </Button>
            <Button
              size='small'
              color='danger'
              onClick={() => onDeleteHandler(row.id)}
            >
              <i className='far fa-trash-alt'></i>
            </Button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line
    []
  );

  const onChangeRowsPerPageHandler = useCallback(
    (newPerPage, page) => getQuestions(page, newPerPage),
    // eslint-disable-next-line
    []
  );

  const onChangePageHandler = useCallback(
    (page) => getQuestions(page),
    // eslint-disable-next-line
    []
  );

  const onSelectedRowsChangeHandler = useCallback(
    (state) => setSelectedRows(state.selectedRows),
    []
  );

  const onSortHandler = useCallback(
    (column, sortDirection) =>
      getQuestions({ sort: `${sortDirection === 'desc' ? '-' : ''}${column}` }),
    // eslint-disable-next-line
    []
  );

  const contextActions = React.useMemo(() => {
    const onSubmitHandler = (formData) => {
      const selectedQuizIds = selectedRows.map((quiz) => quiz.id);
      addQuestionsToQuiz(formData.quiz, selectedQuizIds);
    };

    return (
      <form
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <select name='quiz' id='quiz' ref={register}>
          {quizzes &&
            quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.name}
              </option>
            ))}
        </select>
        <Button
          type='submit'
          color='primary'
          style={{ marginRight: '0', padding: '1px' }}
          size='small'
          className='m-1'
        >
          Add To Quiz
        </Button>
      </form>
    );
    // eslint-disable-next-line
  }, [selectedRows]);

  return (
    <>
      <DataTable
        title='Sumitted questions'
        columns={columns}
        data={questions}
        customStyles={customStyles}
        progressPending={loading}
        progressComponent={<Spinner />}
        pagination
        paginationServer
        paginationTotalRows={totalResults}
        onChangeRowsPerPage={onChangeRowsPerPageHandler}
        onChangePage={onChangePageHandler}
        onSort={onSortHandler}
        expandableRows
        expandOnRowClicked
        expandableRowsComponent={<Question />}
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        onSelectedRowsChange={onSelectedRowsChangeHandler}
        actions={actions}
        contextActions={contextActions}
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

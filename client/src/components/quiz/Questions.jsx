import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import DataTable, { defaultThemes } from 'react-data-table-component';
import { QuizContext } from '../../context/quiz/QuizProvider';
import Spinner from '../layout/Spinner';
import Question from './Question';

const Questions = () => {
  const { getQuestions, loading, questions, totalResults } = useContext(
    QuizContext
  );

  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    getQuestions();
    console.log('selected rows', selectedRows);
    // eslint-disable-next-line
  }, [selectedRows]);

  const onAddHandler = useCallback(() => {
    alert('Add question - not implemented yet');
  }, []);

  const onDeleteHandler = useCallback((id) => {
    alert(`Delete question (id: ${id}) - not implemented yet`);
  }, []);

  const onEditHandler = useCallback((id) => {
    alert(`Edit question (id: ${id}) - not implemented yet`);
  }, []);

  const actions = (
    <button
      key='add'
      className='btn btn-primary'
      style={{ marginRight: '0' }}
      onClick={onAddHandler}
    >
      Add Question
    </button>
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
        selector: 'user.displayName',
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
          <div>
            <button
              className='btn btn-sm btn-warning'
              onClick={() => onEditHandler(row.id)}
            >
              E
            </button>
            <button
              className='btn btn-sm btn-danger'
              onClick={() => onDeleteHandler(row.id)}
            >
              D
            </button>
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
        highlightOnHover
        onSelectedRowsChange={onSelectedRowsChangeHandler}
        actions={actions}
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

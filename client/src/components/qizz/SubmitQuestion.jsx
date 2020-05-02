import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AlertContext } from '../../context/alert/AlertProvider';
import { QuizContext } from '../../context/quiz/QuizProvider';

const SubmitQuestion = () => {
  const { submitQuestion } = useContext(QuizContext);
  const { setAlert } = useContext(AlertContext);

  const { register, handleSubmit, watch, errors, reset } = useForm();
  const questionType = watch('type');

  const onSubmitHandler = (formData) => {
    submitQuestion(formData);
    setAlert(
      'Your question was submitted succesfully. Thank you :)',
      'success',
      3000
    );
    reset();
  };

  // TODO: Replace this with data from DB
  const questionTypes = ['MULTIPLE_CHOICE', 'TEXT'];
  const questionCategories = [
    'TRASH',
    'HISTORY',
    'MUSIC',
    'SPORT',
    'GEOGRAPHY',
    'SCIENCE',
    'OTHER',
  ];

  return (
    <>
      <h1 className='text-center my-3'>Submit Question</h1>

      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className='form-group'>
          <label htmlFor='category'>Question Category</label>
          <select
            name='category'
            id='category'
            className={errors.category && 'has-error'}
            ref={register({
              validate: (value) =>
                questionCategories.includes(value) ||
                'You must choose an option',
            })}
          >
            <option value=''>Choose an option</option>
            {questionCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className='is-error'>{errors.category.message}</span>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='type'>Question Type</label>
          <select
            name='type'
            id='type'
            className={errors.type && 'has-error'}
            ref={register({
              validate: (value) =>
                questionTypes.includes(value) || 'You must choose an option',
            })}
          >
            <option value=''>Choose an option</option>
            {questionTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <span className='is-error'>{errors.type.message}</span>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='question'>Question Text</label>
          <textarea
            name='question'
            id='question'
            className={errors.question && 'has-error'}
            ref={register({
              required: 'This field is required',
            })}
          ></textarea>
          {errors.question && (
            <span className='is-error'>{errors.question.message}</span>
          )}
        </div>

        {questionType === 'TEXT' && (
          <div className='form-group'>
            <label htmlFor='answer'>Answer</label>
            <textarea
              name='answer'
              id='answer'
              className={errors.answer && 'has-error'}
              ref={register({
                required: 'This field is required',
              })}
            ></textarea>
            {errors.answer && (
              <span className='is-error'>{errors.answer.message}</span>
            )}
          </div>
        )}

        {questionType === 'MULTIPLE_CHOICE' && (
          <>
            <div className='form-group'>
              <label htmlFor='answerA'>Answer A</label>
              <input
                type='text'
                name='answerA'
                id='answerA'
                className={errors.answerA && 'has-error'}
                ref={register({
                  required: 'This field is required',
                })}
              />
              {errors.answerA && (
                <span className='is-error'>{errors.answerA.message}</span>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='answerB'>Answer B</label>
              <input
                className={errors.answerB && 'has-error'}
                type='text'
                name='answerB'
                id='answerB'
                ref={register({
                  required: 'This field is required',
                })}
              />
              {errors.answerB && (
                <span className='is-error'>{errors.answerB.message}</span>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='answerC'>Answer C</label>
              <input
                className={errors.answerC && 'has-error'}
                type='text'
                name='answerC'
                id='answerC'
                ref={register({
                  required: 'This field is required',
                })}
              />
              {errors.answerC && (
                <span className='is-error'>{errors.answerC.message}</span>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='answerD'>Answer D</label>
              <input
                className={errors.answerD && 'has-error'}
                type='text'
                name='answerD'
                id='answerD'
                ref={register({
                  required: 'This field is required',
                })}
              />
              {errors.answerD && (
                <span className='is-error'>{errors.answerD.message}</span>
              )}
            </div>
            <div className='form-group'>
              <label htmlFor='correctAnswer'>Correct Answer</label>
              <select
                name='correctAnswer'
                id='correctAnswer'
                className={errors.correctAnswer && 'has-error'}
                ref={register({
                  validate: (value) =>
                    ['A', 'B', 'C', 'D'].includes(value) ||
                    'You must choose an option',
                })}
              >
                <option value=''>Choose an option</option>
                <option value='A'>A</option>
                <option value='B'>B</option>
                <option value='C'>C</option>
                <option value='D'>D</option>
              </select>
              {errors.correctAnswer && (
                <span className='is-error'>{errors.correctAnswer.message}</span>
              )}
            </div>
          </>
        )}

        <input
          type='submit'
          value='Submit'
          className='btn btn-primary btn-block my-3'
        />
      </form>
    </>
  );
};

export default SubmitQuestion;

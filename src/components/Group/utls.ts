
export enum FieldTypes {
  Specify = 'specify',
  Checkbox = 'checkbox',
  Select = 'select',
  Radio = 'radio',
}


export const getQuestionType = (question: any) => {
  const answerLength = question.answers.length;

  if (answerLength === 1) {
    return FieldTypes.Specify;
  }

  if (answerLength <= 4 && question.isMultipleAnswers) {
    return FieldTypes.Checkbox;
  }

  if (answerLength > 3) {
    return FieldTypes.Select;
  }

  return FieldTypes.Radio;
};

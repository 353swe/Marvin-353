import React from 'react';
import FieldTypes from '../custom/fieldtypes';
import Form from '../custom/Form';
import Utils from '../custom/utils';

// Home page component
const testForm = () => (
  <div id="home">
    FORMS
    {FieldTypes.TEXT}
    <Form />
    <Form description="FAKE Add new admin address form" />
    <Form
      description="Do you want to be part of Marvin University?"
      fields={[{
        name: 'name',
        label: 'Name:',
        help: 'insert your name',
        placeholder: 'luigi',
        type: FieldTypes.TEXT,
        validateFunction: Utils.existValue,
      }, {
        name: 'surname',
        label: 'Surname:',
        help: 'insert your surname',
        placeholder: 'rossi',
        type: FieldTypes.TEXT,
        validateFunction: Utils.existValue,
      }, {
        name: 'userType',
        label: 'Role:',
        help: 'insert your desired role',
        type: FieldTypes.SELECT,
        values: ['student', 'teacher'],
        validateFunction: Utils.notNullValue,
      }]}
    />

    <Form
      description="What's the grade of the student?"
      fields={[{
        name: 'grade',
        label: 'Grade:',
        help: 'insert the student grade',
        placeholder: '25',
        type: FieldTypes.TEXT,
        validateFunction: Utils.validGrade,
      }]}
    />

    <Form
      description="Describe the exam that you want to add"
      fields={[{
        name: 'nameExam',
        label: 'Name of the exam/course:',
        help: 'course name',
        placeholder: 'P1',
        type: FieldTypes.TEXT,
        validateFunction: Utils.existValue,
      },
        {
        name: 'yearExam',
        label: 'Academic Year:',
        help: 'insert the associated year',
        type: FieldTypes.SELECT,
        values: ['2017', '2018', '2019'],
        validateFunction: Utils.notNullValue,
      },
        {
          name: 'optionalExam',
          label: 'Optional:',
          help: 'is the exam optional',
          type: FieldTypes.CHECKBOX,
          values: ['yes'],
          validateFunction: Utils.alwaysTrue,
        },
      ]}
    />

    <Form
      description="What's the optional exam you want to add to your program?"
      fields={[{
        name: 'examExtra',
        label: 'Exam:',
        help: 'choose the optional exam',
        placeholder: 'easy exam',
        type: FieldTypes.SELECT,
        values: ['P1', 'P2', 'P3', 'SWE', 'RO', 'TECWEB'],
        validateFunction: Utils.notNullValue,
      }]}
    />

  </div>
);

export default testForm;

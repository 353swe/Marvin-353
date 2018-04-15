import React from 'react';
import Form from '../custom/Form';
import Utils from '../custom/utils';
import FieldTypes from '../custom/fieldtypes';


// eslint-disable-next-line react/prefer-stateless-function
class Register extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Register;

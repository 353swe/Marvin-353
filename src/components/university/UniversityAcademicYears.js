import React from 'react';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import Form from '../custom/Form';

const UniversityAcademic = () => (
  <div>
    <Form
      description="Do you want to add a new academic year?"
      fields={[{
        name: 'year',
        label: 'Year:',
        help: 'insert the new university year',
        placeholder: '20xx',
        type: FieldTypes.TEXT,
        validateFunction: Utils.moreThanCurrentYear,
      }]}
    />
  </div>
);
export default UniversityAcademic;

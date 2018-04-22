import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../custom/Form';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import PageTableForm from '../template/PageTableForm';
import { creators as universitySagaAction } from '../../sagas/AdminEmployerSaga';


const UniversityAdmin = props => (
  <div>
    <Form
      description="Add new admin"
      fields={[{
        name: 'addressAdmin',
        label: 'Address:',
        help: 'insert the address of the admin',
        placeholder: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
        type: FieldTypes.TEXT,
        validateFunction: Utils.validEthAddress,
      }]}
      submitFunction={props.addAdmin}
    />
    <PageTableForm
      getTableData={props.getAdmins}
      deleteTableData={props.deleteAdmin}
      tableData={props.adminAccounts}
      headerInfo={['Admin Address']}
    />
  </div>
);

UniversityAdmin.propTypes = {
  addAdmin: PropTypes.func.isRequired,
  getAdmins: PropTypes.func.isRequired,
  deleteAdmin: PropTypes.func.isRequired,
  adminAccounts: PropTypes.arrayOf(String).isRequired,
};

const mapStateToProps = state => ({
  adminAccounts: state.university.adminAccount,
});

function mapDispatchToProps(dispatch) {
  return {
    addAdmin: objArr => (
      dispatch(universitySagaAction.addNewAdminAction(objArr.addressAdmin.value))
    ),
    deleteAdmin: address => dispatch(universitySagaAction.removeAdminAction([address])),
    getAdmins: () => dispatch(universitySagaAction.getAllAdminsAction())
    ,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UniversityAdmin);

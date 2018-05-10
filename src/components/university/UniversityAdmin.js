import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from '../custom/Form';
import FieldTypes from '../custom/fieldtypes';
import Utils from '../custom/utils';
import PageTableForm from '../template/PageTableForm';
import ModalForm from '../custom/ModalForm';
import { creators as universitySagaAction } from '../../sagas/AdminEmployerSaga';

export class UniversityAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.viewDelete = this.viewDelete.bind(this);
    this.notDelete = this.notDelete.bind(this);
    this.closeDelete = this.closeDelete.bind(this);
    this.state = { delete: false };
  }
  viewDelete(item) {
    this.setState({ delete: true, item });
  }

  notDelete() {
    this.setState({ delete: false, item: '' });
  }

  closeDelete(objArr) {
    this.setState({ delete: false, item: '' });
    this.props.deleteAdmin(objArr.item.address);
  }

  render() {
    return (
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
          submitFunction={this.props.addAdmin}
        />

        <PageTableForm
          getTableData={this.props.getAdmins}
          tableButtons={[{
            buttonFunction: this.viewDelete,
            buttonText: 'Delete',
            buttonType: 'danger',
          }]}
          tableData={this.props.adminAccounts}
          headerInfo={['Admin Address', 'Delete']}
        />

        <ModalForm
          title="Delete confirmation"
          yesFunction={this.closeDelete}
          noFunction={this.notDelete}
          keyForModal={{ item: { address: this.state.item } }}
          show={this.state.delete}
        >
          <p>
            Are you sure you want to delete this admin?
          </p>
        </ModalForm>
      </div>
    );
  }
}

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
    deleteAdmin: address => dispatch(universitySagaAction.removeAdminAction(address)),
    getAdmins: () => dispatch(universitySagaAction.getAllAdminsAction())
    ,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UniversityAdmin);

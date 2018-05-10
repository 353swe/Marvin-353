import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageTableForm from '../template/PageTableForm';
import { creators } from '../../sagas/AdminSaga';
import ROLES from '../../util/logic/AccountEnum';
import ModalForm from '../custom/ModalForm';


export class ConfirmTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.viewConfirm = this.viewConfirm.bind(this);
    this.viewDeny = this.viewDeny.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
    this.closeDeny = this.closeDeny.bind(this);
    this.state = { deny: false, confirm: false };
  }

  viewConfirm(item) {
    this.setState({ confirm: true, deny: false, item });
  }

  viewDeny(item) {
    this.setState({ deny: true, confirm: false, item });
  }

  closeConfirm(item) {
    this.setState({ confirm: false, deny: false });
    this.props.confirmTeacher(item);
  }
  closeDeny(item) {
    this.setState({ confirm: false, deny: false });
    this.props.denyTeacher(item);
  }
  render() {
    return (
      <div>
        <PageTableForm
          getTableData={this.props.getPendingTeachers}
          tableData={this.props.pendingTeachers}
          tableButtons={[
          {
            buttonFunction: this.viewConfirm,
            buttonText: 'Confirm',
            buttonType: 'primary',
          },
          {
            buttonFunction: this.viewDeny,
            buttonText: 'Deny',
            buttonType: 'danger',
          },
        ]}
          headerInfo={['Address', 'Name', 'Surname', 'Confirm', 'Unconfirm']}
          columFilter
        />

        <ModalForm
          title="Add confirmation"
          yesFunction={this.closeConfirm}
          keyForModal={{ item: this.state.item }}
          show={this.state.confirm}
        >
          <p>
          Are you sure you want to confirm this teacher?
          </p>
        </ModalForm>

        <ModalForm
          title="Deny confirmation"
          yesFunction={this.closeDeny}
          keyForModal={{ item: this.state.item }}
          show={this.state.deny}
        >
          <p>
          Are you sure you want to deny this teacher?
          </p>
        </ModalForm>

      </div>);
  }
}


ConfirmTeacher.propTypes = {
  confirmTeacher: PropTypes.func.isRequired,
  getPendingTeachers: PropTypes.func.isRequired,
  denyTeacher: PropTypes.func.isRequired,
  pendingTeachers: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = state => ({
  pendingTeachers: state.accounts.pendingTeachersList,
});

function mapDispatchToProps(dispatch) {
  return {
    confirmTeacher: objArr =>
      dispatch(creators.approveUserAction(ROLES.UNCONFIRMED_TEACHER, objArr.item.contract)),
    denyTeacher: objArr =>
      dispatch(creators.denyUserAction(ROLES.UNCONFIRMED_TEACHER, objArr.item.contract)),
    getPendingTeachers: () =>
      dispatch(creators.getPendingTEachersAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmTeacher);


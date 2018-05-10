pragma solidity 0.4.21;
import "./UniversityAdmin.sol";
import "./Teacher.sol";


/**
@title Teacher accounts manager
@author 353
@notice Gives the functionality to manage teachers accounts
*/
contract UniversityTeacher is UniversityAdmin {

    uint private countTeachersByIndex = 1;
    mapping (address => uint) internal teachers;
    mapping (uint => Teacher) internal teachersByIndex;

    uint private countUnconfirmedTeachersByIndex = 1;
    mapping (address => uint) internal unconfirmedTeachers;
    mapping (uint => Teacher) internal unconfirmedTeachersByIndex;

    mapping (address => Teacher) internal teacherAddressToContract;
    mapping (address => Teacher) internal unconfirmedTeacherAddressToContract;

    /**
    @notice Revert if the unconfirmed teacher contract is not valid
    @param _teacher The teacher to be checked
    */
    modifier isValidContractUnconfirmedTeacher(Teacher _teacher) {
        if (unconfirmedTeachers[_teacher] == 0) revert();
        _;
    }

    /**
    @notice revert if the teacher contract is not valid
    @param _teacher The teacher to be checked
    */
    modifier isValidContractTeacher(Teacher _teacher) {
        if (teachers[_teacher] == 0) revert();
        _;
    }

    //Return the number of teachers
    /**
    @notice Return the number of confirmed teachers
    @return the number of confirmed teachers
    */
    function getTeacherNumber() public view returns(uint) {
        return countTeachersByIndex - 1;
    }

    /**
    @notice Return the teacher at the index
    @param _index The selected index where to get the teacher address
    @return the teacher address
    */
    function getTeacherContractAddressAt(uint _index) public view returns(Teacher) {
        return teachersByIndex[_index + 1];
    }

    /**
    @notice Return the number of not yet approved teachers
    @dev spiega a un dev dettagli più specifici
    @return the number of not yet approved teachers
    */
    function getNonApprovedTeacherNumber() public view returns(uint) {
        return countUnconfirmedTeachersByIndex - 1;
    }

    /**
    @notice Return the not approved teacher at the index
    @param _index The selected index where to get the teacher address
    @return the teacher address
    */
    function getNotApprovedTeacherContractAddressAt(uint _index) public view returns(Teacher) {
        return unconfirmedTeachersByIndex[_index + 1];
    }

    /**
    @notice Return the teacher contract given the address
    @param _address The address to start searching
    @return the teacher contract
    */
    function getTeacherContractFromPublicAddress(address _address) public view returns(Teacher) {
        return teacherAddressToContract[_address];
    }

    /**
    @notice Check if a given address correspond to a confirmed teacher account
    @dev checks if in the teacherAddressToContract map there's the given address
    @param _address The wanted address
    @return true if the address corresponds to a teacher
    */
    function isTeacher(address _address) public view returns(bool) {
        return address(teacherAddressToContract[_address]) != 0;
    }

    /**
    @notice Check if a given address correspond to a unconfirmed teacher account
    @param _address The wanted address
    @return true if the address corresponds to an unconfirmed teacher
    */
    function isNotConfirmedTeacher(address _address) public view returns(bool) {
        return address(unconfirmedTeacherAddressToContract[_address]) != 0;
    }

    /**
    @notice Return the role by the address
    @dev 3 is the confirmed teacher, 13 is the unconfirmed teacher
    @param _address The selected address
    @return the role type
    */
    function getRoleByAddress(address _address) public view returns (uint8) {
        uint8 typeUser = super.getRoleByAddress(_address);
        if (isTeacher(_address))
            typeUser = 3; //Teacher
        if (isNotConfirmedTeacher(_address))
            typeUser = 13; //Unconfirmed teacher
        return typeUser;
    }

    /**
    @notice Makes a request for a teacher account
    @param _name The teacher name, _surname The teacher surname
    */
    function requestTeacherAccount(bytes32 _name, bytes32 _surname) public registrableAddress(msg.sender) {
        Teacher newTeacher = new Teacher(_name, _surname, msg.sender);
        registered[msg.sender] = true;

        unconfirmedTeachers[newTeacher] = countUnconfirmedTeachersByIndex;
        unconfirmedTeachersByIndex[countUnconfirmedTeachersByIndex] = newTeacher;
        countUnconfirmedTeachersByIndex += 1;

        unconfirmedTeacherAddressToContract[msg.sender] = newTeacher;
    }

    /**
    @notice Confirm a teacher's account request
    @dev only if the contract is valid and unconfirmed, only an admin can confirm a teacher
    @param _teacher The teacher account that must be confirmed
    */
    function confirmTeacher(Teacher _teacher) public onlyAdmin isValidContractUnconfirmedTeacher(_teacher) {
        address askingAccount = _teacher.getPublicAddress();
        //add to confirmed
        teachers[_teacher] = countTeachersByIndex;
        teachersByIndex[countTeachersByIndex] = _teacher;
        countTeachersByIndex += 1;

        teacherAddressToContract[askingAccount] = _teacher;
        //remove from unconfirmed
        removeUnconfirmedTeacher(askingAccount, _teacher);
    }

    /**
    @notice Deny a teacher's account request
    @dev only if the contract is valid and unconfirmed, only an admin can deny a request
    @param _teacher The teacher account that must be denied
    */
    function denyTeacher(Teacher _teacher) public onlyAdmin isValidContractUnconfirmedTeacher(_teacher) {
        address askingAccount = _teacher.getPublicAddress();
        //clean the address from registred
        delete registered[askingAccount];
        //remove from unconfirmed
        removeUnconfirmedTeacher(askingAccount, _teacher);
    }

    /**
    @notice Remove a teacher
    @dev only a confirmed teacher can be removed, only an admin can do that
    @param _teacher The teacher that must be removed
    */
    function removeTeacher(Teacher _teacher) public onlyAdmin isValidContractTeacher(_teacher) {
        address account = _teacher.getPublicAddress();
        //clean the address from registred
        delete registered[account];

        //remove from teacher
        uint currentIndex = teachers[_teacher];
        teachersByIndex[currentIndex] = teachersByIndex[countTeachersByIndex-1];
        delete teachers[_teacher];
        countTeachersByIndex -= 1;

        //correct the map public address => contract address
        delete teacherAddressToContract[account];
        //TODO: togliere sottoscrizioni esami
    }

    /**
    @notice Remove a teacher from the unconfirmeds' map
    @param _askingAccount The account connected with the unconfirmed teacher, _teacher The teacher that must be removed
    from the unconfirmed
    */
    function removeUnconfirmedTeacher(address _askingAccount, Teacher _teacher) private {
        //remove from unconfirmed
        uint currentIndex = unconfirmedTeachers[_teacher];
        unconfirmedTeachersByIndex[currentIndex] = unconfirmedTeachersByIndex[countUnconfirmedTeachersByIndex-1];
        delete unconfirmedTeachers[_teacher];
        countUnconfirmedTeachersByIndex -= 1;

        //correct the map public address => contract address
        delete unconfirmedTeacherAddressToContract[_askingAccount];
    }
}

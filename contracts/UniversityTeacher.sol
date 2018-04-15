pragma solidity 0.4.21;
import "./UniversityAdmin.sol";
import "./Teacher.sol";


contract UniversityTeacher is UniversityAdmin {
    uint private countTeachersByIndex = 1;
    mapping (address => uint) internal teachers;
    mapping (uint => Teacher) internal teachersByIndex;

    uint private countUnconfirmedTeachersByIndex = 1;
    mapping (address => uint) internal unconfirmedTeachers;
    mapping (uint => Teacher) internal unconfirmedTeachersByIndex;

    mapping (address => Teacher) internal teacherAddressToContract;
    mapping (address => Teacher) internal unconfirmedTeacherAddressToContract;

    modifier isValidContractUnconfirmedTeacher(Teacher _teacher) {
        if (unconfirmedTeachers[_teacher] == 0) revert();
        _;
    }

    modifier isValidContractTeacher(Teacher _teacher) {
        if (teachers[_teacher] == 0) revert();
        _;
    }

    //Return the number of teachers
    function getTeacherNumber() public view returns(uint) {
        return countTeachersByIndex - 1;
    }

    //Return the teacher at the index
    function getTeacherContractAddressAt(uint _index) public view returns(Teacher) {
        return teachersByIndex[_index + 1];
    }

    //Return the number of non approved teachers
    function getNonApprovedTeacherNumber() public view returns(uint) {
        return countUnconfirmedTeachersByIndex - 1;
    }

    //Return the non approved teacher at the index
    function getNotApprovedTeacherContractAddressAt(uint _index) public view returns(Teacher) {
        return unconfirmedTeachersByIndex[_index + 1];
    }

    function getTeacherContractFromPublicAddress(address _address) public view returns(Teacher) {
        return teacherAddressToContract[_address];
    }

    function isTeacher(address _address) public view returns(bool) {
        return address(teacherAddressToContract[_address]) != 0;
    }

    function isNotConfirmedTeacher(address _address) public view returns(bool) {
        return address(unconfirmedTeacherAddressToContract[_address]) != 0;
    }

    function getRoleByAddress(address _address) public view returns (uint8) {
        uint8 typeUser = super.getRoleByAddress(_address);
        if (isTeacher(_address))
            typeUser = 3; //Teacher
        if (isNotConfirmedTeacher(_address))
            typeUser = 13; //Unconfirmed teacher
        return typeUser;
    }

    function requestTeacherAccount(bytes32 _name, bytes32 _surname) public registrableAddress(msg.sender) {
        Teacher newTeacher = new Teacher(_name, _surname, msg.sender);
        registered[msg.sender] = true;

        unconfirmedTeachers[newTeacher] = countUnconfirmedTeachersByIndex;
        unconfirmedTeachersByIndex[countUnconfirmedTeachersByIndex] = newTeacher;
        countUnconfirmedTeachersByIndex += 1;

        unconfirmedTeacherAddressToContract[msg.sender] = newTeacher;
    }

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

    function denyTeacher(Teacher _teacher) public onlyAdmin isValidContractUnconfirmedTeacher(_teacher) {
        address askingAccount = _teacher.getPublicAddress();
        //clean the address from registred
        delete registered[askingAccount];
        //remove from unconfirmed
        removeUnconfirmedTeacher(askingAccount, _teacher);
    }

    function removeTeacher(Teacher _teacher) public onlyAdmin isValidContractTeacher(_teacher) {
        address account = _teacher.getPublicAddress();
        //clean the address from registred
        delete registered[account];

        //remove from teacher
        uint currentIndex = teachers[_teacher];
        teachersByIndex[currentIndex] = teachersByIndex[countTeachersByIndex];
        delete teachers[_teacher];
        countTeachersByIndex -= 1;

        //correct the map public address => contract address
        delete teacherAddressToContract[account];
        //TODO: togliere sottoscrizioni esami
    }

    function removeUnconfirmedTeacher(address _askingAccount, Teacher _teacher) private {
        //remove from unconfirmed
        uint currentIndex = unconfirmedTeachers[_teacher];
        unconfirmedTeachersByIndex[currentIndex] = unconfirmedTeachersByIndex[countUnconfirmedTeachersByIndex];
        delete unconfirmedTeachers[_teacher];
        countUnconfirmedTeachersByIndex -= 1;

        //correct the map public address => contract address
        delete unconfirmedTeacherAddressToContract[_askingAccount];
    }
}

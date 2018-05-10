pragma solidity 0.4.21;
import "./UniversityTeacher.sol";
import "./Student.sol";


/**
@title Students management
@author 353
@notice Contract to manage students
*/
contract UniversityStudent is UniversityTeacher {
    uint private countStudentsByIndex = 1;
    mapping (address => uint) internal students;
    mapping (uint => Student) internal studentsByIndex;

    uint private countUnconfirmedStudentsByIndex = 1;
    mapping (address => uint) internal unconfirmedStudents;
    mapping (uint => Student) internal unconfirmedStudentsByIndex;

    mapping (address => Student) internal studentAddressToContract;
    mapping (address => Student) internal unconfirmedStudentAddressToContract;

    /**
    @notice Revert if the unconfirmed student contract is not valid
    @param _student The student to be checked
    */
    modifier isValidContractUnconfirmedStudent(Student _student) {
        if (unconfirmedStudents[_student] == 0) revert();
        _;
    }

    /**
    @notice Revert if the student contract is not valid
    @param _student The student to be checked
    */
    modifier isValidContractStudent(Student _student) {
        if (students[_student] == 0) revert();
        _;
    }

    /**
    @notice Return the number of students
    @return the number of students
    */
    function getStudentNumber() public view returns(uint) {
        return countStudentsByIndex - 1;
    }

    /**
    @notice Return the students al the index
    @dev return the student's address
    @param _index The wanted position
    @return the student account
    */
    function getStudentContractAddressAt(uint _index) public view returns(Student) {
        return studentsByIndex[_index + 1];
    }

    /**
    @notice Return the number of not approved students
    @return the number of not approved students
    */
    function getNotApprovedStudentNumber() public view returns(uint) {
        return countUnconfirmedStudentsByIndex - 1;
    }

    //Return the non approved student at the index
    /**
    @notice Return the not approved students at the index
    @param _index The wanted position
    @return the student account
    */
    function getNotApprovedStudentContractAddressAt(uint _index) public view returns(Student) {
        return unconfirmedStudentsByIndex[_index + 1];
    }

    /**
    @notice Given the address, returns the corresponding student account
    @param _address The wanted address
    @return the student account
    */
    function getStudentContractFromPublicAddress(address _address) public view returns(Student) {
        return studentAddressToContract[_address];
    }

    /**
    @notice Check if the address correspond to a confirmed student account
    @param _address The address to be checked
    @return true if it's a student
    */
    function isStudent(address _address) public view returns(bool) {
        return address(studentAddressToContract[_address]) != 0;
    }

    /**
    @notice Check if the address correspond to an unconfirmed student account
    @param _address The address to be checked
    @return true if it's an unconfirmed student
    */
    function isNotConfirmedStudent(address _address) public view returns(bool) {
        return address(unconfirmedStudentAddressToContract[_address]) != 0;
    }

    /**
    @notice Return the role given an address
    @dev 4 is the student role, 14 is the unconfirmed student role
    @param _address The wanted address
    @return the number of the role
    */
    function getRoleByAddress(address _address) public view returns (uint8) {
        uint8 typeUser = super.getRoleByAddress(_address);
        if (isStudent(_address))
            typeUser = 4; //Student
        if (isNotConfirmedStudent(_address))
            typeUser = 14; //Unconfirmed student
        return typeUser;
    }

    /**
    @notice Request a student account
    @param _name The student's name, _surname The student's surname, _course The university course the student attends
    */
    function requestStudentAccount(bytes32 _name, bytes32 _surname, Course _course)
    public registrableAddress(msg.sender) {
        Student newStudent = new Student(_name, _surname, msg.sender, _course);
        registered[msg.sender] = true;
        unconfirmedStudents[newStudent] = countUnconfirmedStudentsByIndex;
        unconfirmedStudentsByIndex[countUnconfirmedStudentsByIndex] = newStudent;
        countUnconfirmedStudentsByIndex += 1;
        unconfirmedStudentAddressToContract[msg.sender] = newStudent;
    }

    /**
    @notice Confirm a student account request
    @dev only an admin can do it, only if the student contract is valid
    @param _student The student that must be confirmed
    */
    function confirmStudent(Student _student) public onlyAdmin isValidContractUnconfirmedStudent(_student) {
        address askingAccount = _student.getPublicAddress();
        //add to confirmed
        students[_student] = countStudentsByIndex;
        studentsByIndex[countStudentsByIndex] = _student;
        countStudentsByIndex += 1;

        studentAddressToContract[askingAccount] = _student;
        //remove from unconfirmed
        removeUnconfirmedStudent(askingAccount, _student);
    }

    /**
    @notice Deny a student account request
    @dev only an admin can do it, only if the contract is valid
    @param _student The student that must be denied
    */
    function denyStudent(Student _student) public onlyAdmin isValidContractUnconfirmedStudent(_student) {
        address askingAccount = _student.getPublicAddress();
        //clean the address from registred
        delete registered[askingAccount];
        //remove from unconfirmed
        removeUnconfirmedStudent(askingAccount, _student);
        deleteSubscription(_student);
    }

    /**
    @notice Remove a student from the map
    @dev the contract must be denied before
    @param _student The student to be removed
    */
    function removeStudent(Student _student) public onlyAdmin isValidContractStudent(_student) {
        address account = _student.getPublicAddress();
        //clean the address from registred
        delete registered[account];

        //remove from student
        uint currentIndex = students[_student];
        studentsByIndex[currentIndex] = studentsByIndex[countStudentsByIndex-1];
        delete students[_student];
        countStudentsByIndex -= 1;

        //correct the map public address => contract address
        delete studentAddressToContract[account];
        deleteSubscription(_student);
    }

    /**
    @notice Remove a student account from the unconfirmed ones, it doesn't remove the exams' subscriptions
    @param _askingAccount The parent account, _student The student account to be removed
    */
    function removeUnconfirmedStudent(address _askingAccount, Student _student) private {
        //remove from unconfirmed
        uint currentIndex = unconfirmedStudents[_student];
        unconfirmedStudentsByIndex[currentIndex] = unconfirmedStudentsByIndex[countUnconfirmedStudentsByIndex-1];
        delete unconfirmedStudents[_student];
        countUnconfirmedStudentsByIndex -= 1;

        //correct the map public address => contract address
        delete unconfirmedStudentAddressToContract[_askingAccount];
    }

    /**
    @notice Remove the student's exam registration
    @param _student The student registration to be removed
    */
    function deleteSubscription(Student _student) private {
        Course course = _student.getCourseContract();
        uint examNumber = course.getExamNumber();
        for (uint i = 0; i < examNumber; i++) {
            course.getExamContractAt(i).removeSubscriber(_student);
        }
    }
}

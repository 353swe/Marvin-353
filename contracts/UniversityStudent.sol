pragma solidity 0.4.21;
import "./UniversityTeacher.sol";
import "./Student.sol";


contract UniversityStudent is UniversityTeacher {
    uint private countStudentsByIndex = 1;
    mapping (address => uint) internal students;
    mapping (uint => Student) internal studentsByIndex;

    uint private countUnconfirmedStudentsByIndex = 1;
    mapping (address => uint) internal unconfirmedStudents;
    mapping (uint => Student) internal unconfirmedStudentsByIndex;

    mapping (address => Student) internal studentAddressToContract;
    mapping (address => Student) internal unconfirmedStudentAddressToContract;

    modifier isValidContractUnconfirmedStudent(Student _student) {
        if (unconfirmedStudents[_student] == 0) revert();
        _;
    }

    modifier isValidContractStudent(Student _student) {
        if (students[_student] == 0) revert();
        _;
    }

    //Return the number of students
    function getStudentNumber() public view returns(uint) {
        return countStudentsByIndex - 1;
    }

    //Return the student at the index
    function getStudentContractAddressAt(uint _index) public view returns(Student) {
        return studentsByIndex[_index + 1];
    }

    //Return the number of non approved students
    function getNotApprovedStudentNumber() public view returns(uint) {
        return countUnconfirmedStudentsByIndex - 1;
    }

    //Return the non approved student at the index
    function getNotApprovedStudentContractAddressAt(uint _index) public view returns(Student) {
        return unconfirmedStudentsByIndex[_index + 1];
    }

    function getStudentContractFromPublicAddress(address _address) public view returns(Student) {
        return studentAddressToContract[_address];
    }

    function isStudent(address _address) public view returns(bool) {
        return address(studentAddressToContract[_address]) != 0;
    }

    function isNotConfirmedStudent(address _address) public view returns(bool) {
        return address(unconfirmedStudentAddressToContract[_address]) != 0;
    }

    function getRoleByAddress(address _address) public view returns (uint8) {
        uint8 typeUser = super.getRoleByAddress(_address);
        if (isStudent(_address))
            typeUser = 4; //Student
        if (isNotConfirmedStudent(_address))
            typeUser = 14; //Unconfirmed student
        return typeUser;
    }

    function requestStudentAccount(bytes32 _name, bytes32 _surname, Course _course)
    public registrableAddress(msg.sender) {
        Student newStudent = new Student(_name, _surname, msg.sender, _course);
        registered[msg.sender] = true;
        unconfirmedStudents[newStudent] = countUnconfirmedStudentsByIndex;
        unconfirmedStudentsByIndex[countUnconfirmedStudentsByIndex] = newStudent;
        countUnconfirmedStudentsByIndex += 1;
        unconfirmedStudentAddressToContract[msg.sender] = newStudent;
    }

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

    function denyStudent(Student _student) public onlyAdmin isValidContractUnconfirmedStudent(_student) {
        address askingAccount = _student.getPublicAddress();
        //clean the address from registred
        delete registered[askingAccount];
        //remove from unconfirmed
        removeUnconfirmedStudent(askingAccount, _student);
        deleteSubscription(_student);
    }

    function removeStudent(Student _student) public onlyAdmin isValidContractStudent(_student) {
        address account = _student.getPublicAddress();
        //clean the address from registred
        delete registered[account];

        //remove from student
        uint currentIndex = students[_student];
        studentsByIndex[currentIndex] = studentsByIndex[countStudentsByIndex];
        delete students[_student];
        countStudentsByIndex -= 1;

        //correct the map public address => contract address
        delete studentAddressToContract[account];
        deleteSubscription(_student);
    }

    // WITHOUT remove the subscription to exams
    function removeUnconfirmedStudent(address _askingAccount, Student _student) private {
        //remove from unconfirmed
        uint currentIndex = unconfirmedStudents[_student];
        unconfirmedStudentsByIndex[currentIndex] = unconfirmedStudentsByIndex[countUnconfirmedStudentsByIndex];
        delete unconfirmedStudents[_student];
        countUnconfirmedStudentsByIndex -= 1;

        //correct the map public address => contract address
        delete unconfirmedStudentAddressToContract[_askingAccount];
    }

    function deleteSubscription(Student _student) private {
        Course course = _student.getCourseContract();
        uint examNumber = course.getExamNumber();
        for (uint i = 0; i < examNumber; i++) {
            course.getExamContractAt(i).removeSubscriber(_student);
        }
    }
}

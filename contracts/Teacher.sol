pragma solidity 0.4.21;
import "./User.sol";
import "./Exam.sol";
import "./Student.sol";
import "./University.sol";


contract Teacher is User {
    uint private countAssignedExam = 1;
    mapping (uint => Exam) private assignedExam;
    University private university;

    modifier onlyUniversity {
        if (University(msg.sender) != university) revert();
        _;
    }

    modifier correctValuation(uint8 value) {
        if (value < 1 || value > 32) revert();
        _;
    }

    function Teacher(bytes32 _name, bytes32 _surname, address _publicAddress)
    public User(_name, _surname, _publicAddress) {
        university = University(msg.sender);
    }

    function getExamNumber() public view returns(uint) {
        return countAssignedExam - 1;
    }

    function getExamContractAt(uint _index) public view returns(Exam) {
        return assignedExam[_index + 1];
    }

    function addExam(Exam _exam) public onlyUniversity {
        assignedExam[countAssignedExam] = _exam;
        countAssignedExam += 1;
    }

    function removeExam(Exam _exam) public onlyUniversity {
        uint index = 2**256 - 1;
        for (uint i = 0; i < countAssignedExam - 1 && index != 0; i += 1)
            if (assignedExam[i] == _exam)
                index = i;
        removeExamByIndex(index);
    }

    //the index are static, and the teacher cannot exploit it, because if the index is wrong it doesn't work
    function registerNewVoteStudentExam(uint _examindex, uint _student, uint8 _valuation)
    public onlySubject correctValuation(_valuation) {
        Exam exam = getExamContractAt(_examindex);
        Student student = exam.getEnrolledContractAt(_student);
        student.registerValuation(student.getIndexOfExam(exam), _valuation);
    }

    function removeExamByIndex(uint _examIndex) private { // validExamIndex(_examIndex)
        assignedExam[_examIndex + 1] = assignedExam[countAssignedExam-1];
        countAssignedExam -= 1;
    }
}

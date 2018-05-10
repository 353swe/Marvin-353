pragma solidity 0.4.21;
import "./User.sol";
import "./Exam.sol";
import "./Student.sol";
import "./University.sol";


/**
@title Teacher contract
@author 353
@notice Create a new teacher and his functions
*/
contract Teacher is User {
    uint private countAssignedExam = 1;
    mapping (uint => Exam) private assignedExam;
    University private university;

    /**
    @notice Revert if the sender isn't the university
    */
    modifier onlyUniversity {
        if (University(msg.sender) != university) revert();
        _;
    }

    /**
    @notice Revert if the inserted grade isn't correct
    */
    modifier correctValuation(uint8 value) {
        if (value < 1 || value > 32) revert();
        _;
    }

    /**
    @notice Create a teacher
    @dev Teacher constructor
    @param _name The teacher name, _surname The teacher surname, _publicAddress the teacher public address
    */
    function Teacher(bytes32 _name, bytes32 _surname, address _publicAddress)
    public User(_name, _surname, _publicAddress) {
        university = University(msg.sender);
    }

    /**
    @notice Return the number of exams assigned to a teacher
    @return the number of associated exams
    */
    function getExamNumber() public view returns(uint) {
        return countAssignedExam - 1;
    }

    /**
    @notice Return the exam contract at the specified position
    @param _index The wanted position
    @return the exam contract
    */
    function getExamContractAt(uint _index) public view returns(Exam) {
        return assignedExam[_index + 1];
    }

    /**
    @notice Add a new exam
    @dev only university can do it
    @param _exam The exam to add
    */
    function addExam(Exam _exam) public onlyUniversity {
        assignedExam[countAssignedExam] = _exam;
        countAssignedExam += 1;
    }

    /**
    @notice Remove the selected exam
    @dev only university can do it, index initially set to a very big number to be unreachable
    @param _exam The exam to be removed
    */
    function removeExam(Exam _exam) public onlyUniversity {
        uint index = 2**256 - 1;
        for (uint i = 0; i < countAssignedExam - 1 && index != 0; i += 1)
            if (assignedExam[i] == _exam)
                index = i;
        removeExamByIndex(index);
    }

    //
    /**
    @notice Register a new grade to a student
    @dev the index are static, and the teacher cannot exploit it, because if the index is wrong it doesn't work
    @param _examIndex The wanted exam, _student The student who earned the valuation, _valuation The grade given
    */
    function registerNewVoteStudentExam(uint _examIndex, uint _student, uint8 _valuation)
    public onlySubject correctValuation(_valuation) {
        Exam exam = getExamContractAt(_examIndex);
        Student student = exam.getEnrolledContractAt(_student);
        student.registerValuation(student.getIndexOfExam(exam), _valuation);
    }

    /**
    @notice Remove an exam from the assigned
    @param _examIndex the exam's position
    */
    function removeExamByIndex(uint _examIndex) private { // validExamIndex(_examIndex)
        assignedExam[_examIndex + 1] = assignedExam[countAssignedExam-1];
        countAssignedExam -= 1;
    }
}

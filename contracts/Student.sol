pragma solidity 0.4.21;
import "./User.sol";
import "./Exam.sol";
import "./Course.sol";
import "./Teacher.sol";


/**
@title Student contract
@author 353
@notice Create a student contract
*/
contract Student is User {
    uint private countListExam;
    mapping (uint => Exam) private listExam;
    mapping (uint => bool) private subscription; // 0 = false
    mapping (uint => uint8) private valuation; // tutto scalato di uno, 32 = 30L, 19 => 18, 0 => non assegnato
    Course private course;

    /**
    @notice Revert if the student role isn't equal to 4
    */
    modifier confirmedStudent {
        if (university.getRoleByAddress(publicAddress) != 4) revert();
        _;
    }

    /**
    @notice Revert if the exam's professor is not correct
    @param _ofExam The exam to be checked
    */
    modifier byCorrectProfessor(uint _ofExam) {
        if (Teacher(msg.sender) != listExam[_ofExam].getTeacherContract()) revert();
        _;
    }

    /**
    @notice Revert if already enrolled
    @param _index the chosen position
    */
    modifier notEnrolled(uint _index) {
        if (subscription[_index] != false) revert();
        _;
    }

    /**
    @notice Revert if not already enrolled
    @param _index The chosen position
    */
    modifier enrolled(uint _index) {
        if (subscription[_index] != true) revert();
        _;
    }

    /**
    @notice Create a student
    @dev Student constructor
    @param _name The student's name, _surname The student's surname, _publicAddress The student's public address,
    _course The student's degree course
    */
    function Student(bytes32 _name, bytes32 _surname, address _publicAddress, Course _course)
    public User(_name, _surname, _publicAddress) {
        course = _course;
        countListExam = course.getExamNumber();
        for (uint i = 0; i < countListExam; i++) {
            listExam[i] = course.getExamContractAt(i);
            subscription[i] = listExam[i].getObligatoriness();
            if (subscription[i])
                listExam[i].addMeAsSubscriber();
        }
    }

    /**
    @notice Return the course
    @return the course contract
    */
    function getCourseContract() public view returns(Course) {
        return course;
    }

    /**
    @notice Return the number of exams
    @return the number of exams
    */
    function getExamNumber() public view returns(uint) {
        return countListExam;
    }

    /**
    @notice Return the exam at the selected index
    @param _index The chosen position
    @return the exam's contract
    */
    function getExamContractAt(uint _index) public view returns(Exam) {
        return listExam[_index];
    }

    /**
    @notice Check if the student is registered to an exam
    @param _index The chosen position
    @return true if the student is registered at that exam
    */
    function getExamSubscriptionAt(uint _index) public view returns(bool) {
        return subscription[_index];
    }

    /**
    @notice Return the valuation of an exam
    @param _index The chosen position
    @return the grade of an exam
    */
    function getExamValuationAt(uint _index) public view returns(uint8) {
        return valuation[_index];
    }

    /**
    @notice Enroll to an optional exam
    @dev only a student can do it and only if he's not already enrolled
    @param _index The chosen position
    */
    function enrollToOptionalExam(uint _index) public onlySubject notEnrolled(_index) {
        subscription[_index] = true;
        listExam[_index].addMeAsSubscriber();
    }

    /**
    @notice Register a valuation
    @dev Only if there isn't already a valuation
    @param _index The correct position
    */
    function registerValuation(uint _index, uint8 _valuation) public
        byCorrectProfessor(_index) confirmedStudent enrolled(_index) {
        valuation[_index] = _valuation;
    }

    /**
    @notice Get the index of an exam
    @dev Revert if not found
    @param exam The wanted exam
    @return the index of the exam
    */
    function getIndexOfExam(Exam exam) public view returns(uint) {
        for (uint index = 0; index < countListExam; index++)
            if (listExam[index] == exam)
                return index;
        revert();
    }
}

pragma solidity 0.4.21;
import "./Exam.sol";
import "./UniversityStudent.sol";


/**
@title Creates a university course
@author 353
@notice Contract to create a new course
*/
contract Course {
    uint private countListExamsByIndex = 1;
    mapping (address => uint) private listExams;
    mapping (uint => Exam) private listExamsByIndex;
    bytes32 private name;
    uint16 private creditsToGraduation;
    Year private year;
    UniversityStudent private university;

    /**
    @notice Modifier that allows admins only to do particular actions
    @dev If the current user is not an admin, the action is reverted
    */
    modifier onlyAdmin {
        if (!university.isAdmin(msg.sender)) revert();
        _;
    }

    /**
    @notice Creates a new course
    @param _name Name of the course
    @param _creditsForGraduation Credits that still remains to graduate
    @param _university University that holds this course
    */
    function Course(bytes32 _name, uint16 _creditsForGraduation, UniversityStudent _university) public {
        name = _name;
        creditsToGraduation = _creditsForGraduation;
        university = _university;
        year = Year(msg.sender);
    }

    /**
    @notice Returns the number of exams
    @return The number of exams
    */
    function getExamNumber() public view returns(uint) {
        return countListExamsByIndex - 1;
    }

    /**
    @notice Returns the exam contract at the selected position in the list
    @param _index Position of the contract wanted
    @return The wanted exam
    */
    function getExamContractAt(uint _index) public view returns(Exam) {
        return listExamsByIndex[_index + 1];
    }

    /**
    @notice Returns the name of the course
    @return The name of the course
    */
    function getName() public view returns(bytes32) {
        return name;
    }

    /**
    @notice Returns the number of credits that still remains to graduate
    @return The number of credits remaining
    */
    function getCreditsToGraduate() public view returns(uint16) {
        return creditsToGraduation;
    }

    /**
    @notice Returns the solar year of the selected course
    @return The solar year of the selected course
    */
    function getSolarYear() public view returns(uint16) {
        return year.getSolarYear();
    }

    /**
    @notice Add a new exam in the selected course
    @dev This can be done only by an admin
    @param _name The name of the exam to add
    @param _credits The credits of the exam
    @param _obbligatoriety true if the exam is obligatory
    */
    function addNewExam(bytes32 _name, uint8 _credits, bool _obbligatoriety) public onlyAdmin {
        Exam newExam = new Exam(_name, _credits, _obbligatoriety, year, university);
        listExams[newExam] = countListExamsByIndex;
        listExamsByIndex[countListExamsByIndex] = newExam;
        countListExamsByIndex += 1;
    }
}

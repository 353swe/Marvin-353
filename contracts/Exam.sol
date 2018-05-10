pragma solidity 0.4.21;
import "./Student.sol";
import "./Year.sol";
import "./UniversityStudent.sol";


/**
@title Exam contract
@author 353
@notice Create an exam contract
*/
contract Exam {
    uint private countListSubscriberByIndex = 1;
    mapping (address => uint) private listSubscriber;
    mapping (uint => Student) private listSubscriberByIndex;
    bytes32 private name;
    uint8 private credits;
    bool private obligatoriness;
    Teacher private teacher;
    Course private course;
    Year private year;
    UniversityStudent private university;

    /**
    @notice Revert if the sender isn't the university
    */
    modifier onlyFromUniversityContract {
        if (University(msg.sender) != university) revert();
        _;
    }

    /**
    @notice Revert if the subscriber's list is not empty
    */
    modifier onlyNotSubscribe {
        if (listSubscriber[msg.sender] != 0) revert();
        _;
    }

    /**
    @notice Creates an exam
    @dev Exam constructor
    @param _name The exam name, _credits The number of credits of that exam, _obligatoriness Says if an exam is
    obligatory or not, _year The year of the exam, _university The university where is taught
    */
    function Exam(bytes32 _name, uint8 _credits, bool _obligatoriness, Year _year, UniversityStudent _university)
    public {
        name = _name;
        credits = _credits;
        obligatoriness = _obligatoriness;
        course = Course(msg.sender);
        year = _year;
        university = _university;
    }

    /**
    @notice Return the number of students enrolled
    @return the number of registered students
    */
    function getEnrolledNumber() public view returns(uint) {
        return countListSubscriberByIndex - 1;
    }

  /**
    @notice Return the student at the index
    @param _index The selected position
    @return the student contract
    */
    function getEnrolledContractAt(uint _index) public view returns(Student) {
        return listSubscriberByIndex[_index + 1];
    }

  /**
    @notice Return the course where the exam belongs
    @return the course
    */
    function getCourse() public view returns(Course) {
        return course;
    }

  /**
    @notice Return the exam's name
    @return the name
    */
    function getName() public view returns(bytes32) {
        return name;
    }

  /**
    @notice Return the teacher who holds the course
    @return the teacher
    */
    function getTeacherContract() public view returns(Teacher) {
        return teacher;
    }

  /**
    @notice Check if an exam is obligatory or not
    @return true if obligatory
    */
    function getObligatoriness() public view returns(bool) {
        return obligatoriness;
    }

  /**
    @notice Return the number of credits of the exam
    @return the number of credits
    */
    function getCredits() public view returns(uint8) {
        return credits;
    }

  /**
    @notice Enroll to an exam
    @dev only if not already registered
    */
    function addMeAsSubscriber() public onlyNotSubscribe {
        listSubscriber[msg.sender] = countListSubscriberByIndex;
        listSubscriberByIndex[countListSubscriberByIndex] = Student(msg.sender);
        countListSubscriberByIndex += 1;
    }

  /**
    @notice Remove from the subscribers' list
    @dev only the university can do it
    @param _address The address of the student to be removed
    */
    function removeSubscriber(address _address) public
    onlyFromUniversityContract {
        uint index = listSubscriber[_address];
        if (index != 0) {
            listSubscriberByIndex[index] = listSubscriberByIndex[countListSubscriberByIndex-1];
            delete listSubscriber[_address];
            countListSubscriberByIndex -= 1;
        }
    }

  /**
    @notice Associate a teacher to an exam
    @dev only the university can do it
    @param _teacher The teacher to associate with
    */
    function associateTeacher(Teacher _teacher) public onlyFromUniversityContract {
        teacher = _teacher;
    }
}

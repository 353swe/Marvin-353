pragma solidity 0.4.21;
import "./Student.sol";
import "./Year.sol";
import "./UniversityStudent.sol";


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

    modifier onlyFromUniversityContract {
        if (University(msg.sender) != university) revert();
        _;
    }

    modifier onlyNotSubscribe {
        if (listSubscriber[msg.sender] != 0) revert();
        _;
    }

    function Exam(bytes32 _name, uint8 _credits, bool _obligatoriness, Year _year, UniversityStudent _university) public {
        name = _name;
        credits = _credits;
        obligatoriness = _obligatoriness;
        course = Course(msg.sender);
        year = _year;
        university = _university;
    }

    function getEnrolledNumber() public view returns(uint) {
        return countListSubscriberByIndex - 1;
    }

    function getEnrolledContractAt(uint _index) public view returns(Student) {
        return listSubscriberByIndex[_index + 1];
    }

    function getCourse() public view returns(Course) {
        return course;
    }

    function getName() public view returns(bytes32) {
        return name;
    }

    function getTeacherContract() public view returns(Teacher) {
        return teacher;
    }

    function getObligatoriness() public view returns(bool) {
        return obligatoriness;
    }

    function getCredits() public view returns(uint8) {
        return credits;
    }

    function addMeAsSubscriber() public onlyNotSubscribe {
        listSubscriber[msg.sender] = countListSubscriberByIndex;
        listSubscriberByIndex[countListSubscriberByIndex] = Student(msg.sender);
        countListSubscriberByIndex += 1;
    }

    function removeSubscriber(address _address) public
    onlyFromUniversityContract {
        uint index = listSubscriber[_address];
        if (index != 0) {
            listSubscriberByIndex[index] = listSubscriberByIndex[countListSubscriberByIndex-1];
            delete listSubscriber[_address];
            countListSubscriberByIndex -= 1;
        }
    }

    function associateTeacher(Teacher _teacher) public onlyFromUniversityContract {
        teacher = _teacher;
    }
}

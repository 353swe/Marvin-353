pragma solidity 0.4.21;
import "./University.sol";
import "./UniversityStudent.sol";
import "./Course.sol";


contract Year {
    UniversityStudent private university;
    uint private countListCourseByIndex = 1;
    mapping (address => uint) private listCourse;
    mapping (uint => Course) private listCourseByIndex;
    uint16 private solarYear;

    modifier onlyAdmin {
        if (!university.isAdmin(msg.sender)) revert();
        _;
    }

    function Year(uint16 _solarYear) public {
        solarYear = _solarYear;
        university = UniversityStudent(msg.sender);
    }

    function getCourseNumber() public view returns(uint) {
        return countListCourseByIndex - 1;
    }

    function getCourseContractAt(uint _index) public view returns(Course) {
        return listCourseByIndex[_index + 1];
    }

    function getSolarYear() public view returns(uint16) {
        return solarYear;
    }

    function addNewCourse(bytes32 _name, uint16 _creditsForGraduation) public onlyAdmin {
        Course newCourse = new Course(_name, _creditsForGraduation, university);
        listCourse[newCourse] = countListCourseByIndex;
        listCourseByIndex[countListCourseByIndex] = newCourse;
        countListCourseByIndex += 1;
    }
}

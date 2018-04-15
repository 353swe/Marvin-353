pragma solidity 0.4.21;
import "./User.sol";
import "./Exam.sol";
import "./Course.sol";
import "./Teacher.sol";


contract Student is User {
    uint private countListExam;
    mapping (uint => Exam) private listExam;
    mapping (uint => bool) private subscription; // 0 = false
    mapping (uint => uint8) private valuation; // tutto scalato di uno, 32 = 30L, 19 => 18, 0 => non assegnato
    Course private course;

    modifier confirmedStudent {
        if (university.getRoleByAddress(publicAddress) != 4) revert();
        _;
    }

    modifier byCorrectProfessor(uint _ofExam) {
        if (Teacher(msg.sender) != listExam[_ofExam].getTeacherContract()) revert();
        _;
    }

    modifier notEnrolled(uint _index) {
        if (subscription[_index] != false) revert();
        _;
    }

    modifier enrolled(uint _index) {
        if (subscription[_index] != true) revert();
        _;
    }

    modifier withoutValuation(uint _index) {
        if (valuation[_index] != 0) revert();
        _;
    }

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

    function getCourseContract() public view returns(Course) {
        return course;
    }

    function getExamNumber() public view returns(uint) {
        return countListExam;
    }

    function getExamContractAt(uint _index) public view returns(Exam) {
        return listExam[_index];
    }

    function getExamSubscriptionAt(uint _index) public view returns(bool) {
        return subscription[_index];
    }

    function getExamValuationAt(uint _index) public view returns(uint8) {
        return valuation[_index];
    }

    function enrollToOptionalExam(uint _index) public onlySubject notEnrolled(_index) {
        subscription[_index] = true;
        listExam[_index].addMeAsSubscriber();
    }

    function registerValuation(uint _index, uint8 _valuation) public withoutValuation(_index)
        byCorrectProfessor(_index) confirmedStudent enrolled(_index) {
        valuation[_index] = _valuation;
    }

    function getIndexOfExam(Exam exam) public view returns(uint) {
        for (uint index = 0; index < countListExam; index++)
            if (listExam[index] == exam)
                return index;
        revert();
    }
}

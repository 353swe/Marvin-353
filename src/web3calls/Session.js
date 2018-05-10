import RoleMap from '../util/logic/AccountEnum';
import { login } from './University';
import { getStudentContractFromPublicAddress, requestStudentAccount } from './UniversityStudent';
import { getTeacherContractFromPublicAddress, requestTeacherAccount } from './UniversityTeacher';
import { getName, getSurname } from './User';
import { getCourseContract } from './Student';
import { getName as getCourseName } from './Course';

async function userData(addr) {
  const name = await getName(addr);
  const surname = await getSurname(addr);
  return {
    name,
    surname,
  };
}

// Da testare probabilment non funziona
const getStudentData = async (role) => {
  if (role === RoleMap.UNCONFIRMED_STUDENT) return {};
  const stdContr = await getStudentContractFromPublicAddress(web3.eth.accounts[0]);
  const courseContract = await getCourseContract(stdContr);
  const stdData = await userData(stdContr);
  const courseName = await getCourseName(courseContract);
  return Object.assign(
    {},
    stdData,
    { courseName, courseContract },
    { contract: stdContr },
  );
};
const getTeacherData = async (role) => {
  if (role === RoleMap.UNCONFIRMED_TEACHER) return {};
  const tchContr = await getTeacherContractFromPublicAddress(web3.eth.accounts[0]);
  const tchData = await userData(tchContr);
  return Object.assign({}, tchData, { contract: tchContr });
};

const getRole = () => login().then(role => role);

const getData = (role) => {
  switch (role) {
    case (RoleMap.STUDENT):
    case (RoleMap.UNCONFIRMED_STUDENT):
      return getStudentData(role);
    case (RoleMap.TEACHER):
    case (RoleMap.UNCONFIRMED_TEACHER):
      return getTeacherData(role);
    default:
      return {};
  }
};

const signUp = (name, surname, course) => {
  if (course === null) return requestTeacherAccount(name, surname);
  return requestStudentAccount(name, surname, course);
};

export { getRole, getData, signUp };

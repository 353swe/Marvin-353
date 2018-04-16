import RoleMap from '../util/logic/AccountEnum';
import { login } from './University';
import { getStudentContractFromPublicAddress } from './UniversityStudent';
import { getTeacherContractFromPublicAddress } from './UniversityTeacher';
import { getName, getSurname } from './User';
import { getCourseContract } from './Student';
import { getName as getCourseName } from './Course';
import { toText } from '../util/web3/textConverter';

async function userData(addr) {
  const name = await getName(addr);
  const surname = await getSurname(addr);
  return {
    name: toText(name),
    surname: toText(surname),
  };
}

// Da testare probabilment non funziona
const getStudentData = (role) => {
  if (role === RoleMap.UNCONFIRMED_STUDENT) return {};
  return getStudentContractFromPublicAddress().then((addr) => {
    getCourseContract(addr).then((courseContract) => {
      getCourseName(courseContract).then(name =>
        Object.assign({}, userData(addr), { course: toText(name) }));
    });
  });
};
const getTeacherData = (role) => {
  if (role === RoleMap.UNCONFIRMED_TEACHER) return {};
  return getTeacherContractFromPublicAddress().then(addr => userData(addr));
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

export { getRole, getData };

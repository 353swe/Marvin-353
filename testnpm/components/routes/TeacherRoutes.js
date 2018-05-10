import assert from 'assert';
import PublicRoutes from '../../../src/components/routes/TeacherRoutes';

describe('TeacherRoutes', () => {
  // 169
  it('should return an array with three elements', () => {
    const routes = Object.keys(PublicRoutes).length;
    assert.equal(routes, 3);
  });
});

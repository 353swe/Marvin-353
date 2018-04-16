import assert from 'assert';
import PublicRoutes from '../../../src/components/routes/TeacherRoutes';

describe('TeacherRoutes', () => {
  it('should return an array with one element', () => {
    const routes = Object.keys(PublicRoutes).length;
    assert.equal(routes, 1);
  });
});

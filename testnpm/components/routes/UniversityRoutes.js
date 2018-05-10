import assert from 'assert';
import UniversityRoutes from '../../../src/components/routes/UniversityRoutes';

describe('UniversityRoutes', () => {
  // 170
  it('should return an array with 3 elements', () => {
    const routes = Object.keys(UniversityRoutes).length;
    assert.equal(routes, 3);
  });
});

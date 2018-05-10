import assert from 'assert';
import StudentRoutes from '../../../src/components/routes/StudentRoutes';

describe('StudentRoutes', () => {
  // 168
  it('should return an array with one element', () => {
    const routes = Object.keys(StudentRoutes).length;
    assert.equal(routes, 3);
  });
});

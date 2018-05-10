import assert from 'assert';
import AdminRoutes from '../../../src/components/routes/AdminRoutes';

describe('AdminRoutes', () => {
  // 165
  it('should return an array with three elements', () => {
    const routes = Object.keys(AdminRoutes).length;
    assert.equal(routes, 7);
  });
});


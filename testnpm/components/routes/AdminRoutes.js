import assert from 'assert';
import AdminRoutes from '../../../src/components/routes/AdminRoutes';

describe('AdminRoutes', () => {
  it('should return an array with one element', () => {
    const routes = Object.keys(AdminRoutes).length;
    assert.equal(routes, 1);
  });
});

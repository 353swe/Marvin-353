import assert from 'assert';
import PublicRoutes from '../../../src/components/routes/PublicRoutes';

describe('PublicRoutes', () => {
  it('should return an array with 3 elements', () => {
    const routes = Object.keys(PublicRoutes).length;
    assert.equal(routes, 3);
  });
});

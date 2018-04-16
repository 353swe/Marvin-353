import assert from 'assert';
import CommonRoutes from '../../../src/components/routes/CommonRoutes';

describe('CommonRoutes', () => {
  it('should return an array with 4 elements', () => {
    const routes = Object.keys(CommonRoutes).length;
    assert.equal(routes, 4);
  });
});

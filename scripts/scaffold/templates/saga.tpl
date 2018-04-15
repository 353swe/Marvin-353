import { call, put, fork } from 'redux-saga/effects';
import { creators as actionCreators } from '../ducks/--Name--';

const actionType = type => `marvin/--Name--Saga/${type}`;

export const creators = {};

export default function* handler() {
  yield [];
};

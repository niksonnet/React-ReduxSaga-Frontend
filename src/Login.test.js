import React from "react";
// import { shallow, mount } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import renderer from "react-test-renderer";

import LoginForm from "../src/Shared/Controls/Containers/LoginFormContainer";

import * as actionType from "../src/Actions/actions"
import * as types from "./Reducers/Types";

let mockStore = configureMockStore();

describe("Test LoginForm Component", () => {
  let store;
  let wrapper;
  const [username, password] = ["Regular", "Test@123"]

  const payload = {
    username: username,
    password: password
  }
  beforeEach(() => {
    store = mockStore({
      user: {
        username: username,
        role: password,
        discount: 0
      },
      loading: false,
      loggedIn: true,
      error: null

    });

    wrapper = renderer.create(
      <Provider store={store}>
        <LoginForm />
      </Provider>);
  });

  it("should render with exact given state from Redux store", () => {
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it("Login Action Method with payload", () => {
    const expectedLoginAction = {
      type: types.LOGIN_STARTED,
      payload
    }
    expect(actionType.AuthUser(payload)).toEqual(expectedLoginAction);

    const expectedLogoutAction = {
      type: types.USER_LOGOUT
    }
    expect(actionType.LogoutUser()).toEqual(expectedLogoutAction);
  });
  it("Logout Action Method with payload", () => {

    const expectedLogoutAction = {
      type: types.USER_LOGOUT
    }
    expect(actionType.LogoutUser()).toEqual(expectedLogoutAction);
  });
});

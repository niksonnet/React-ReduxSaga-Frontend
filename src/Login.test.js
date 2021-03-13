import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";


import LoginFormContainer from "../src/Shared/Controls/Containers/LoginFormContainer";
import App from "./App"

const mockStore = configureMockStore();
const store = mockStore({
  user: { loggedIn: true }
});

describe("Test LoginFormContainer Component", () => {
  const wrapper = mount(
    <Provider store={store}>
      <LoginFormContainer />
    </Provider>).dive();


  it("Should have button component", () => {
    // const app = mount(<wrapper />);
    // let txt = app.find('button').text()
    // expect(txt).toEqual("Form is Incomplete!");

    expect(wrapper.find('Button').text()).toEqual('Login');
    //expect(wrapper.find("button").first().text()).toHaveLength(2);

    // //Button : should be of type button
    // expect(wrapper.find('Button')
    //   .type().defaultProps.type)
    //   .toEqual('button');

    //Button : should have matching text
    console.log("log -", wrapper.find("Connect"));
    expect(wrapper.find("button").first().length).toHaveLength(1);
    // expect(wrapper.find('Button').text()).toEqual('Login');
  });
});




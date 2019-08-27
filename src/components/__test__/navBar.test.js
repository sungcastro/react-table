import React from "react";
import NavBar from "../navBar";
import { NavLink } from "react-router-dom";
import { shallow } from "../../setUpTest";

describe("<NavBar/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  it("renders 5 navLinks", () => {
    const navLink = wrapper.find(NavLink);
    expect(navLink).toHaveLength(5);
  });

  it("renders includig navLinks if user exist", () => {
    wrapper.setProps({ user: true });
    const navLink = wrapper.find(NavLink);
    expect(navLink).toHaveLength(5);
  });

  it("verifies the Logout", () => {
    wrapper.setProps({ user: true });
    expect(
      wrapper.contains(
        <NavLink className="nav-link" to="/logout">
          Logout
        </NavLink>
      )
    ).toEqual(true);
  });
});

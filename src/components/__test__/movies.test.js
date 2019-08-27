import React from "react";
import Movies from "../movies";
import { Link } from "react-router-dom";
import { shallow } from "../../setUpTest";

describe("<Movies/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Movies />);
  });

  it("verifies the new movie link", () => {
    wrapper.setProps({ user: { name: true } });
    const navLink = wrapper.find(Link);
    expect(navLink).toHaveLength(0);
  });
});

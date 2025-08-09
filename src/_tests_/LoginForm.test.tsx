import { it, describe, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";

import LoginForm from "../components/LoginForm";

describe("LoginForm...", () => {
  beforeAll(() => {
    render(<LoginForm />);
  });

  it('should render "LoginForm"', () => {
    const username = screen.getByPlaceholderText("enter your username");
    const password = screen.getByPlaceholderText("enter your password");
    
    expect(username).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
});

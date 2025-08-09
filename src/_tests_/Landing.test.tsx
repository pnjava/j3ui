import { it, describe, expect, beforeAll, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Landing from "../components/Landing";

const getAllPlansStub = [
  {
    firstName: "Bradley",
    lastName: "Floyd III",
    patientName: "Bradley Floyd III",
    dob: "1996-11-23T00:00:00",
    lastActivity: "2024-11-23T00:00:00",
    mrn: "123456",
    planStatus: "draft",
    planType: "Ongoing plan",
    location: "705",
    metadata: {},
  },
  {
    firstName: "John",
    lastName: "Doe",
    patientName: "John Doe",
    dob: "1996-11-23T00:00:00",
    lastActivity: "2024-11-23T00:00:00",
    mrn: "246810",
    planStatus: "draft",
    planType: "Ongoing plan",
    location: "CCCA",
    metadata: {},
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    patientName: "Jane Doe",
    dob: "1996-11-23T00:00:00",
    lastActivity: "2024-11-23T00:00:00",
    mrn: "369121",
    planStatus: "draft",
    planType: "Ongoing plan",
    location: "SEVTC - Southwestern",
    metadata: {},
  },
];

vi.mock("react-router-dom", () => ({
  useLocation: vi.fn(() => ({ search: "" })),
}));

vi.mock("LandingService", () => ({
  getAllPlans: vi.fn(() => getAllPlansStub),
}));

describe("Landing page test...", () => {
  beforeAll(() => {
    render(<Landing />);
  });

  it('should render "DAP Landing page"', () => {
    const heading = screen.getByText(/DAP Dashboard/i);
    expect(heading).toBeInTheDocument();
  });
});

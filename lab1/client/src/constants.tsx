import { ConvexQuadrangle } from "./pages/ConvexQuadrangle";

export type Lab = {
  id: number;
  title: string;
  url: string;
  element: React.ReactNode;
}

export enum LabNumber {
  Lab1 = 1,
  Lab2 = 2,
}

export const LABS: Record<LabNumber, Lab> = {
  [LabNumber.Lab1]: {
    id: 1,
    title: "Quadrangle - Convex",
    url: "/quadrangle-convex",
    element: <ConvexQuadrangle />
  },
  [LabNumber.Lab2]: {
    id: 2,
    title: "Shortest path",
    url: "/shortest-path",
    element: null
  }
}

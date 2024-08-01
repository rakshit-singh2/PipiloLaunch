import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LaunchpadCreate from "../Pages/LaunchpadCreate/LaunchpadCreate";
import LaunchpadList from "../Pages/LaunchpadList/LaunchpadList";
import Fairlaunch from "../Pages/Fairlaunch/Fairlaunch";
import LockCreate from "../Pages/LockCreate/LockCreate";
import LockList from "../Pages/LockList/LockList";
import TokenCreate from "../Pages/TokenCreate/TokenCreate";
import Documents from "../Pages/Documents/Documents";
import Kyc from "../Pages/Kyc/Kyc";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      {
        path: 'launchpads',
        children: [
          { path: 'launchpad', element: <LaunchpadCreate /> },
          { path: 'fairlaunch', element: <Fairlaunch /> },
          { path: 'launchpad-list', element: <LaunchpadList /> },
        ],
      },
      {
        path: 'lock',
        children: [
          { path: 'create', element: <LockCreate /> },
          { path: 'lock-list', element: <LockList /> },
        ],
      },
      { path: 'token', element: <TokenCreate /> },
      { path: 'documents', element: <Documents /> },
      { path: 'kyc', element: <Kyc /> }
    ],
  },
]);

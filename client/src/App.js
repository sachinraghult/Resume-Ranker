import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";

import {
  Login,
  Register,
  Welcome,
  Welcome2,
  JobApplication,
  JobFeed,
  JobsApplied,
  Bookmark,
  Profile,
  JobFormPage,
  JobCreated,
  Ranking,
  PreprocessedProfile,
  ReportGenerated,
  Dashboard,
} from "./pages";
import { User, Url } from "./enums";
import "./App.css";
import Annotator from "./pages/Annotator/Annotator";
import PostInfo from "./components/Dashboard/postInfo/PostInfo";
import Post from "./pages/RecruiterDashboard/Post";
import JobApplicationRecruiter from "./pages/JobApplicationRecruiter/JobApplicationRecruiter";

function App() {
  const { user, type } = useContext(Context);

  return (
    <BrowserRouter>
      <Routes>
        {/* GENERAL ROUTES */}
        <Route
          path={Url.DEFAULT}
          element={
            !user ? (
              <Welcome />
            ) : type == User.SEARCHER ? (
              <JobFeed />
            ) : (
              <Dashboard />
            )
          }
        />
        <Route
          path={Url.SELECTION}
          element={
            !user ? (
              <Welcome2 />
            ) : type == User.SEARCHER ? (
              <JobFeed />
            ) : (
              <Dashboard />
            )
          }
        />
        <Route
          path={Url.REGISTER}
          element={
            !user ? (
              <Register />
            ) : type == User.SEARCHER ? (
              <JobFeed />
            ) : (
              <Dashboard />
            )
          }
        />
        <Route
          path={Url.LOGIN}
          element={
            !user ? (
              <Login />
            ) : type == User.SEARCHER ? (
              <JobFeed />
            ) : (
              <Dashboard />
            )
          }
        />
        <Route path={Url.PROFILE} element={user ? <Profile /> : <Welcome />} />

        {/* SEARCHER ROUTES */}
        <Route
          path={Url.JOB_FEED}
          element={
            user && type === User.SEARCHER ? (
              <JobFeed />
            ) : user && type === User.RECRUITER ? (
              <Dashboard />
            ) : (
              <Welcome />
            )
          }
        />
        <Route
          path={Url.APPLY}
          element={user ? <JobApplication /> : <Welcome />}
        />
        <Route
          path={Url.APPLYRECRUITER}
          element={user ? <JobApplicationRecruiter /> : <Welcome />}
        />
        <Route
          path={Url.MY_APPLICATIONS}
          element={
            user && type === User.SEARCHER ? <JobsApplied /> : <Welcome />
          }
        />

        <Route
          path={Url.MY_BOOKMARKS}
          element={user && type === User.SEARCHER ? <Bookmark /> : <Welcome />}
        />

        {/* RECRUITER ROUTES */}

        <Route path={Url.DASHBOARD} element={<Dashboard />} />
        <Route
          path={Url.CREATE_JOB_POST}
          element={
            user && type === User.RECRUITER ? <JobFormPage /> : <Welcome />
          }
        />
        <Route
          path={Url.MY_JOBS}
          element={
            user && type === User.RECRUITER ? <JobCreated /> : <Welcome />
          }
        />

        <Route
          path={Url.RANKING}
          element={user && type === User.RECRUITER ? <Ranking /> : <Welcome />}
        />

        <Route
          path={Url.PREPROCESSED_PROFILE}
          element={
            user && type === User.RECRUITER ? (
              <PreprocessedProfile />
            ) : (
              <Welcome />
            )
          }
        />

        {/* WORKING ROUTES */}
        <Route path={Url.JOBSPECIFICDASHBOARD} element={<Post />} />
        <Route path={Url.REPORT} element={<ReportGenerated />} />
        <Route path={Url.ANNOTATOR} element={<Annotator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

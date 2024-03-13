import React from "react";
global.React = React;
import ReactDOM from "react-dom/client";
import AppliedCards from "../Appliedcards";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", async () => {
  const root = ReactDOM.createRoot(document.createElement("div"));
  await act(async () =>
    render(
      <BrowserRouter>
        <AppliedCards />
      </BrowserRouter>
    )
  );
});

it("renders correctly", () => {
  const data = {
    _id: "62cb1e2bab7429104fb50dd4",
    user: "62cada80a56a074fefcf62d2",
    post: {
      _id: "62caad3248bc73a7e0585749",
      title: "Analyst",
      desc: "Participates in a formal internship program with a duration of at least 8 – 10 weeks. Internship includes performing various assignments to become familiar with the organization and gain basic work experience. Work assignments are augmented by classroom training, self-study assignments, workshops, networking and/or other events.",
      exp: "Detail oriented, results driven, accountable and ability to work with multiple priorities\nAbility to research and report on a variety of issues using problem solving skills\nAbility to interact with integrity and a high level of professionalism with all levels of\nteam members and management\nAbility to make timely and independent judgment decisions while working in a fast-paced and results-driven environment",
      skills: [
        {
          skill: "Java",
          value: 44,
          _id: "62caad3248bc73a7e058574a",
        },
        {
          skill: "C#",
          value: 25,
          _id: "62caad3248bc73a7e058574b",
        },
        {
          skill: "SQL",
          value: 30,
          _id: "62caad3248bc73a7e058574c",
        },
      ],
      tags: ["Internship", "Full Time"],
      deadline: "2022-10-30T00:00:00.000Z",
      email: "wellsfargo@gmail.com",
      createdAt: "2022-07-10T10:42:58.918Z",
      updatedAt: "2022-07-10T18:44:59.113Z",
    },
    resume: "62cb1e2bab7429104fb50dd0",
    createdAt: "2022-07-10T18:44:59.108Z",
    updatedAt: "2022-07-19T05:22:19.446Z",
    __v: 0,
    preprocessing_data:
      '{"skills": ["Java", "Python", "C", "C++", "Html", "Sap", "Css", "Design", "System", "Javascript", "Ibm", "Sports", "Cloud"], "college_name": ["College of Engineering,"], "experience": ["Summer Intern at SAP Labs, Bangalore –", "Quality Management Team", "Developed modules for 8D PSPA app (On going project)", "in JAVA (Spring Boot Framework) which is a", "collaborative platform deployed in SAP Cloud Platform", "(SCP)."], "company_names": [], "total_experience": [], "key_words": [], "text": " Pothikkannan G   19/08/1999  Indian   Inspired by Kindness,  Driven by Passion.   EDUCATION   College of Engineering, Guindy — B.E.   CSE Department   August 2017 -Present   Cleared 6 semesters with a CGPA of 9.52   CEOA Mat. Hr. Sec. School, Madurai.   Cleared HSC with 99.17% (1190/1200) in April 2017.   Cleared SSLC with 99.2% (496/500) in April 2015.   EXPERIENCE   Summer Intern at SAP Labs, Bangalore –  Quality Management Team    Developed modules for 8D PSPA app (On going project)  in JAVA (Spring Boot Framework) which is a  collaborative platform deployed in SAP Cloud Platform  (SCP).      PROJECTS   Data Augmentation of EEG Signals     A machine learning project that generates artificial EEG  signals from natural EEG signals using conditional  DCGAN model and thereby improves the performance of  the BCI classifier.   Theatre Ticket Booking System-Java Project   A basic JAVA project that enables users to know about  the movies screened, ticket prices and the show details.  The front end is constructed using JavaSwing to reserve  the desired seats and quantify the ticket prices.   SKILL SET   •  C, C++, Java, Python (Beginner).  •  Web Design (HTML, CSS, JavaScript).  •  DBMS.  •  SAP Cloud Platform.              5, Karthik Niwas, Sri Rajarajeshwari        Nagar, Near Panangadi, Madurai-625017.     (+91) 9500702083            pothikkannan1@gmail.com            www.linkedin.com/in/pothikkannan-g   RESPONSIBILITIES HELD   •  CSE Department Chairperson in      •   2020-21  iXp intern committee 2020 member in  SAP Labs, Bangalore   •  Student Representative of CSE Dept   2018-19,2019-20.   •  Placement Coordinator in the year   2020-21.  Joint Secretary in NSS Unit-4.    •  •  Organiser in Xceed and Karnival Team  (Out Reach Team) in CEG Tech Forum  (CTF) from 2018 to 2020.   ORGANISING ACTIVITIES   •  Organised the first online version of  CSE department’s symposium - ABACUS’21 virtually during March  2021.    •  Organiser in Tech Xceed (CTF)   conducted in GCT, Coimbatore (Jan  2020), Thiagaraja College of  Engineering, Madurai (Feb 2020) and  IIT Tirupathi (Feb 2019) by Xceed and  Karnival Team.   •  A part of Organising NSS oriented   events like AATRAL and UYIRPPU and  a 7-day camp in a village-Siruvapuri  (2018,2019).   •  Organiser in the workshop conducted  by IBM Watson in Kurukshetra’19.  •  A part of organising a 7-day National   Industrial Visit to Goa, Chickmangalur,  Coorg and Bangalore (Sep 2019).    ACHIEVEMENTS       Winner of Impact Hackathon conducted by  GiftAbled in association with SAP in Aug 2020.   SPORTS ACHIEVEMENTS   •  State level Beach volleyball player.  •  District level Tennikoit player and   1500 m Athlete.                       \\f", "scores": [0.27712361517663, 0.02695015450853568, 0.10017346066809424, 0.05, 0.1, 0.0]}',
    status: "In Review",
  };
  render(
    <BrowserRouter>
      <AppliedCards job={data} />
    </BrowserRouter>
  );
});

it("matches snapshot", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <AppliedCards />
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

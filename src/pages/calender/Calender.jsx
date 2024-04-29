import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navbar/NavBar";
import "./calender.scss";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import classNames from "classnames";
import { publicRequest } from "../../requestMethods";

const localizer = momentLocalizer(moment);

const Calender = () => {
  const [appointments, setAppointments] = useState([]);

  const [tutors, setTutors] = useState([]);

  const [selectedTutor, setSelectedTutor] = useState("all");

  const getFilteredAppointments = () => {
    if (selectedTutor === "all") {
      return appointments; // Show all appointments
    }
    return appointments.filter(
      (appointment) => appointment.tutor.toString() === selectedTutor // Ensure consistent comparison
    );
  };

  const transformAppointments = (appointments) => {
    return appointments.map((appointment) => ({
      id: appointment._id,
      title: appointment.title,
      start: new Date(appointment.start),
      end: new Date(appointment.end),
      user: appointment.user,
      tutor: appointment.tutor,
    }));
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await publicRequest.get("/v1/appointments/");
        const transformedAppointments = transformAppointments(res.data);
        setAppointments(transformedAppointments);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchTutors = async () => {
      try {
        const res = await publicRequest.get("/v1/tutors/all");
        setTutors(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTutors();
    fetchAppointments();
  }, []);

  // const getUserColor = (tu) => {
  //   switch (appointments.tutor) {
  //     case "John":
  //       return "#E91E63"; // Specific color for John
  //     case "Alice":
  //       return "#2196F3"; // Specific color for Alice
  //     case "Darth":
  //       return "#030170"; // Specific color for Darth
  //     default:
  //       return "red"; // Default color for other users
  //   }
  // };

  // const eventStyleGetter = (appointments) => {
  //   const backgroundColor = getUserColor(appointments.user);
  //   return {
  //     className: classNames("rbc-event", `user-${appointments.user}`),
  //     style: {
  //       backgroundColor,
  //     },
  //   };
  // };

  // Custom Event component to include user's image
  // const CustomEvent = ({ appointments }) => (
  //   <div className={classNames("rbc-event", `user-${appointments.user}`)} style={{ backgroundColor: getUserColor(appointments.user), display:"flex", alignItems:"center" }}>
  //     <img width="25" height="25" style={{marginRight: "5px"}} src={appointments.image} alt="profile" className="event-image" />
  //     <div className="rbc-event-content" title={appointments.title}>{appointments.title}</div>
  //   </div>
  // );

  return (
    <div className="calender">
      <SideBar />
      <div className="calenderContainer">
        <NavBar />

        <div className="top">
          <div className="left">
            <div className="appointeesProfiles">
              {tutors.map((curElem) => {
                const { _id, img, username } = curElem;
                return (
                  <div className="profile" key={_id}>
                    <img src={img} alt="profile" className="image image1" />
                    <span className="name">{username}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="right">
            <div className="filterContainer">
              <select
                name="filter"
                className="filters"
                defaultValue="all"
                onChange={(e) => {
                  setSelectedTutor(e.target.value);
                }}
              >
                <option value="all" className="options">
                  Show All
                </option>
                {tutors.map((tutor) => {
                  const { _id, username } = tutor;
                  return (
                    <option key={_id} value={_id} className="options">
                      {username}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="bottom">
          <div className="calenderContents">
            <Calendar
              localizer={localizer}
              startAccessor="start"
              endAccessor="end"
              events={getFilteredAppointments()}
              style={{ height: 410, backgroundColor: "white" }}
              // eventPropGetter={eventStyleGetter}
              // components={{
              //   event: CustomEvent, // Use CustomEvent component for rendering events
              //   // anotherEvent: eventStyleGetter
              // }}
            />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Calender;

import React, { useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Stack,
  InputAdornment,
} from "@mui/material";
import {
  LocalizationProvider,
  TimePicker,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const UpdateAppointment = ({
  appointment,
  appointmentsListUpdate,
  handleCloseUpdateAppointment,
}) => {
  const [date, setDate] = useState(dayjs(appointment.date));
  const [time, setTime] = useState(dayjs(appointment.time, "hh:mm A"));
  const [service, setService] = useState(appointment.service);
  const [client, setClient] = useState(appointment.client);
  const [duration, setDuration] = useState(appointment.duration);
  const [status, setStatus] = useState(appointment.status);
  const [employee, setEmployee] = useState(appointment.employee);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Format date as "Month Day, Year"
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

    // Format time as "HH:MM am/pm"
    const formattedTime = dayjs(time).format("hh:mm A");
    // Format date and time as in CreateAppointment

    const updatedAppointment = {
      ...appointment,
      date: formattedDate,
      time: formattedTime,
      service: service,
      client: client,
      duration: duration,
      status: status,
      employee: employee,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/appointments/updateAppointmentsData/${appointment.id}`,
        updatedAppointment
      );
      appointmentsListUpdate(updatedAppointment);
      handleCloseUpdateAppointment();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form style={{ marginTop: "30px" }} onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <DatePicker
            label="Date"
            sx={{
              ".MuiInputBase-input": {
                height: "10px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            sx={{
              ".MuiInputBase-input": {
                height: "10px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            label="Time"
            value={time}
            onChange={(newValue) => setTime(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <FormControl
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            fullWidth
          >
            <InputLabel id="service-label">Service</InputLabel>
            <Select
              labelId="service-label"
              value={service}
              label="Service"
              onChange={(event) => setService(event.target.value)}
            >
              {/* Populate these MenuItem components with your services */}
              <MenuItem value="service1">Service 1</MenuItem>
              <MenuItem value="service2">Service 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            fullWidth
          >
            <InputLabel id="client-label">Client</InputLabel>
            <Select
              labelId="client-label"
              value={client}
              label="Client"
              onChange={(event) => setClient(event.target.value)}
            >
              {/* Populate these MenuItem components with your clients */}
              <MenuItem value="client1">Client 1</MenuItem>
              <MenuItem value="client2">Client 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            label="Duration"
            type="number"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }}
          />
          <FormControl
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            fullWidth
          >
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              label="Status"
              onChange={(event) => setStatus(event.target.value)}
            >
              {/* Populate these MenuItem components with your status options */}
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Ended">Ended</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            sx={{
              ".MuiInputBase-root": {
                height: "45px",
              },
              ".MuiFormLabel-root": {
                fontSize: "12px",
                fontWeight: "bold",
              },
            }}
            fullWidth
          >
            <InputLabel id="employee-label">Employee</InputLabel>
            <Select
              labelId="employee-label"
              value={employee}
              label="Employee"
              onChange={(event) => setEmployee(event.target.value)}
            >
              {/* Populate these MenuItem components with your employees */}
              <MenuItem value="employee1">Employee 1</MenuItem>
              <MenuItem value="employee2">Employee 2</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            // onClick={handleCloseCreateAppointment}
          >
            Update
          </Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );
};

export default UpdateAppointment;

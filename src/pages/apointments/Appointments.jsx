import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Tooltip,
  InputAdornment,
  Avatar,
  Typography,
  IconButton,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/system";
import SideBar from "../../components/sidebar/SideBar";
import NavBar from "../../components/navbar/NavBar";
import SearchIcon from "@mui/icons-material/Search";
import DateComponent from "../../components/date/DateComponent";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  getGridStringOperators,
} from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CreateAppointment from "./CreateAppointment";
import UpdateAppointment from "./UpdateAppointment";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";

const theme = createTheme({
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          "&.MuiInputBase-root": {
            borderRadius: "30px",
          },
          borderRadius: "4px",
        },
        icon: {
          // Style the dropdown icon if necessary
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          // Style your MenuItem here
          "&.Mui-selected": {
            // backgroundColor: '#4caf50', // This is for selected item
            // color: 'white',
            "&:hover": {
              backgroundColor: "#66bb6a", // Lighten the color on hover
            },
          },
          // '&:hover': {
          //   backgroundColor: '#eeeeee', // Lighten the color on hover for other items
          // },
        },
      },
    },
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #F5F5F5",
  boxShadow: 24,
  p: 4,
};

const createAppointmentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "100%",
  overflow: "cursor",
  bgcolor: "white",
  border: "2px solid #F5F5F5",
  boxShadow: 24,
  p: 4,
};
// const appoinmentsData = [
//   {
//     id: 1,
//     date: "July 6, 2024",
//     time: "10:00 am",
//     service: "1 hour - Accountability Coach",
//     client: "Jacob G",
//     duration: "30min",
//     status: "Active",
//     employee: "Pedro",
//     avatar: "/broken-image.jpg",
//     note: "Testing",
//   },
//   {
//     id: 2,
//     date: "July 6, 2024",
//     time: "12:00 pm",
//     service: "College Advising Session",
//     client: "Phoenix Hammond",
//     duration: "1h",
//     status: "Suspended",
//     employee: "Erin",
//     avatar: "/broken-image.jpg",
//     note: "Testing",
//   },
//   {
//     id: 3,
//     date: "July 10, 2024",
//     time: "5:30 pm",
//     service: "College Advising Session",
//     client: "Phoenix Hammond",
//     duration: "1h",
//     status: "Pending",
//     employee: "Erin",
//     avatar: "/broken-image.jpg",
//     note: "Testing",
//   },
//   {
//     id: 4,
//     date: "July 11, 2024",
//     time: "3:30 pm",
//     service: "College Advising Session",
//     client: "Joe Halley",
//     duration: "1h",
//     status: "Active",
//     employee: "Erin",
//     avatar: "/broken-image.jpg",
//     note: "Testing",
//   },
//   {
//     id: 5,
//     date: "Sept 11, 2024",
//     time: "6:30 pm",
//     service: "College Advising Session",
//     client: "Tom Hammond",
//     duration: "1h",
//     status: "Active",
//     employee: "Erin",
//     avatar: "/broken-image.jpg",
//     note: "Testing",
//   },
//   {
//     id: 6,
//     date: "Sept 11, 2024",
//     time: "7:30 pm",
//     service: "College Advising Session",
//     client: "Katy Hammond",
//     duration: "1h",
//     status: "Active",
//     employee: "Erin",
//     avatar: "/broken-image.jpg",
//     note: "Testing",
//   },
// ];

const Appointments = () => {
  const filterOperators = getGridStringOperators().filter(({ value }) =>
    ["contains" /* add more over time */].includes(value)
  );

  const [openUpdateAppointment, setOpenUpdateAppointment] =
    React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentsListUpdate, setAppointmentsListUpdate] = useState([]);
  const [rowCountsPerDate, setRowCountsPerDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [originalRowsData, setOriginalRowsData] = useState("");
  const [userFilterName, setUserFilterName] = useState("");
  const [selectionModel, setSelectionModel] = useState([]);
  const [renderFlag, setRenderFlag] = useState(false);
  const [selectedRows, setSelectedRows] = useState([null]);
  const [columns, setColumns] = useState();
  const [rowsData, setRowsData] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [open, setOpen] = React.useState(false);
  const [currentNote, setCurrentNote] = React.useState("");
  const [selectedRowId, setSelectedRowId] = React.useState(null);
  const [openViewNote, setOpenViewNote] = React.useState(false);
  const [selectedRowNote, setSelectedRowNote] = React.useState("");
  const [openCreateAppointment, setOpenCreateAppointment] =
    React.useState(false);
  const [deleteFlag, setDeleteFlag] = useState(true);
  const [filterModel, setFilterModel] = React.useState({
    items: [],
  });

  const [statusData, setStatusData] = useState([
    {
      value: "A",
      code: "A",
      label: "Active",
      status: "Active",
      color: "#6ccca5 ",
      fontColor: "#00351f",
    },
    {
      value: "E",
      code: "E",
      label: "Ended",
      status: "Ended",
      color: "#ffffc9",
      fontColor: "#919127",
    },
    {
      value: "c",
      code: "c",
      label: "Cancelled",
      status: "Cancelled",
      color: "#ffc9c9",
      fontColor: "#db1a1a",
    },
  ]);

  useEffect(() => {
    const columnsData = [
      {
        field: "date",
        sortable: false,
        disableColumnMenu: true,
        headerName: "Date",
        width: 0,
        sortable: false,
        disableColumnMenu: true,
        hideable: true,
      },
      {
        field: "time",
        sortable: false,
        disableColumnMenu: true,
        headerName: "Time",
        width: 150,
        renderCell: (params) => {
          if (params.row.isGroup) {
            return (
              <strong
                style={{
                  paddingLeft: "10px",
                }}
              >{`${params.row.date} (${
                rowCountsPerDate[params.row.date]
              })`}</strong>
            );
          } else {
            return (
              <Tooltip title={params.row.date}>
                <span>{params.value}</span>
              </Tooltip>
            );
          }

          // Custom rendering for group header cells
          // if (params.row && params.row.hasOwnProperty("time")) {
          //   // Render the time information
          //   return (
          //     <strong
          //       style={{
          //         paddingLeft: "10px",
          //       }}
          //     >{`${params.row.time}`}</strong>
          //   );
          // } else if(params.row.isGroup) {
          //   debugger
          //   // If the row object does not contain a "time" property, render the default content
          //   return (
          //     <Tooltip title={params.row.date}>
          //       <span>
          //         {`${params.row.date}(${rowCountsPerDate[params.row.date]})`}
          //       </span>
          //     </Tooltip>
          //   );
          // }
        },
      },
      {
        field: "service",
        sortable: false,
        disableColumnMenu: true,
        headerName: "Service",
        width: 100,
        renderCell: (params) => (
          <Tooltip title={params.value}>
            <span>{params.value}</span>
          </Tooltip>
        ),
      },
      {
        field: "client",
        sortable: false,
        disableColumnMenu: true,
        headerName: "Client",
        width: 150,
      },
      {
        field: "duration",
        sortable: false,
        disableColumnMenu: true,
        headerName: "Duration",
        width: 100,
        renderCell: (params) => {
          if (params.row.isGroup) {
            return;
          }
          return <Box>{`${params.row.duration} min`}</Box>;
        },
      },
      {
        field: "status",
        sortable: false,
        disableColumnMenu: true,
        headerName: "Status",
        width: 150,
        // editable: true,
        // valueSetter: setStatus,
        // valueGetter: getStatus,
        // onChange:changeStatus,
        // filterOperators

        // type: "singleSelect",
        // valueOptions: [
        //   { value: "Active", label: "Active" },
        //   { value: "Suspended", label: "Suspended" },
        //   { value: "Pending", label: "Pending" },
        // ],
        // valueParser: (value) => {
        //   debugger
        //   if (typeof value === 'string') {
        //     return statusData.find((s) => s.value === value);
        //   }

        //   return value;
        // },
        // valueFormatter: ({ value }) => value?.label,
        // groupingValueGetter: (params) => params.value.code,
        // sortComparator: (v1, v2, param1, param2) =>
        // gridStringOrNumberComparator(v1.label, v2.label, param1, param2),
        // editable:false,

        renderCell: (params) => {
          if (params.row.isGroup) {
            return;
          }
          let bColor;
          let fColor;
          statusData.map((f) => {
            if (f.status === params.row.status) {
              bColor = f.color;
              fColor = f.fontColor;
            }
          });

          return (
            <ThemeProvider theme={theme}>
              <Select
                sx={{
                  ".MuiInputBase-input": {
                    margin: "-7px 0px",
                    // width: '5em',
                    // textAlign: 'center'
                  },
                  backgroundColor: bColor,
                  color: fColor,
                }}
                onChange={(event) => {
                  changeStatus(event.target.value, params.row.id);
                }}
                value={params.value}
                name="status"
              >
                {statusData?.map((v) => (
                  <MenuItem key={v.label} value={v.label}>
                    {v.label}
                  </MenuItem>
                ))}
              </Select>
            </ThemeProvider>

            // <Box
            //   sx={{
            //     backgroundColor: bColor,
            //     color: fColor,
            //     borderRadius: "15px",
            //     padding: "5px 10px",
            //   }}
            // >
            //   {params.row.status}
            // </Box>
          );
        },
      },
      {
        field: "avatar",
        sortable: false,
        disableColumnMenu: true,
        headerName: "Avatar",
        sortable: false,
        disableColumnMenu: true,
        width: 70,
        renderCell: (params) => {
          if (params.row.isGroup) {
            return;
          }
          return (
            <>
              <Avatar
                src={params.row.avatar}
                sx={{
                  position: "absolute",
                  bgcolor: "#" + params.row.randomColor,
                  "&.MuiDataGrid-columnHeaderTitle": {
                    position: "absolute",
                  },
                }}
              >
                {params.row?.firstName?.charAt(0)}
                {params.row?.lastName?.charAt(0)}
              </Avatar>
            </>
          );
        },
      },
      {
        field: "employee",
        sortable: false,
        disableColumnMenu: true,
        headerName: "Employee",
        width: 100,
      },
      {
        field: "actions1",
        sortable: false,
        disableColumnMenu: true,
        type: "actions",
        headerName: "Note",
        width: 90,
        getActions: (params) => {
          try {
            if (params.row.isGroup) {
              return [];
            } else
              return [
                <>
                  {params.row.note && params.row.note.trim() !== "" && (
                    <Tooltip title="View Note">
                      <GridActionsCellItem
                        icon={<VisibilityIcon />}
                        label="View"
                        onClick={() => handleOpenViewNote(params.row)}
                      />
                    </Tooltip>
                  )}
                  <Tooltip title="Add Note">
                    <GridActionsCellItem
                      icon={<AddCircleOutlineIcon />}
                      label="Note"
                      onClick={() => handleOpen(params.row)}
                    />
                  </Tooltip>
                </>,
              ];
          } catch (err) {
            console.log(err);
          }
        },
      },
      {
        field: "actions2",
        sortable: false,
        disableColumnMenu: true,
        type: "actions",
        width: 90,
        getActions: (params) => {
          try {
            if (params.row.isGroup) {
              return [];
            } else
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit Appointment"
                  onClick={() => {
                    setSelectedAppointment(params.row); // Set the selected appointment
                    setOpenUpdateAppointment(true); // Open the UpdateAppointment dialog
                  }}
                  showInMenu
                />,
              ];
          } catch (err) {
            console.log(err);
          }
        },
      },
    ];
    setColumns(columnsData);
  }, [rowsData]);

  async function changeStatus(value, id) {
    // Update status in backend
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/appointments/updateAppointmentsData/${id}`,
        {
          status: value,
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.status === 200) {
        window.location.reload(false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
    // if (!params.row.id) {
    //   console.error("Row does not have an id:", params.row);
    //   return params.row;
    // }

    // return { ...params.row, id: params.row.id, value };
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before data fetching
        const response = await axios.get("http://localhost:5000/api/v1/appointments/appointments");

        if (response.data) {
          response.data.sort((a, b) => {
            // Parse the date strings into date objects
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);

            // Compare the dates
            return dateA - dateB; // For ascending order
            // return dateB - dateA; // For descending order
          });
        }
        setRowsData(response.data);
        setOriginalRowsData(response.data);

        // Count rows per date
        const counts = response.data.reduce((acc, row) => {
          if (row.date) {
            acc[row.date] = (acc[row.date] || 0) + 1;
          }
          return acc;
        }, {});
        setRowCountsPerDate(counts);

        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("There was an error!", error);
        setLoading(true); // Also set loading to false if there was an error
      }
    };

    fetchData();
  }, [appointmentsListUpdate]);

  const handleOpen = (rowData) => {
    debugger;
    setOpen(true);
    setSelectedRowId(rowData.id);
    // Preset the current note if it already exists
    setCurrentNote(rowData.note || "");
  };
  const handleOpenViewNote = (rowData) => {
    setSelectedRowId(rowData.id);
    setSelectedRowNote(rowData.note || ""); // Use the note from rowData
    setOpenViewNote(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseViewNote = () => {
    setOpenViewNote(false);
  };

  const handleCloseCreateAppointment = () => {
    setOpenCreateAppointment(false);
  };

  const handleNoteSubmit = async () => {
    // Update the note in your rows data - you need to manage this state or update the backend
    const updatedRows = rowsData.map((row) => {
      if (row.id === selectedRowId) {
        return { ...row, note: currentNote };
      }
      return row;
    });

    // Update your rows state here if managed in the component state
    setRowsData(updatedRows);
    debugger;

    // Update note in backend
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/appointments/updateAppointmentsData/${selectedRowId}`,
        {
          note: currentNote,
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }

    handleClose();
  };

  const toggleAdmin = useCallback(
    (id) => () => {
      setRowsData((prevRows) =>
        prevRows.map((row) =>
          row.id === id ? { ...row, isAdmin: !row.isAdmin } : row
        )
      );
    },
    []
  );

  //Adding callback for appointment list update
  const addAppointment = (newAppointment) => {
    setAppointmentsListUpdate((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);
  };
  function getStatus(params) {
    return params.row.status || "";
  }

  //dropdown status
  async function setStatus(params) {
    let value = params.value;
    let users = rowsData;

    users.forEach((row) => {
      if (row.id === undefined) {
        console.error("Row does not have an id:", row);
      } else if (params.row.id === row.id) {
        row.status = params.value;
        params.row.status = params.value;
      }
    });

    // Update status in backend
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/appointments/updateAppointmentsData/${params.row.id}`,
        {
          status: params.value,
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
    if (!params.row.id) {
      console.error("Row does not have an id:", params.row);
      return params.row;
    }

    return { ...params.row, id: params.row.id, value };
  }

  const preprocessRows = (rows) => {
    const withDateHeaders = [];
    const datesAdded = new Set();

    rows.forEach((row, index) => {
      if (!datesAdded.has(row.date)) {
        withDateHeaders.push({
          id: `header-${row.date}`,
          date: row.date,
          isGroup: true,
        });
        datesAdded.add(row.date);
      }
      withDateHeaders.push({
        id: row.id || `row-${index}`,
        ...row,
        isGroup: false,
      });
    });

    return withDateHeaders;
  };
  const rowsWithHeaders = preprocessRows(rowsData);

  const requestSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setUserFilterName(searchValue);

    const filtered = originalRowsData.filter((row) => {
      return (
        row.service.toLowerCase().includes(searchValue) ||
        row.client.toLowerCase().includes(searchValue) ||
        row.time.toLowerCase().includes(searchValue) ||
        row.date.toLowerCase().includes(searchValue) ||
        row.status.toLowerCase().includes(searchValue) ||
        row.duration.toLowerCase().includes(searchValue) ||
        row.employee.toLowerCase().includes(searchValue)
      );
    });

    setRowsData(filtered);
  };

  // const rowCountsPerDate = rowsData.reduce((acc, row) => {
  //   acc[row.date] = (acc[row.date] || 0) + 1;
  //   return acc;
  // }, {});

  const handleDateAccept = (dateRange) => {
    const [start, end] = dateRange;

    setDateRange([start, end]);

    // Filter rows between the start and end dates
    const filtered = originalRowsData.filter((row) => {
      const rowDate = new Date(row.date);
      return (!start || rowDate >= start) && (!end || rowDate <= end);
    });

    setRowsData(filtered);
  };

  const deleteSelectedUsers = async () => {
    // Get the IDs of the selected appointments
    const selectedIds = selectedRows; // selectedRows is already an array of IDs

    for (const id of selectedIds) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/v1/appointments/deleteAppointment/${id}`
        );
        setRowsData((rowsData) => rowsData.filter((row) => row.id !== id));

        // Refresh your appointments data here
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (selectedRows.length > 0 && selectedRows[0] !== null) {
      setDeleteFlag(false);
    } else {
      setDeleteFlag(true);
    }
  }, [selectedRows]);
  <DateComponent handleDateAccept={handleDateAccept} />;
  return (
    <div className="home">
      <SideBar />
      <div className="homeContainer">
        <NavBar />
        <div style={{ padding: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <TextField
              type={"search"}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                width: {
                  xl: "70%",
                  lg: "70%",
                  md: "70%",
                  sm: "70%",
                  xs: "70%",
                },
              }}
              placeholder="Search"
              hiddenLabel
              id="filled-hidden-label-small"
              size="small"
              value={userFilterName}
              onChange={requestSearch}
              // onKeyPress={requestSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <DateComponent handleDateAccept={handleDateAccept} />
          </div>
          <div style={{ height: "auto", width: "100%" }}>
            {/* <Button variant="contained">Contained</Button> */}
            <Button
              onClick={() => setOpenCreateAppointment(true)}
              variant="contained"
              // disabled={deleteFlag}
              sx={{
                position: "absolute",
                left: "1000px",
                width: "15em",
                padding: "5px",
                zIndex: 1,
              }}
            >
              <AddIcon />
              Create Appointment
            </Button>
            <Button
              onClick={deleteSelectedUsers}
              disabled={deleteFlag}
              variant="outlined"
              // disabled={deleteFlag}
              sx={{
                color: "#e24d4d",
                position: "absolute",
                borderColor: "#e24d4d",
                left: "780px",
                width: "15em",
                padding: "5px",
                zIndex: 1,
              }}
            >
              <DeleteIcon />
              Delete Appointment
            </Button>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#757575"
              marginBottom="15px"
            >
              Appointments ({rowsData.length})
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              {loading ? (
                <CircularProgress />
              ) : (
                <DataGrid
                  hideFooter
                  initialState={{
                    ...statusData.initialState,
                    // pagination: { paginationModel: { pageSize: 5 } },
                    columns: {
                      columnVisibilityModel: {
                        date: false,
                      },
                    },
                  }}
                  // pageSizeOptions={[5, 10, 25]}

                  isRowSelectable={(params) => {
                    return !params.row.isGroup;
                  }}
                  onRowClick={(params, event) => {
                    // If the row is a group header, stop the click from doing anything
                    if (params.row.isGroup) {
                      event.preventDefault();
                    }
                  }}
                  slots={{ toolbar: GridToolbar }}
                  getRowClassName={(params) =>
                    params.row.isGroup ? "date-header-row" : ""
                  }
                  components={{
                    // Override the default checkbox rendering
                    BaseCheckbox: (props) => {
                      // If the row is a group header, do not render a checkbox
                      if (props.row.isGroup) {
                        return null;
                      }
                    },
                  }}
                  rows={rowsWithHeaders}
                  columns={columns.map((column) => ({
                    ...column,
                  }))}
                  checkboxSelection
                  disableSelectionOnClick
                  // onRowSelectionModelChange={}
                  // selectionModel={selectionModel}
                  filterModel={filterModel}
                  onFilterModelChange={setFilterModel}
                  onRowSelectionModelChange={(rows) => {
                    setSelectedRows(rows);
                    setSelectionModel(rows);

                    setRenderFlag(!renderFlag);
                  }}
                  sx={{
                    ".MuiDataGrid-row": {
                      width: "100%",
                    },
                    ".date-header-row .MuiDataGrid-cellCheckbox": {
                      display: "none",
                    },
                    ".date-header-row": {
                      backgroundColor:
                        "#f0f0f0" /* Your desired background color for the date row */,
                    },
                    ".group-header-row": {
                      backgroundColor: "#f0f0f0",
                      fontWeight: "bold",
                    },

                    "& .MuiDataGrid-columnHeaderTitle": {
                      position: "absolute",
                      fontWeight: "bold",
                    },
                    "&.MuiDataGrid-root .MuiDataGrid-iconSeparator": {
                      display: "none",
                    },
                    "&.MuiDataGrid-root": {
                      overflowY: "auto",
                    },
                    justifyContent: "center",
                    width: "100%",
                    borderTop: 0,
                    overflow: "scroll",
                    scrolling: {
                      columnRenderingMode: "virtual",
                    },
                  }}
                />
              )}
            </div>
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <TextField
                    id="outlined-multiline-static"
                    label="Add Note"
                    multiline
                    rows={4}
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    sx={{ width: "100%" }}
                  />
                  <Button onClick={handleNoteSubmit}>Save Note</Button>
                </Box>
              </Modal>
            </div>
            <div>
              <Modal
                open={openViewNote}
                onClose={handleCloseViewNote}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {selectedRowNote}
                  </Typography>
                </Box>
              </Modal>
            </div>
            <div>
              <Modal
                open={openCreateAppointment}
                onClose={handleCloseCreateAppointment}
              >
                <Box sx={createAppointmentStyle}>
                  <CreateAppointment
                    appointmentsListUpdate={addAppointment}
                    handleCloseCreateAppointment={handleCloseCreateAppointment}
                  />
                </Box>
              </Modal>
              <Modal
                open={openUpdateAppointment}
                onClose={() => setOpenUpdateAppointment(false)}
              >
                <Box sx={createAppointmentStyle}>
                  <UpdateAppointment
                    appointment={selectedAppointment}
                    appointmentsListUpdate={addAppointment}
                    handleCloseCreateAppointment={handleCloseCreateAppointment}
                    handleCloseUpdateAppointment={() =>
                      setOpenUpdateAppointment(false)
                    }
                  />
                </Box>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;

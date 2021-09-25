import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios'



const CustomerList = () => {
  const [customerData, setcustomerData] = useState([])
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [website, setWebsite] = React.useState("");



  const columns = [
    { field: 'id', headerName: 'id' },
    { field: 'name', headerName: 'Name', width: 200, editable: true },
    { field: 'username', headerName: 'Username', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 210, editable: true },
    { field: 'phone', headerName: 'Phone No.', width: 180, editable: true },
    { field: 'website', headerName: 'Website', width: 150, editable: true },
    {
      field: "action",
      headerName: "Action",
      width: 250,

      renderCell: (id) => (
        <>
          {/* <Button
            style={{
              backgroundColor: "#ffcc00",
              marginRight: 40,
              padding: "3px 35px"
            }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Edit
          </Button> */}

          <Button
            style={{
              backgroundColor: "#e8605d",
              padding: "3px 35px"
            }}
            onClick={() => handleDelete(id)}
            variant="contained"
            color="primary"
            type="submit"
          >
            Delete
          </Button>
        </>
      )
    }
  ];

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {

    const response = await axios.get('https://jsonplaceholder.typicode.com/users')
    setcustomerData(response.data)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    const list = [...customerData];
    list.splice(id, 1);
    setcustomerData(list);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.value);
    const newCustomer = {
      id: Math.floor(Math.random()* 999),
      name: name,
      username: username,
      email: email,
      phone: phone,
      website: website,
    };
    setcustomerData([...customerData, newCustomer]);
    console.log(`user data is ${newCustomer}`);
    console.log(customerData);
  };


  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item md={8}></Grid>

        <Grid item md={4}>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            color="primary"
            type="submit"
          >
            Add New Customer
          </Button>

          <Dialog
            disableBackdropClick
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add New Customer</DialogTitle>
            <form noValidate onSubmit={handleSubmit}>
              <DialogContent>
                <TextField
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Name"
                  type="text"
                  fullWidth
                  required
                />
                <TextField
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoFocus
                  margin="dense"
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  required
                />
                <TextField
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  margin="dense"
                  id="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  required
                />
                <TextField
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  margin="dense"
                  id="phone"
                  label="Phone No."
                  type="number"
                  fullWidth
                  required
                />
                <TextField
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                  margin="dense"
                  id="website"
                  label="Website"
                  type="text"
                  fullWidth
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleClose} color="primary" type="submit">
                  Add
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </Grid>
      <div style={{ height: 450, width: '100%' }}>
        <DataGrid
          rows={customerData}
          columns={columns}
          pageSize={6}
          checkboxSelection={false}
          disableSelectionOnClick={true}
        />
      </div>
    </>
  );
};
export default CustomerList;
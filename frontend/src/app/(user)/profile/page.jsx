'use client'

import OrderCard from "@/components/user/order-card";
import { getOrderByUserId } from "@/service/axios/end-points";
import { Avatar, Box, Card, CardContent, Grid, Tab, Tabs, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("zr_token");
      if (token) {
        const decoded = jwtDecode(token);
        const response = await getOrderByUserId(decoded?.id);
        if (response?.success) {
          setUser(response?.user);
          setOrders(response?.order || []);
        }
      }
    };

    fetchUserData();
  }, []);

  console.log(orders,"ejlo")
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  const StyledTab = styled(Tab)(({ theme }) => ({
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: 'bold',


    },
  }));

  return (
    <Box className="container mx-auto px-4 py-8">
      <Card className="mb-8 shadow-lg bg-black border-2 text-white border-white">
        <CardContent>
          <Grid container spacing={4}  alignItems="center">
            <Grid item xs={12} md={3}>
              <Avatar
                src={user?.avatar}
                alt={user?.name}
                sx={{ width: 120, height: 120, margin: 'auto' }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h4" className="mb-2">{user?.name}</Typography>
              <Typography variant="body1" color="" style={{color:'gray'}} className="mb-2">{user?.email}</Typography>
              <Typography variant="body2">Member since: {new Date(user?.createdAt).toLocaleDateString()}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onChange={handleTabChange} className="mb-4">
        <StyledTab style={{color:'gray'}} label="Profile" />
        <StyledTab style={{color:'gray'}} label="Order History" />
      </Tabs>

      {activeTab === 0 && (
        <Card className="shadow-lg bg-gray-700 text-white">
          <CardContent>
            <Typography variant="h6" className="mb-4">Profile Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Name:</strong> {user?.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Role:</strong> {user?.role}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Account Status:</strong> {user?.isDeleted ? 'Inactive' : 'Active'}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {activeTab === 1 && (
        <Box className=''>
          <Typography variant="h6" className="mb-4">Order History</Typography>
          {orders.map((order) => (
            <OrderCard key={order?._id} order={order} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
import React from "react";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";
import { useEffect } from "react";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";

const ZOHO = window.ZOHO;

const CustomHeader = ({ individual_data }) => {
// Function to generate an array of the last `n` dates in 'dd-MM-yyyy' format
function getLastNDays(n) {
  const result = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = date
      .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
      .replace(/\//g, '-');
    result.push(formattedDate);
  }
  return result;
}

// Generate the last 3 days
const last3Days = getLastNDays(3);

// Initialize a map to store totals for each day
const totalsMap = new Map(last3Days.map((date) => [date, { Date: date, totalBillableHours: 0.0, totalNonBillableHours: 0.0, totalFixedPriceHours: 0.0 }]));

// Update each day's totals based on the sample data
individual_data.forEach((item) => {
  const itemDate = new Date(item.Start_End)
    .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
    .replace(/\//g, '-');

  const totals = totalsMap.get(itemDate);

  if (totals) {
    if (item.Billable === 'Billable') {
      totals.totalBillableHours += item.Hours_Logged;
    } else if (item.Billable === 'Non-Billable') {
      totals.totalNonBillableHours += item.Hours_Logged;
    } else if (item.Billable === 'Fixed-Price') {
      totals.totalFixedPriceHours += item.Hours_Logged;
    }
  }
});

// Manually convert the map values to an array and format results
const dailyTotals = [];
totalsMap.forEach((day) => {
  dailyTotals.push({
    Date: day.Date,
    totalBillableHours: day.totalBillableHours.toFixed(2),
    totalNonBillableHours: day.totalNonBillableHours.toFixed(2),
    totalFixedPriceHours: day.totalFixedPriceHours.toFixed(2),
  });
});
  console.log({ dailyTotals });
  return (
    <Box>
        <Typography variant="h4" textAlign={'left'} sx={{color:'rgba(0, 0, 0, 0.87)',mt:3,fontWeight:400}}>Last 3 days record </Typography>
        <Box>
          <Grid container columns={12} columnSpacing={2} p={2} px={0}>
            <Grid item xs={4}>
              <Box bgcolor={"#F6FAFD"} p={2} borderRadius={3}>
                <Grid container columns={12}>
                  <Grid item xs={12}>
                    <Grid container columns={2} columnSpacing={2}>
                      <Grid item xs={1}>
                        <Box display={"flex"}>
                          <DateRangeOutlinedIcon />
                          <Typography
                            display={"inline-block"}
                            fontWeight={"bold"}
                            variant="p"
                            fontSize={"large"}
                            ml={1}
                          >
                            {dailyTotals[0].Date}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box display={"flex"} ml={5}>
                          <TimerOutlinedIcon sx={{ color: "#626465" }} />
                          <Typography
                            display={"inline-block"}
                            variant="p"
                            fontSize={"large"}
                            fontWeight={500}
                            color={"#626465"}
                            ml={1}
                          >
                            100.00 Hr
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container columns={3} columnSpacing={2}>
                      <Grid item xs={1} p={1.5}>
                        <Box
                          bgcolor={"white"}
                          borderRadius={"8px"}
                          p={1}
                          width={"100%"}
                        >
                          <Typography textAlign={"center"} fontSize={"12px"}>
                            Billable
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            fontSize={"large"}
                            fontWeight={600}
                          >
                            {dailyTotals[0].totalBillableHours} hr
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1} p={1.5}>
                        <Box
                          bgcolor={"white"}
                          borderRadius={"8px"}
                          p={1}
                          width={"100%"}
                        >
                          <Typography textAlign={"center"} fontSize={"12px"}>
                            Non Billable
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            fontSize={"large"}
                            fontWeight={600}
                          >
                            {dailyTotals[0].totalNonBillableHours} hr
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1} p={1.5}>
                        <Box
                          bgcolor={"white"}
                          borderRadius={"8px"}
                          p={1}
                          width={"100%"}
                        >
                          <Typography textAlign={"center"} fontSize={"12px"}>
                            Fixed Price
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            fontSize={"large"}
                            fontWeight={600}
                          >
                            {dailyTotals[0].totalFixedPriceHours} hr
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box bgcolor={"#FBF7FC"} p={2} borderRadius={3}>
                <Grid container columns={12}>
                  <Grid item xs={12}>
                    <Grid container columns={2} columnSpacing={2}>
                      <Grid item xs={1}>
                        <Box display={"flex"}>
                          <DateRangeOutlinedIcon />
                          <Typography
                            display={"inline-block"}
                            fontWeight={"bold"}
                            variant="p"
                            fontSize={"large"}
                            ml={1}
                          >
                            {dailyTotals[1].Date}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box display={"flex"} ml={5}>
                          <TimerOutlinedIcon sx={{ color: "#626465" }} />
                          <Typography
                            display={"inline-block"}
                            variant="p"
                            fontSize={"large"}
                            fontWeight={500}
                            color={"#626465"}
                            ml={1}
                          >
                            100.00 Hr
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container columns={3} columnSpacing={2}>
                      <Grid item xs={1} p={1.5}>
                        <Box
                          bgcolor={"white"}
                          borderRadius={"8px"}
                          p={1}
                          width={"100%"}
                        >
                          <Typography textAlign={"center"} fontSize={"12px"}>
                            Billable
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            fontSize={"large"}
                            fontWeight={600}
                          >
                            {dailyTotals[1].totalBillableHours} hr
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1} p={1.5}>
                        <Box
                          bgcolor={"white"}
                          borderRadius={"8px"}
                          p={1}
                          width={"100%"}
                        >
                          <Typography textAlign={"center"} fontSize={"12px"}>
                            Non Billable
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            fontSize={"large"}
                            fontWeight={600}
                          >
                            {dailyTotals[1].totalNonBillableHours} hr
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1} p={1.5}>
                        <Box
                          bgcolor={"white"}
                          borderRadius={"8px"}
                          p={1}
                          width={"100%"}
                        >
                          <Typography textAlign={"center"} fontSize={"12px"}>
                            Fixed Price
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            fontSize={"large"}
                            fontWeight={600}
                          >
                            {dailyTotals[1].totalFixedPriceHours} hr
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box bgcolor={"#FEF9F5"} p={2} borderRadius={3}>
                <Grid container columns={12}>
                  <Grid item xs={12}>
                    <Grid container columns={2} columnSpacing={2}>
                      <Grid item xs={1}>
                        <Box display={"flex"}>
                          <DateRangeOutlinedIcon />
                          <Typography
                            display={"inline-block"}
                            fontWeight={"bold"}
                            variant="p"
                            fontSize={"large"}
                            ml={1}
                          >
                            {dailyTotals[1].Date}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1}>
                        <Box display={"flex"} ml={5}>
                          <TimerOutlinedIcon sx={{ color: "#626465" }} />
                          <Typography
                            display={"inline-block"}
                            variant="p"
                            fontSize={"large"}
                            fontWeight={500}
                            color={"#626465"}
                            ml={1}
                          >
                            100.00 Hr
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container columns={3} columnSpacing={2}>
                      <Grid item xs={1} p={1.5}>
                        <Box
                          bgcolor={"white"}
                          borderRadius={"8px"}
                          p={1}
                          width={"100%"}
                        >
                          <Typography textAlign={"center"} fontSize={"12px"}>
                            Billable
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            fontSize={"large"}
                            fontWeight={600}
                          >
                            {dailyTotals[1].totalBillableHours} hr
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1} p={1.5}>
                        <Box
                          bgcolor={"white"}
                          borderRadius={"8px"}
                          p={1}
                          width={"100%"}
                        >
                          <Typography textAlign={"center"} fontSize={"12px"}>
                            Non Billable
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            fontSize={"large"}
                            fontWeight={600}
                          >
                            {dailyTotals[1].totalNonBillableHours} hr
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={1} p={1.5}>
                        <Box
                          bgcolor={"white"}
                          borderRadius={"8px"}
                          p={1}
                          width={"100%"}
                        >
                          <Typography textAlign={"center"} fontSize={"12px"}>
                            Fixed Price
                          </Typography>
                          <Typography
                            textAlign={"center"}
                            fontSize={"large"}
                            fontWeight={600}
                          >
                            {dailyTotals[1].totalFixedPriceHours} hr
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
    </Box>
  );
};

export default CustomHeader;

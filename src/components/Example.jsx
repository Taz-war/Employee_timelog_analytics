import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  Container,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import employeeData from "../data/EmployeeData.json";

const data = [
  { day: "Su", hours: 1.3 },
  { day: "Mo", hours: 2.4 },
  { day: "Tu", hours: 5.1 },
  { day: "We", hours: 6 },
  { day: "Th", hours: 0.51 },
  { day: "Fr", hours: 2.5 },
  { day: "Sa", hours: 1.5 },
];

const Example = ({processedArray}) => {
  return (
    <Box>
      <Typography variant="h4" textAlign={'left'} sx={{color:'rgba(0, 0, 0, 0.87)',m:3,ml:1,fontWeight:400}}>Last 7days overview</Typography>
      <Grid container columns={12} spacing={2}>
        {processedArray.map((logData, index) => (
          
          <Grid key={index} item xs={2}>
            <Card sx={{ width: "100%", height: 350, bgcolor: "#fafafa" }}>
              <CardContent>
                <Grid container spacing={2} columns={12}>
                  <Grid
                    item
                    xs={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Box
                      borderRadius={"8px"}
                      p={0}
                      width={"100%"}
                      textAlign={'center'}
                      justifyItems={'center'}
                      mt={1}
                    >
                      <Avatar
                        src="avatar_url"
                        alt="Rakibul Hasan"
                        sx={{ width: 30, height: 30 }}
                      />
                      <Typography variant="body2"  fontSize={"small"} mt={1}>{logData.name.split(' ')[0]}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={10}>
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
                            {logData.totalBillableHours.toFixed(2)}
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
                            {logData.totalNonBillableHours.toFixed(2)}
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
                            {logData.totalFixedPriceHours.toFixed(2)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Box sx={{ width: "100%", height: 200, mt: 2 }}>
                  <ResponsiveContainer>
                    <BarChart data={logData.last7DaysHours}>
                      <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={{ stroke: "#ccc" }}
                      />
                      <YAxis
                        dataKey={"hours"}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Bar dataKey="hours" fill="#42A5F5" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Example;

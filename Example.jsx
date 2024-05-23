import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
  CircularProgress,
  Stack,
  Skeleton,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  Legend,
} from "recharts";

const renderCustomizedLabel = (props) => {
  const { x, y, width, value, index, data } = props;

  // Define your conditions
  const isFridayOrSaturday =
    data[index].day === "Fr" || data[index].day === "Sa";
  const totalHours = data[index].totalHours;

  const condition_1 = !isFridayOrSaturday && totalHours > 5.5;
  const condition_1_reverse = isFridayOrSaturday && totalHours > 4;
  const condition_2 = !isFridayOrSaturday && totalHours < 4.125;
  const condition_2_reverse = isFridayOrSaturday && totalHours < 3;

  let fillColor = "#42A5F5"; // Default color
  if (condition_1 || condition_1_reverse) fillColor = "#008631";
  if (condition_2 || condition_2_reverse) fillColor = "#FF0000";

  // Only render label if the conditions are met and the day is not "Su"
  if (
    (condition_1 ||
      condition_2 ||
      condition_1_reverse ||
      condition_2_reverse) &&
    data[index].day !== "Su"
  ) {
    const trianglePath = `M${x + width / 2},${y - 10} l5,10 h-10 Z`; // Path for upside-down triangle

    return (
      <g>
        <path d={trianglePath} fill={fillColor} />
      </g>
    );
  }
  return null;
};

const Example = ({ processedArray, loader }) => {
  const predefinedOrder = [
    "Emranul Hassan",
    "Raihan Rayhan",
    "Rahul Sikdar Pranto",
    "Tanveerul Hoque",
    "Rakibul Hasan Polash",
    "Al Rashid Towmir",
    "Redwanul Hoque Shakil Sikder",
    "Mahadi Hasan",
    "Asif Uddin",
    "IH Shawon",
    "Nasir Uddin",
    "shezan Mahbub",
    "Syed Fahim Tazwer Fahim Tazwen",
  ];

  const sortData = (processedArray, order) => {
    const orderMap = new Map();
    order.forEach((name, index) => {
      orderMap.set(name, index);
    });

    return processedArray.sort((a, b) => {
      const aIndex = orderMap.has(a.name) ? orderMap.get(a.name) : Infinity;
      const bIndex = orderMap.has(b.name) ? orderMap.get(b.name) : Infinity;
      return aIndex - bIndex;
    });
  };

  const sortedData = sortData(processedArray, predefinedOrder);
  console.log({ processedArray });
  const handleAvatar = (name) => {
    switch (name) {
      case "Insta Web Works":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/a2c4fdf1-17e3-58c1-cff3-301003e49551.png";
      case "Rakibul Hasan Polash":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/6f895b59-187c-bd67-2f30-7dc2e052f2db.png";
      case "Syed Fahim Tazwer Fahim Tazwen":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/96af319d-eb32-e795-c2f0-7508ac0e64d4.png";
      case "Redwanul Hoque Shakil Sikder":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/411c22dd-e264-4a84-5dbd-a18d51bf56e0.png";
      case "Tanveerul Hoque":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/4bd4deee-f8f1-9a1a-6538-d2c275d0c812.png";
      case "Rahul Sikdar Pranto":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/60afe94b-57fe-a1f8-a212-eaa5212ab358.png";
      case "shezan Mahbub":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/363cb833-28c1-ddfa-2b8c-0d88ace5781f.png";
      case "Emranul Hassan":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/0e524eb8-ca0f-331c-89b1-4644f0f400cd.png";
      case "Nasir Uddin":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/58d03ca5-3784-78d8-5312-a6f0e0390451.png";
      case "IH Shawon":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/4c7b5798-fe4f-c842-df61-c07513bb62ed.png";
      case "Raihan Rayhan":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/4f6fc97d-048a-43df-8f36-91e25a02c55f.png";
      case "Al Rashid Towmir":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/0b28be7b-4bdd-850b-f87f-5f4fc6ae29c2.png";
      case "Mahadi Hasan":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/6008ef43-73df-5f3b-808a-48b45a18aaa8.png";
      case "Asif Uddin":
        return "https://mcusercontent.com/67ebf8e98e3d903ea9457f547/images/d227d005-2047-809d-020b-1c35e06d83fe.png";
      default:
        return "";
    }
  };

  return (
    <Box>
      {loader ? (
        <>
          <CircularProgress size={"large"} />
          <Grid container columns={12} spacing={2}>
            {Array.from({ length: 14 }).map((_, index) => (
              <Grid key={index} item xs={2}>
                <Stack key={index} spacing={1}>
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={210} height={60} />
                  <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Box>
          <Box display={"flex"} justifyContent={'space-evenly'} mb={2}>
            <Box display={"flex"} width={"30%"} textAlign={'center'}>
              <Box height={"20px"} width={"40px"} bgcolor={"#2A5D78"}></Box>
              <Typography variant="p" ml={2}>Billable Hours</Typography>
            </Box>
            <Box display={"flex"} width={"30%"}>
              <Box height={"20px"} width={"40px"} bgcolor={"#9FDEF0"}></Box>
              <Typography variant="p" ml={2}>NonBillable Hours</Typography>
            </Box>
            <Box display={"flex"} width={"30%"}>
              <Box height={"20px"} width={"40px"} bgcolor={"#F6AA54"}></Box>
              <Typography variant="p" ml={2}>Fixed Price Hours</Typography>
            </Box>
          </Box>
          <Grid container columns={12} spacing={2}>
            {sortedData.map((logData, index) => (
              <Grid key={index} item xs={4} sm={4} md={3} lg={2}>
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
                          textAlign={"center"}
                          justifyItems={"center"}
                          mt={1}
                        >
                          <Avatar
                            src={handleAvatar(logData.name)}
                            alt="Rakibul Hasan"
                            sx={{ width: 30, height: 30 }}
                          />
                          <Typography variant="body2" fontSize={"small"} mt={1}>
                            {logData.name.split(" ")[0]}
                          </Typography>
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
                              <Typography
                                textAlign={"center"}
                                fontSize={"12px"}
                              >
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
                              <Typography
                                textAlign={"center"}
                                fontSize={"12px"}
                              >
                                Non
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
                              <Typography
                                textAlign={"center"}
                                fontSize={"12px"}
                              >
                                Fixed
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
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 10]}
                          />
                          <Tooltip />
                          {/* <Legend /> */}
                          <Bar
                            dataKey="billableHours"
                            stackId="a"
                            fill="#2A5D78"
                          />
                          <Bar
                            dataKey="nonBillableHours"
                            stackId="a"
                            fill="#9FDEF0"
                          />
                          <Bar
                            dataKey="fixedPriceHours"
                            stackId="a"
                            fill="#F6AA54"
                          >
                            <LabelList
                              dataKey="day"
                              content={(props) =>
                                renderCustomizedLabel({
                                  ...props,
                                  data: logData.last7DaysHours,
                                })
                              }
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Example;

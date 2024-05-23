import logo from "./logo.svg";
import "./App.css";
import { Box, Container } from "@mui/material";
import CustomHeader from "./components/CustomHeader";
import UserProfileCard from "./components/UserProfileCard";
import Example from "./components/Example";
import { useState, useEffect } from "react";
import axios from "axios";
// import employeeData from "../src/data/EmployeeData.json";

function App() {
  const [initialized, setInitialized] = useState(false); // initialize the widget
  const [employeeData, setEmployeeData] = useState([]);
  const [individual_data, set_individual_data] = useState([]);
  const [processedArray, setProcessedArray] = useState([]);
  const [loader, setLoader] = useState(false);
  const temp = [];

  useEffect(() => {
    setLoader(true);
    // initialize the app
    axios
      .get("https://utility.v1.easy-pluginz.com/api/gettimelog")
      .then((response) => {
        const timeSheetsData = response.data.data;
        timeSheetsData.map((item) =>
          temp.push({
            Assignee: item.Assignee,
            Billable: item.Billable,
            Start_End: item.Start_Time,
            End_Time: item.End_Time,
            Hours_Logged: item.Hours_Logged1,
          })
        );
        // Process the data
        const processedData = groupAndCalculateHours(temp);

        const processedArray1 = Object.entries(processedData).map(
          ([name, data]) => ({
            name,
            ...data,
          })
        );

        setProcessedArray(processedArray1);

        set_individual_data(temp);
        setEmployeeData(timeSheetsData);
        // console.log({ timeSheetsData });
        setInitialized(true);
        setLoader(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });

  }, []);

  // Function to get the last 7 days with short day names
  function getLast7DaysShortNamesAndDates() {
    const today = new Date();
    const optionsShort = { weekday: "short" };
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      const shortDayName = new Intl.DateTimeFormat("en-US", optionsShort)
        .format(pastDate)
        .slice(0, 2);
      const dateString = pastDate.toISOString().split("T")[0];
      last7Days.push({ shortDayName, dateString });
    }
    return last7Days;
  }

  function groupAndCalculateHours(data) {
    const groupedData = {};

    // Group data by assignee
    data.forEach((item) => {
      const assignee = item.Assignee;
      const billableType = item.Billable || "Unknown";
      const date = item.Start_End; // Ensure this field matches your JSON
      const hours = item.Hours_Logged || 0;

      if (!groupedData[assignee]) {
        groupedData[assignee] = {
          totalBillableHours: 0,
          totalNonBillableHours: 0,
          totalFixedPriceHours: 0,
          last7DaysHours: [],
          dateWiseHours: {},
        };
      }

      // Categorize hours by Billable/Non-Billable/Fixed-Price
      if (billableType === "Billable") {
        groupedData[assignee].totalBillableHours += hours;
      } else if (billableType === "Non-Billable") {
        groupedData[assignee].totalNonBillableHours += hours;
      } else if (billableType === "Fixed-Price") {
        groupedData[assignee].totalFixedPriceHours += hours;
      }

      // Update date-wise total hours
      if (date) {
        if (!groupedData[assignee].dateWiseHours[date]) {
          groupedData[assignee].dateWiseHours[date] = {
            totalHours: 0,
            billableHours: 0,
            nonBillableHours: 0,
            fixedPriceHours: 0,
          };
        }
        groupedData[assignee].dateWiseHours[date].totalHours += hours;

        if (billableType === "Billable") {
          groupedData[assignee].dateWiseHours[date].billableHours += hours;
        } else if (billableType === "Non-Billable") {
          groupedData[assignee].dateWiseHours[date].nonBillableHours += hours;
        } else if (billableType === "Fixed-Price") {
          groupedData[assignee].dateWiseHours[date].fixedPriceHours += hours;
        }
      }
    });

    // Get last 7 days with short day names
    const last7Days = getLast7DaysShortNamesAndDates();

    // Populate last7DaysHours with the short day names
    Object.keys(groupedData).forEach((assignee) => {
      const assigneeData = groupedData[assignee];
      assigneeData.last7DaysHours = last7Days.map(
        ({ shortDayName, dateString }) => ({
          day: shortDayName,
          totalHours: assigneeData.dateWiseHours[dateString]?.totalHours.toFixed(2) || 0.0,
          billableHours: assigneeData.dateWiseHours[dateString]?.billableHours.toFixed(2) || 0.0,
          nonBillableHours: assigneeData.dateWiseHours[dateString]?.nonBillableHours.toFixed(2) || 0.0,
          fixedPriceHours: assigneeData.dateWiseHours[dateString]?.fixedPriceHours.toFixed(2) || 0.0,
        })
      );
    });

    return groupedData;
  }

  if (processedArray?.length && individual_data?.length) {
    return (
      <div className="App">
        <Container maxWidth={"100%"}>
          <CustomHeader individual_data={individual_data} />
          {/* <UserProfileCard /> */}
          <Example processedArray={processedArray} loader={loader} />
        </Container>
      </div>
    );
  } else {
    return <>Loading...</>;
  }
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Box, Container } from '@mui/material';
import CustomHeader from './components/CustomHeader';
import UserProfileCard from './components/UserProfileCard';
import Example from './components/Example';
import employeeData from "../src/data/EmployeeData.json";

function App() {
  const individual_data = [];

  employeeData.map((item)=>(
    individual_data.push({
        Assignee: item.Assignee,
        Billable:item.Billable,
        Start_End:item.Start_Time,
        End_Time:item.End_Time,
        Hours_Logged:item.Hours_Logged1
      })
  ))

// Function to get the last 7 days with short day names
function getLast7DaysShortNamesAndDates() {
  const today = new Date();
  const optionsShort = { weekday: 'short' };
  const last7Days = [];

  for (let i = 6; i >= 0; i--) {
      const pastDate = new Date(today);
      pastDate.setDate(today.getDate() - i);
      const shortDayName = new Intl.DateTimeFormat('en-US', optionsShort).format(pastDate);
      const dateString = pastDate.toISOString().split("T")[0];
      last7Days.push({ shortDayName, dateString });
  }
  console.log({last7Days})
  return last7Days;
}

function groupAndCalculateHours(data) {
  const groupedData = {};

  // Group data by assignee
  data.forEach(item => {
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
              dateWiseHours: {}
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
              groupedData[assignee].dateWiseHours[date] = 0;
          }
          groupedData[assignee].dateWiseHours[date] += hours;
      }
  });

  // Get last 7 days with short day names
  const last7Days = getLast7DaysShortNamesAndDates();

  // Populate last7DaysHours with the short day names
  Object.keys(groupedData).forEach(assignee => {
      const assigneeData = groupedData[assignee];
      assigneeData.last7DaysHours = last7Days.map(({ shortDayName, dateString }) => ({
          day: shortDayName,
          hours: assigneeData.dateWiseHours[dateString] || 0.00
      }));
  });

  return groupedData;
}



// Process the data
const processedData = groupAndCalculateHours(individual_data);

const processedArray = Object.entries(processedData).map(([name, data]) => ({
  name,
  ...data
}));


  console.log( processedArray );
  

  console.log({processedArray});
  return (
    <div className="App">
      <Container maxWidth={"100%"}>
        <CustomHeader individual_data={individual_data}/>
        {/* <UserProfileCard /> */}
        <Example processedArray={processedArray}/>
      </Container>
    </div>
  );
}

export default App;

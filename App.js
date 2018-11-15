import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";
//import { rows } from "./Utils";
import ReactTable from "react-table";
import "react-table/react-table.css";
import axios from "axios";
class App extends React.Component {
  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get("https://spring-employee.herokuapp.com/employees")
      .then(json =>
        json.data._embedded.employees.map(result => ({
          Name: result.empname,
          Skill: result.skill,
          Salary: result.salary,
          Grade: result.grade,
          City: result.city,
          Country: result.country,
          DOJ: result.doj,
          Designation: result.designation
        }))
      )
      .then(newData => this.setState({ emp_data: newData }))
      .catch(function(error) {
        console.log(error);
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      emp_data: [],
      startDate: moment()
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.date_picker = this.date_picker.bind(this);
    this.Dropdown = this.Dropdown.bind(this);
  }
  Dropdown() {
    const options = ["Manager", "Executive", "Developer"];
    const defaultOption = options[2];

    return (
      <Dropdown
        onChange={this._onSelect}
        options={options}
        value={defaultOption}
        placeholder="Select an option"
      />
    );
  }

  handleChange(event) {
    this.setState({
      startDate: event._d
    });
  }
  date_picker(cellInfo) {
    console.log();
    return (
      <DatePicker
        contentEditable
        selected={moment(
          this.state.emp_data[cellInfo.index][cellInfo.column.id],
          "DD-MM-YYYY"
        )}
        onChange={e => {
          console.log("event value====>>>", e._d);
          const data = [...this.state.emp_data];
          data[cellInfo.index][cellInfo.column.id] = e._d;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.emp_data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.emp_data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.emp_data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  render() {
    const { emp_data } = this.state;
    return (
      <div>
        <ReactTable
          data={emp_data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
          columns={[
            {
              Header: "Name",
              accessor: "Name",
              Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },

            {
              Header: "Skill",
              accessor: "Skill",
              Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "DOJ",
              accessor: "DOJ",
              Cell: this.date_picker,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "Designation",
              accessor: "Designation",
              Cell: this.Dropdown,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "Grade",
              accessor: "Grade",
              Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "Salary",
              accessor: "Salary",
              Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "City",
              accessor: "City",
              Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "Country",
              accessor: "Country",
              Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            }
          ]}
          defaultSorted={[
            {
              id: "Name",
              desc: true
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          getTdProps={() => {
            return {
              style: {
                overflow: "visible"
              }
            };
          }}
        />
      </div>
    );
  }
}
export default App;

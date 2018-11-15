import React from "react";
import ReactTable from "react-table";
//import { rows2 } from "./Utils";
import "react-table/react-table.css";
import axios from "axios";
class Department extends React.Component {
  componentDidMount() {
    this.setState({ isLoading: true });

    axios
      .get("https://spring-employee.herokuapp.com/departments")
      .then(json =>
        json.data._embedded.departments.map(result => ({
          Name: result.empname,
          DeptHead: result.depthead
        }))
      )
      .then(newData => this.setState({ dep_data: newData }))
      .catch(function(error) {
        console.log(error);
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      dep_data: []
    };
    this.renderEditable = this.renderEditable.bind(this);
    this.ClickAction = this.ClickAction.bind(this);
    this.performAction = this.performAction.bind(this);
  }
  ClickAction(cellInfo) {
    const data = [...this.state.dep_data];
    return (
      <div>
        <button
          contentEditable
          suppressContentEditableWarning
          onClick={this.performAction}
        >
          {data[cellInfo.index][cellInfo.column.id]}
        </button>
      </div>
    );
  }
  performAction() {}
  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.dep_data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.dep_data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const { dep_data } = this.state;

    return (
      <div>
        <ReactTable
          data={dep_data}
          columns={[
            {
              Header: "Department",
              accessor: "Department",
              Cell: this.ClickAction
            },
            {
              Header: "DeptHead",
              accessor: "DeptHead",
              Cell: this.renderEditable
            }
          ]}
          defaultSorted={[
            {
              id: "DepartmentID",
              desc: true
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
      </div>
    );
  }
}
export default Department;

import React, { Component } from "react";
import { Accordion, Table } from "react-bootstrap";
export default class AlertList extends Component {
  getItems() {
    var items = [];
    if (this.props.data.length < 1) {
      return (
        <div className="text-very-small my-3 text-center">
          No alerts yet. Any new alerts will appear here.
        </div>
      );
    }
    for (let index = 0; index < this.props.data.length; index++) {
      const element = this.props.data[index];
      items.push(
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header>
            IP: {element.ip_address}
            <div className="text-small text-muted text-end px-3">
              {new Date(parseInt(element.created_at)).toLocaleString()}
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th>Useragent</th>
                  <td>{element.useragent}</td>
                </tr>
                <tr>
                  <th>ISP</th>
                  <td>{element.isp}</td>
                </tr>
                <tr>
                  <th>Country</th>
                  <td>
                    {element.country}{" "}
                    <img
                      className="mx-2"
                      src={element.country_flag}
                      width="24px"
                    ></img>
                  </td>
                </tr>
                <tr>
                  <th>Region</th>
                  <td>{element.region}</td>
                </tr>
                <tr>
                  <th>City</th>
                  <td>{element.city}</td>
                </tr>
                <tr>
                  <th>Coordinates</th>
                  <td>{element.coordinates}</td>
                </tr>
                <tr>
                  <th>Zip Code</th>
                  <td>{element.zip_code}</td>
                </tr>
              </tbody>
            </Table>
            <div className="text-very-small">
              The accuracy of Location Data is not Guarenteed and is approximate
              in most cases.
            </div>
          </Accordion.Body>
        </Accordion.Item>
      );
    }
    return items;
  }
  render() {
    return <Accordion defaultActiveKey="0">{this.getItems()}</Accordion>;
  }
}

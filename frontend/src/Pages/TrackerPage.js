import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import AlertList from "../Components/AlertList";
import FAQ from "../Components/FAQ";
import { getTrackerDetails } from "../services";
import Constants from "../Constants";

const TrackerPage = () => {
  const [tracker, setTracker] = useState();
  const { key } = useParams();
  const htmldownloadLink =
    Constants.BACKEND_URL + Constants.DOWNLOAD_HTML_TRACKER + key;

  const pdfdownloadLink = 
    Constants.BACKEND_URL + Constants.DOWNLOAD_PDF_TRACKER + key;

  useEffect(() => {
    const api = async () => {
      try {
        const data = await getTrackerDetails(key);
        setTracker(data);
      } catch (error) {
        setTracker(false);
        console.error(error);
      }
    };

    if (key) {
      api();
    }
  }, [key]);

  return (
    <>
      {tracker === undefined && (
        <Container className="text-center p-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      )}

      {tracker === false && (
        <Container>
          <div className="text-muted mt-5 text-center">
            No Tracker Found with the given Tracker Id.
          </div>
        </Container>
      )}

      {tracker && (
        <Container className="p-4 ">
          <h1 className="p-4 text-center">Tracker Dashboard</h1>
          <Row>
            <Col>
              <h5 className="text-center ">Tracker Details</h5>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>Id</td>
                    <td>{key}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>{tracker.info.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>
                    <span>{tracker.info.email} </span>
                      {tracker.info.is_email_verified ? (
                        <Badge bg="success">Verified</Badge>
                      ) : (
                        <Badge bg="warning">Verification Pending</Badge>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Creation Date</td>
                    <td>
                      {new Date(
                        parseInt(tracker.info.created_at)
                      ).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td>Secret Link</td>
                    <td>
                      {window.location.toString()}{" "}
                      <div className="text-muted text-very-small">
                        (Save this URL to access this Tracker Later)
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <div className="p-3">
                <h5 className="text-center">Downloads</h5>
                <div className="text-very-small p-2">
                  Download the tracker and mix it with your important files with
                  an eye-catchy file name like "My Passwords.html".
                </div>

                <a
                  href={htmldownloadLink}
                  className="d-block w-100 my-2 text-center"
                >
                  <Button className="btn-success">
                    Download Tracker in HTML Format
                  </Button>
                </a>
                <a
                  href={pdfdownloadLink}
                  className="d-block w-100 my-2 text-center"
                >
                  <Button className="btn-success">
                    Download Tracker in PDF Format
                  </Button>
                </a>
              </div>
            </Col>
            <Col>
              <h5 className="text-center ">Alerts</h5>
              <AlertList data={tracker.alerts}></AlertList>
            </Col>
          </Row>

          <Row>
            <FAQ />
          </Row>
        </Container>
      )}
    </>
  );
};

export default TrackerPage;

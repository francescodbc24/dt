import { FormikValues } from "formik";
import { FunctionComponent, useEffect, useState } from "react";
import { Badge, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { RequestResult, url_service } from "../../api/analyse.api";
import RequestComponent from "../components/RequestComponent";
import AppForm from "../components/forms/AppForm";
import AppFormSelect from "../components/forms/AppFormSelect";
import AppFormSubmit from "../components/forms/AppFormSubmit";
import AppFormText from "../components/forms/AppFormText";
import Loader from "../components/loader/Loader";
import ResponseComponent from "./../components/ResponseComponent";
import CardSwipe from "../components/card-swipe/CardSwipe";

const urlSchema = Yup.string().required().max(1000, "The url is too long.");

const validationSchema = Yup.object().shape({
  url: urlSchema,
});
interface HomePageProps {}

interface IState {
  data: RequestResult;
  loading: boolean;
}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const [state, setState] = useState<IState>({} as IState);
  const navigate = useNavigate();

  let { code } = useParams();
  const methods = ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"];
  const message: any = {
    200: "Great,Everything's fine",
    201: "Congratulations! Your request has successfully manifested into existence.",
    204: "No content here, just like my weekend plans..",
    400: "Your request is like a bad joke – nobody gets it.",
    401: "Access denied: even the server doesn't trust you.",
    404: "not found. Story of my life",
    405: "Nope, not that method!",
    429: "The server needs a breather from all your requests.",
    500: "Something went wrong, and now the server is contemplating its life choices",
  };

  const handleAnalyseUrl = async (values: FormikValues) => {
    try {
      setState({ ...state, loading: true });
      await url_service.setCsfr();
      const test = await url_service.post({
        url: values.url,
        method: values.method,
      });
      console.log(test);

      setState({ ...state, data: test.data, loading: false });
    } catch (ex: any) {
      setState({ ...state, loading: false });
      console.log(ex.error);
      alert(ex.error);
    }
  };

  const handleShareCode = async (code: string) => {
    try {
      setState({ ...state, loading: true });
      //const data = await url_service.get("2AEVU0J0T8");
      const data = await url_service.get(code);
      setState({ ...state, data: data.data, loading: false });
      console.log(data);
    } catch (ex: any) {
      setState({ ...state, loading: false });
      alert(ex.error);
    }
  };

  const handleShareLink = (code: string) => {
    navigate("/" + code);
  };

  useEffect(() => {
    if (code) {
      handleShareCode(code);
    }
  }, [code]);


  const disabled = code != undefined ? true : false;
  console.log("Render");
  return (
    <>
      <Container className="pb-2">
        <Loader loading={state.loading} />
        <Row className="justify-content-center text-center">
          <Col md={12} lg={12} xs={12}>
            {state.data && (
              <>
                <h1>{state.data?.status_code}</h1>
                <span>{message[state.data.status_code]}</span>
              </>
            )}
          </Col>
        </Row>
        <Row className="m-2 justify-content-center">
          <Col md={8} lg={8} xs={12}>
            <Card style={{ backgroundColor: "whitesmoke" }}>
              <AppForm
                validationSchema={validationSchema}
                initialValues={{
                  url: state.data?.url,
                  method: state.data?.method ? state.data?.method : "GET",
                }}
                onSubmit={handleAnalyseUrl}
              >
                <div className="d-flex flex-row justify-content-around text-center">
                  <div className="flex-grow-2">
                    <AppFormSelect
                      readOnly={disabled}
                      name="method"
                      options={methods}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <AppFormText
                      readOnly={disabled}
                      name="url"
                      placeholder="Write an url..."
                    />
                  </div>
                  <div>{!code && <AppFormSubmit />}</div>
                </div>
              </AppForm>
            </Card>
          </Col>
        </Row>
        <Row className="m-2-xs">
          <Col lg={4}>
            {state.data && (
              <RequestComponent
                domain={state.data.domain}
                scheme={state.data.scheme}
                path={state.data.path}
              />
            )}
          </Col>
          <Col lg={8}>
            <Row>
              {state.data &&
                state.data.responses &&
                state.data.responses.map((item, index) => (
                  <Col
                    xs={12}
                    sm={12}
                    md={6}
                    className="mb-1"
                    key={"response" + index}
                  >
                    <ResponseComponent
                      http_version={`${item.http_version} ${item.status_code} ${item.reason}`}
                      date={item.date}
                      location={item.location}
                      server={item.server}
                    />
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
        {state.data && (
          <Row className="justify-content-center text-center">
            <Col>
              <h2>Shared</h2>
              <h2>
                <Badge
                  className="pe-auto"
                  onClick={() => handleShareLink(state.data?.share)}
                >
                  {" "}
                  {window.location.origin + "/" + state.data?.share}
                </Badge>
              </h2>
            </Col>
          </Row>
        )}
        <br />
      </Container>
      <CardSwipe
        page_load={state.data?.page_load}
        first_iteraction={state.data?.first_iteration}
      />
    </>
  );
};

export default HomePage;

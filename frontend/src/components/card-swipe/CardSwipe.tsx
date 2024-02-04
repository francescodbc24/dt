import { FunctionComponent, useState } from "react";
import "./styles.scss";
import GaugeComponent from "react-gauge-component";
import { Col, Row } from "react-bootstrap";
import { useSwipeable } from "react-swipeable";
interface CardSwipeProps {
  page_load?: number;
  first_iteraction?: number;
}

const CardSwipe: FunctionComponent<CardSwipeProps> = ({
  page_load = 0,
  first_iteraction = 0,
}) => {
  const config = {
    delta: 1, // min distance(px) before a swipe starts.
    preventScrollOnSwipe: true, // prevents scroll during swipe
    trackTouch: true, // track touch input
    trackMouse: true, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms).
    touchEventOptions: { passive: true }, // options for touch listeners
  };
  const [position, setPosition] = useState<number>(3);
  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      setPosition((prev) => {
        if (eventData.dir == "Up") {
          return 80;
        } else if ((eventData.dir == "Down")) {
          return 3;
        }
        return prev;
      });
    },

    ...config,
  });
  //console.log("position", position);
  return (
    <div
      {...handlers}
      style={{ height: position + "vh" }}
      className="drawer d-block d-sm-none"
    >
      <div className="d-flex justify-content-center text-center">
        <div className="box"></div>
      </div>
      <Row className="d-flex flex-row justify-content-center text-center">
        <h1>Time Analysis</h1>
        <hr />
        <Col lg={6}>
          <h4>Page load</h4>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              subArcs: [
                {
                  limit: 2.5,
                  color: "#5BE12C",
                  showTick: true,
                  tooltip: {
                    text: "Great!",
                  },
                },
                {
                  limit: 4,
                  color: "#F5CD19",
                  showTick: true,
                  tooltip: {
                    text: "Can be better!",
                  },
                },
                {
                  limit: 10,
                  color: "#EA4228",
                  showTick: true,
                  tooltip: {
                    text: "Two slow!",
                  },
                },
              ],
            }}
            pointer={{
              color: "#345243",
              length: 0.8,
              width: 15,
            }}
            labels={{
              valueLabel: { formatTextValue: (value) => value + "s" },
              tickLabels: {
                type: "outer",
                defaultTickValueConfig: {
                  formatTextValue: (value) => value.toString() + "s",
                },
                ticks: [{ value: 20 }, { value: 22.5 }, { value: 32 }],
              },
            }}
            value={page_load}
            minValue={0}
            maxValue={10}
          />
        </Col>
        <Col lg={6}>
          <h4>First Iteraction</h4>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              subArcs: [
                {
                  limit: 2.5,
                  //color: "#EA4228",
                  color: "#5BE12C",
                  showTick: true,
                  tooltip: {
                    text: "Great!",
                  },
                },
                {
                  limit: 4,
                  color: "#F5CD19",
                  showTick: true,
                  tooltip: {
                    text: "Can't be better!",
                  },
                },
                {
                  limit: 10,
                  color: "#EA4228",
                  showTick: true,
                  tooltip: {
                    text: "Two slow!",
                  },
                },
              ],
            }}
            pointer={{
              color: "#345243",
              length: 0.8,
              width: 15,
            }}
            labels={{
              valueLabel: { formatTextValue: (value) => value + "s" },
              tickLabels: {
                type: "outer",
                defaultTickValueConfig: {
                  formatTextValue: (value) => value + "s",
                },
                ticks: [{ value: 20 }, { value: 22.5 }, { value: 32 }],
              },
            }}
            value={first_iteraction}
            minValue={1}
            maxValue={10}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CardSwipe;

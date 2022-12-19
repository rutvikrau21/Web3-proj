import React from "react";
import ArcProgress from "react-arc-progress";

export default class MyArcProgress extends React.Component {
  state = {
    progress: 1.0,
    customText: [
      { text: "Connect wallet for score", size: "45px", color: "gray", x: 150, y: 141 },
      { text: "300", size: "20px", color: "gray", x: 52.5, y: 255 },
      { text: "850", size: "20px", color: "gray", x: 250, y: 255 }
    ]
  };

  render() {
    const { progress } = this.props;
    const { customText } = this.props;
    const arcFillColor =  '#f0a1d7' ;
    return (
      <>
        <ArcProgress
          thickness={20}
          fillColor={arcFillColor}
          progress={progress}
          customText={customText}
          style={{ position: "relative" }}
          size = {300}
          observer={(current) => {
            const { percentage, currentText } = current;
            console.log("observer:", percentage, currentText);
          }}
          animationEnd={({ progress, text }) => {
            console.log("animationEnd", progress, text);
          }}
        />
      </>
    );
  }
}

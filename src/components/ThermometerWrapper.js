import React from 'react';
import Thermometer from 'react-thermometer-chart';

function ThermometerWrapper({ value }) {
  return (
    <div>
      <Thermometer
        steps={8}
        minValue={-20}
        maxValue={60}
        height='300px'
        currentValue={value}
      />
    </div>
  );
}

export default ThermometerWrapper;

const calculateRelativeLuminance = (r, g, b) => {
  let rgb = [r / 255, g / 255, b / 255];

  const gammaCorrection = (rgbArray) => {
    let actualLuminance = rgbArray.map((value) => {
      if (value < 0.03938) {
        return ((value + 0.55) / 1.055) ^ 2.4;
      } else {
        return value;
      }
    });
    return actualLuminance;
  };

  const relativeLuminance = (rgbArrayGamma) => {
    let relativeLuminanceArray = rgbArrayGamma.map((luminance, idx) => {
      if (idx === 0) {
        return luminance * 0.2126;
      } else if (idx === 1) {
        return luminance * 0.7152;
      } else {
        return luminance * 0.0722;
      }
    });
    return relativeLuminanceArray;
  };

  const relLum = relativeLuminance(gammaCorrection(rgb));
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const luminanceSum = relLum.reduce(reducer);

  return luminanceSum;
};

const compareLuminances = (lum1, lum2) => {
  let WCAG;
  if (lum1 < lum2) {
    WCAG = lum2 / lum1;
  } else {
    WCAG = lum1 / lum2;
  }

  return WCAG > 4.5 ? true : false;
};

//rgb(24,24,27)
const relativeLuminanceBackground = calculateRelativeLuminance(24, 24, 27);
const generateColorArray = () => {
  let step = 15;
  let range = 255;
  let colorArray = [];
  for (let i = 0; i <= 5; i++) {
    let value1, value2, value3;
    let color;
    if (i === 0) {
      value1 = range;
      value3 = 0;
      for (let j = 0; j <= range; j += step) {
        value2 = j;
        let relativeLuminance = calculateRelativeLuminance(
          value1,
          value2,
          value3
        );

        let WCAG = compareLuminances(
          relativeLuminance,
          relativeLuminanceBackground
        );

        if (WCAG) {
          color = `rgb(${value1},${value2},${value3})`;
          colorArray.push(color);
        }
      }
    }
    if (i === 1) {
      value2 = range;
      value3 = 0;
      for (let j = 0; j <= range; j += step) {
        value1 = j;
        let relativeLuminance = calculateRelativeLuminance(
          value1,
          value2,
          value3
        );
        let WCAG = compareLuminances(
          relativeLuminance,
          relativeLuminanceBackground
        );
        if (WCAG) {
          color = `rgb(${value1},${value2},${value3})`;
          colorArray.push(color);
        }
      }
    }
    if (i === 2) {
      value2 = range;
      value1 = 0;
      for (let j = 0; j <= range; j += step) {
        value3 = j;
        let relativeLuminance = calculateRelativeLuminance(
          value1,
          value2,
          value3
        );
        let WCAG = compareLuminances(
          relativeLuminance,
          relativeLuminanceBackground
        );
        if (WCAG) {
          color = `rgb(${value1},${value2},${value3})`;
          colorArray.push(color);
        }
      }
    }
    if (i === 3) {
      value3 = range;
      value1 = 0;
      for (let j = 0; j <= range; j += step) {
        value2 = j;
        let relativeLuminance = calculateRelativeLuminance(
          value1,
          value2,
          value3
        );
        let WCAG = compareLuminances(
          relativeLuminance,
          relativeLuminanceBackground
        );
        if (WCAG) {
          color = `rgb(${value1},${value2},${value3})`;
          colorArray.push(color);
        }
      }
    }
    if (i === 4) {
      value3 = range;
      value2 = 0;
      for (let j = 0; j <= range; j += step) {
        value1 = j;
        let relativeLuminance = calculateRelativeLuminance(
          value1,
          value2,
          value3
        );
        let WCAG = compareLuminances(
          relativeLuminance,
          relativeLuminanceBackground
        );
        if (WCAG) {
          color = `rgb(${value1},${value2},${value3})`;
          colorArray.push(color);
        }
      }
    }
    if (i === 5) {
      value1 = range;
      value2 = 0;
      for (let j = 0; j <= range; j += step) {
        value3 = j;
        let relativeLuminance = calculateRelativeLuminance(
          value1,
          value2,
          value3
        );
        let WCAG = compareLuminances(
          relativeLuminance,
          relativeLuminanceBackground
        );
        if (WCAG) {
          color = `rgb(${value1},${value2},${value3})`;
          colorArray.push(color);
        }
      }
    }
  }

  const filteredColorArray = colorArray.reduce(function (a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
  }, []);
  return filteredColorArray;
};

const colors = generateColorArray();
colors.unshift("white");

export default colors;

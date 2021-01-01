
// Source: https://www.apotheken-umschau.de/Laborwerte

export const LabKeyToUnit = {
  1: "mmol/l",
  2: "mg/dl",
  3: "mg/dl",
  4: "μg/dl",
  5: "Millionen/μl",
  6: "μg/l",
  7: "μg/dl",
  8: "U/l",
  9: "Prozent",
  10: "g/dl",
  11: "mmol/molHb",
  12: "µg/l",
  13: "mg/dl",
  14: "Leu/µl",
  15: "mmol/l",
  16: "µg/l",
  17: "mmol/l",
  18: "µg/l",
  19: "ng/ml",
  20: "µg/l",
  21: "Tausend/μl",
  22: "ng/l",
  23: "µg/l",
};

export const limits = {
  1: [2.2, 2.65],
  2: [40, 1000],
  3: [0, 160],
  4: [65, 180],
  5: [4.1, 5.1],
  6: [3, 20],
  7: [3, 20],
  8: [0, 50],
  9: [38, 50],
  10: [12, 16],
  11: [0, 30],
  12: [45, 225],
  13: [0, 1.2],
  14: [74, 131],
  15: [4000, 10000],
  16: [0.7, 1.1],
  17: [135, 145],
  18: [1.0, 3.35],
  19: [0, 2.5],
  20: [2.41, 8.27],
  21: [140, 360],
  22: [200, 1000],
  23: [70, 150],
};

export const labKeyToNameMapping = {
  1: "Calcium (Kalzium)",
  2: "Cholesterin-HDL",
  3: "Cholesterin-LDL",
  4: "Eisen",
  5: "Erythrozyten",
  6: "Ferritin",
  7: "Folsäure",
  8: "Gamma-GT (GGT)",
  9: "Hämatokrit (Hk)",
  10: "Hämoglobin (Hb)",
  11: "HbA1c (Hämoglobin A1c)",
  12: "Kortisol (Cortisol)",
  13: "Kreatinin",
  14: "Kupfer (Cu)",
  15: "Leukozyten",
  16: "Magnesium (Mg)",
  17: "Natrium (Na)",
  18: "Progesteron",
  19: "Prostataspezifisches Antigen (PSA)",
  20: "Testosteron",
  21: "Thrombozyten",
  22: "Vitamin B12",
  23: "Zink",
};

export function labKeyToNameUnit(number) {
  return labKeyToNameMapping[number] + " in " + LabKeyToUnit[number];
}


// function getLookUps(){
//   labKeyToNameMapping.forEach((element) => {
//   console.log("test")
//   });
//   return "";

// }

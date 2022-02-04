module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      corp: ["Spartan", "sans-serif"],
      DEFAULT: ["Hiragino Kaku Gothic Pro", "sans-serif"]
    },
    extend: {
      colors: {
        white: "#FFF",
        black: "#000",
        gray: {
          lightest: "#B7B7B7",
          light: "#B5B5B5",
          DEFAULT: "#838383",
          dark: "#707070",
          darkest: "#3B3B3B"
        },
        blue: {
          DEFAULT: "#0A84FF"
        },
        pink: {
          DEFAULT: "#ED00C9"
        },
        button: {
          DEFAULT: "#A8A8A8"
        },
        quote: {
          DEFAULT: "#A8A8A8"
        }
      },
      fontSize: {
        "12px": "12px",
        "14px": "14px",
        "18px": "18px",
        "24px": "24px",
        "40px": "40px"
      },
      padding: {
        "6px": "6px",
        "8px": "8px",
        "16px": "16px",
        "56px": "56px"
      },
      margin: {
        "2px": "2px",
        "4px": "4px",
        "8px": "8px",
        "12px": "12px",
        "24px": "24px",
        "32px": "32px",
        "40px": "40px",
        "80px": "80px"
      },
      width: {
        "3px": "3px",
        "67px": "67px",
        "80px": "80px",
        "120px": "120px",
        "123px": "123px",
        "141px": "141px",
        "150px": "150px",
        "160px": "160px",
        "200px": "200px",
        "218px": "218px",
        "274px": "274px",
        "292px": "292px",
        "300px": "300px",
        "311px": "311px",
        "383px": "383px",
        "459px": "459px",
        "480px": "480px"
      },
      maxWidth: {
        "429px": "429px",
        "1000px": "1000px"
      },
      height: {
        "40px": "40px",
        "50px": "50px",
        "60px": "60px",
        "100px": "100px",
        "120px": "120px",
        "200px": "200px",
        "276px": "276px"
      },
      maxHeight: {
        "32px": "32px"
      },
      borderRadius: {
        "4px": "4px"
      },
      gridRowStart: {
        "8": "8",
        "9": "9",
        "10": "10",
        "11": "11",
        "12": "12",
        "13": "13",
        "14": "14",
        "15": "15",
        "16": "16",
        "17": "17",
        "18": "18",
        "19": "19"
      },
      gridRowEnd: {
        "8": "8",
        "9": "9",
        "10": "10",
        "11": "11",
        "12": "12",
        "13": "13",
        "14": "14",
        "15": "15",
        "16": "16",
        "17": "17",
        "18": "18",
        "19": "19",
        "20": "20"
      },
      gap: {
        "16px": "16px",
        "32px": "32px"
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      height: ["focus"]
    }
  },
  plugins: []
};

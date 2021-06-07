import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*,
::after,
::before {
  box-sizing: border-box;
  margin:0;
  padding:0;
}


html {
  font-size: 100%;
} /*16px*/

:root {
  /* colors */
  
  --primary-50: #e2f2ff;
  --primary-100: #b8d5fb;
  --primary-200: #8cb9f3;
  --primary-300: #609eeb;
  --primary-400: #3582e4;
  --primary-500: #1b68ca;
  --primary-600: #11519e;
  --primary-700: #083a72;
  --primary-800: #002347;
  --primary-900: #000d1d;

  /* grey */
  --grey-50: #f8fafc;
  --grey-100: #f1f5f9;
  --grey-200: #e2e8f0;
  --grey-300: #cbd5e1;
  --grey-400: #94a3b8;
  --grey-500: #64748b;
  --grey-600: #475569;
  --grey-700: #334155;
  --grey-800: #1e293b;
  --grey-900: #0f172a;
  /* rest of the colors */
  --black: #222;
  --white: #fff;
  --red-light: #fbbaba;
  --red-dark: #9e131e;
  --green-light: #b8f7bc;
  --green-dark: #0b7012;

  /* fonts  */
  --headingFont: 'Crimson Text', serif;
  --bodyFont: 'Roboto', sans-serif;
  --smallText: 0.7em;
  /* rest of the vars */
  --backgroundColor: var(--primary-50);
  --textColor: var(--primary-900);
  --borderRadius: 0.25rem;
  --letterSpacing: 1px;
  --transtion: 0.3s ease-in-out all;
  --max-width: 1120px;
  --fixed-width: 600px;

  /* box shadow*/
  --shadow-1: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  --shadow-2: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-3: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-4: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

body {
  background: var(--backgroundColor);
  font-family: var(--bodyFont);
  font-weight: 400;
  line-height: 1.75;
  color: var(--textColor);
}

p {
  margin-bottom: 1.5rem;
  max-width: 40em;
}

h1,
h2,
h3,
h4,
h5 {
  margin: 0;
  margin-bottom: 1.38rem;
  font-family: var(--headingFont);
  font-weight: 400;
  line-height: 1.3;
  text-transform: capitalize;
  letter-spacing: var(--letterSpacing);
}

h1 {
  margin-top: 0;
  font-size: 3.052rem;
}

h2 {
  font-size: 2.441rem;
}

h3 {
  font-size: 1.953rem;
}

h4 {
  font-size: 1.563rem;
}

h5 {
  font-size: 1.25rem;
}

small,
.text-small {
  font-size: var(--smallText);
}

a {
  text-decoration: none;
}
ul {
  list-style-type: none;
  padding: 0;
}
`;

export default GlobalStyles;

import React from "react";
import { useState, useEffect } from "react"; // Import useEffect
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const greenIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const redIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const GenericMap = ({ mapData}) => { // Default to an empty object if mapData is not provided
    const [filteredCountries, setFilteredCountries] = useState([]);
    // Example popularCountries with coordinates
    const popularCountries = [
        {
            "name": "Afghanistan",
            "code": "AF",
            "coordinates": [33.0, 65.0]
        },
        {
            "name": "Åland Islands",
            "code": "AX",
            "coordinates": [60.116667, 19.9]
        },
        {
            "name": "Albania",
            "code": "AL",
            "coordinates": [41.0, 20.0]
        },
        {
            "name": "Algeria",
            "code": "DZ",
            "coordinates": [28.0, 3.0]
        },
        {
            "name": "American Samoa",
            "code": "AS",
            "coordinates": [-14.33333333, -170.0]
        },
        {
            "name": "Andorra",
            "code": "AD",
            "coordinates": [42.5, 1.5]
        },
        {
            "name": "Angola",
            "code": "AO",
            "coordinates": [-12.5, 18.5]
        },
        {
            "name": "Anguilla",
            "code": "AI",
            "coordinates": [18.25, -63.16666666]
        },
        {
            "name": "Antarctica",
            "code": "AQ",
            "coordinates": [-90.0, 0.0]
        },
        {
            "name": "Antigua and Barbuda",
            "code": "AG",
            "coordinates": [17.05, -61.8]
        },
        {
            "name": "Argentina",
            "code": "AR",
            "coordinates": [-34.0, -64.0]
        },
        {
            "name": "Armenia",
            "code": "AM",
            "coordinates": [40.0, 45.0]
        },
        {
            "name": "Aruba",
            "code": "AW",
            "coordinates": [12.5, -69.96666666]
        },
        {
            "name": "Australia",
            "code": "AU",
            "coordinates": [-27.0, 133.0]
        },
        {
            "name": "Austria",
            "code": "AT",
            "coordinates": [47.33333333, 13.33333333]
        },
        {
            "name": "Azerbaijan",
            "code": "AZ",
            "coordinates": [40.5, 47.5]
        },
        {
            "name": "Bahamas",
            "code": "BS",
            "coordinates": [24.25, -76.0]
        },
        {
            "name": "Bahrain",
            "code": "BH",
            "coordinates": [26.0, 50.55]
        },
        {
            "name": "Bangladesh",
            "code": "BD",
            "coordinates": [24.0, 90.0]
        },
        {
            "name": "Barbados",
            "code": "BB",
            "coordinates": [13.16666666, -59.53333333]
        },
        {
            "name": "Belarus",
            "code": "BY",
            "coordinates": [53.0, 28.0]
        },
        {
            "name": "Belgium",
            "code": "BE",
            "coordinates": [50.83333333, 4.0]
        },
        {
            "name": "Belize",
            "code": "BZ",
            "coordinates": [17.25, -88.75]
        },
        {
            "name": "Benin",
            "code": "BJ",
            "coordinates": [9.5, 2.25]
        },
        {
            "name": "Bermuda",
            "code": "BM",
            "coordinates": [32.33333333, -64.75]
        },
        {
            "name": "Bhutan",
            "code": "BT",
            "coordinates": [27.5, 90.5]
        },
        {
            "name": "Bolivia",
            "code": "BO",
            "coordinates": [-17.0, -65.0]
        },
        {
            "name": "Bosnia and Herzegovina",
            "code": "BA",
            "coordinates": [44.0, 18.0]
        },
        {
            "name": "Botswana",
            "code": "BW",
            "coordinates": [-22.0, 24.0]
        },
        {
          "name": "Bouvet Island",
          "code": "BV",
          "coordinates": [-54.43333333, 3.4]
      },
      {
          "name": "Brazil",
          "code": "BR",
          "coordinates": [-10.0, -55.0]
      },
      {
          "name": "British Indian Ocean Territory",
          "code": "IO",
          "coordinates": [-6.0, 71.5]
      },
      {
          "name": "Brunei Darussalam",
          "code": "BN",
          "coordinates": [4.5, 114.66666666]
      },
      {
          "name": "Bulgaria",
          "code": "BG",
          "coordinates": [43.0, 25.0]
      },
      {
          "name": "Burkina Faso",
          "code": "BF",
          "coordinates": [13.0, -2.0]
      },
      {
          "name": "Burundi",
          "code": "BI",
          "coordinates": [-3.5, 30.0]
      },
      {
          "name": "Cambodia",
          "code": "KH",
          "coordinates": [13.0, 105.0]
      },
      {
          "name": "Cameroon",
          "code": "CM",
          "coordinates": [6.0, 12.0]
      },
      {
          "name": "Canada",
          "code": "CA",
          "coordinates": [60.0, -95.0]
      },
      {
          "name": "Cape Verde",
          "code": "CV",
          "coordinates": [16.0, -24.0]
      },
      {
          "name": "Cayman Islands",
          "code": "KY",
          "coordinates": [19.5, -80.5]
      },
      {
          "name": "Central African Republic",
          "code": "CF",
          "coordinates": [7.0, 21.0]
      },
      {
          "name": "Chad",
          "code": "TD",
          "coordinates": [15.0, 19.0]
      },
      {
          "name": "Chile",
          "code": "CL",
          "coordinates": [-30.0, -71.0]
      },
      {
          "name": "China",
          "code": "CN",
          "coordinates": [35.0, 105.0]
      },
      {
          "name": "Christmas Island",
          "code": "CX",
          "coordinates": [-10.5, 105.66666666]
      },
      {
          "name": "Cocos (Keeling) Islands",
          "code": "CC",
          "coordinates": [-12.5, 96.83333333]
      },
      {
          "name": "Colombia",
          "code": "CO",
          "coordinates": [4.0, -72.0]
      },
      {
          "name": "Comoros",
          "code": "KM",
          "coordinates": [-12.16666666, 44.25]
      },
      {
          "name": "Congo",
          "code": "CG",
          "coordinates": [-1.0, 15.0]
      },
      {
          "name": "Congo, The Democratic Republic of the",
          "code": "CD",
          "coordinates": [0.0, 25.0]
      },
      {
          "name": "Cook Islands",
          "code": "CK",
          "coordinates": [-21.23333333, -159.76666666]
      },
      {
          "name": "Costa Rica",
          "code": "CR",
          "coordinates": [10.0, -84.0]
      },
      {
          "name": "Croatia",
          "code": "HR",
          "coordinates": [45.16666666, 15.5]
      },
      {
          "name": "Cuba",
          "code": "CU",
          "coordinates": [21.5, -80.0]
      },
      {
          "name": "Cyprus",
          "code": "CY",
          "coordinates": [35.0, 33.0]
      },
      {
          "name": "Czech Republic",
          "code": "CZ",
          "coordinates": [49.75, 15.5]
      },
      {
          "name": "Denmark",
          "code": "DK",
          "coordinates": [56.0, 10.0]
      },
      {
          "name": "Djibouti",
          "code": "DJ",
          "coordinates": [11.5, 43.0]
      },
      {
          "name": "Dominica",
          "code": "DM",
          "coordinates": [15.41666666, -61.33333333]
      },
      {
          "name": "Dominican Republic",
          "code": "DO",
          "coordinates": [19.0, -70.66666666]
      },
      {
          "name": "Ecuador",
          "code": "EC",
          "coordinates": [-2.0, -77.5]
      },
      {
          "name": "Egypt",
          "code": "EG",
          "coordinates": [27.0, 30.0]
      },
      {
          "name": "El Salvador",
          "code": "SV",
          "coordinates": [13.83333333, -88.91666666]
      },
      {
          "name": "Equatorial Guinea",
          "code": "GQ",
          "coordinates": [2.0, 10.0]
      },
      {
          "name": "Eritrea",
          "code": "ER",
          "coordinates": [15.0, 39.0]
      },
      {
          "name": "Estonia",
          "code": "EE",
          "coordinates": [59.0, 26.0]
      },
      {
          "name": "Ethiopia",
          "code": "ET",
          "coordinates": [8.0, 38.0]
      },
      {
          "name": "Falkland Islands (Malvinas)",
          "code": "FK",
          "coordinates": [-51.75, -59.0]
      },
      {
          "name": "Faroe Islands",
          "code": "FO",
          "coordinates": [62.0, -7.0]
      },
      {
          "name": "Fiji",
          "code": "FJ",
          "coordinates": [-18.0, 175.0]
      },
      {
          "name": "Finland",
          "code": "FI",
          "coordinates": [64.0, 26.0]
      },
      {
          "name": "France",
          "code": "FR",
          "coordinates": [46.0, 2.0]
      },
      {
        "name": "French Guiana",
        "code": "GF",
        "coordinates": [4.0, -53.0]
    },
    {
        "name": "French Polynesia",
        "code": "PF",
        "coordinates": [-15.0, -140.0]
    },
    {
        "name": "French Southern Territories",
        "code": "TF",
        "coordinates": [-43.0, 67.0]
    },
    {
        "name": "Gabon",
        "code": "GA",
        "coordinates": [-1.0, 11.75]
    },
    {
        "name": "Gambia",
        "code": "GM",
        "coordinates": [13.46666666, -16.56666666]
    },
    {
        "name": "Georgia",
        "code": "GE",
        "coordinates": [42.0, 43.5]
    },
    {
        "name": "Germany",
        "code": "DE",
        "coordinates": [51.0, 9.0]
    },
    {
        "name": "Ghana",
        "code": "GH",
        "coordinates": [8.0, -2.0]
    },
    {
        "name": "Gibraltar",
        "code": "GI",
        "coordinates": [36.18333333, -5.36666666]
    },
    {
        "name": "Greece",
        "code": "GR",
        "coordinates": [39.0, 22.0]
    },
    {
        "name": "Greenland",
        "code": "GL",
        "coordinates": [72.0, -40.0]
    },
    {
        "name": "Grenada",
        "code": "GD",
        "coordinates": [12.11666666, -61.66666666]
    },
    {
        "name": "Guadeloupe",
        "code": "GP",
        "coordinates": [16.25, -61.58333333]
    },
    {
        "name": "Guam",
        "code": "GU",
        "coordinates": [13.46666666, 144.78333333]
    },
    {
        "name": "Guatemala",
        "code": "GT",
        "coordinates": [15.5, -90.25]
    },
    {
        "name": "Guernsey",
        "code": "GG",
        "coordinates": [49.46666666, -2.58333333]
    },
    {
        "name": "Guinea",
        "code": "GN",
        "coordinates": [11.0, -10.0]
    },
    {
        "name": "Guinea-Bissau",
        "code": "GW",
        "coordinates": [12.0, -15.0]
    },
    {
        "name": "Guyana",
        "code": "GY",
        "coordinates": [5.0, -59.0]
    },
    {
        "name": "Haiti",
        "code": "HT",
        "coordinates": [19.0, -72.41666666]
    },
    {
        "name": "Heard Island and McDonald Islands",
        "code": "HM",
        "coordinates": [-53.1, 72.51666666]
    },
    {
        "name": "Holy See (Vatican City State)",
        "code": "VA",
        "coordinates": [41.9, 12.45]
    },
    {
        "name": "Honduras",
        "code": "HN",
        "coordinates": [15.0, -86.5]
    },
    {
        "name": "Hong Kong",
        "code": "HK",
        "coordinates": [22.25, 114.16666666]
    },
    {
        "name": "Hungary",
        "code": "HU",
        "coordinates": [47.0, 20.0]
    },
    {
        "name": "Iceland",
        "code": "IS",
        "coordinates": [65.0, -18.0]
    },
    {
        "name": "India",
        "code": "IN",
        "coordinates": [20.0, 77.0]
    },
    {
        "name": "Indonesia",
        "code": "ID",
        "coordinates": [-5.0, 120.0]
    },
    {
        "name": "Iran, Islamic Republic of",
        "code": "IR",
        "coordinates": [32.0, 53.0]
    },
    {
        "name": "Iraq",
        "code": "IQ",
        "coordinates": [33.0, 44.0]
    },
    {
        "name": "Ireland",
        "code": "IE",
        "coordinates": [53.0, -8.0]
    },
    {
        "name": "Isle of Man",
        "code": "IM",
        "coordinates": [54.25, -4.5]
    },
    {
        "name": "Israel",
        "code": "IL",
        "coordinates": [31.5, 34.75]
    },
    {
        "name": "Italy",
        "code": "IT",
        "coordinates": [42.83333333, 12.83333333]
    },
    {
        "name": "Jamaica",
        "code": "JM",
        "coordinates": [18.25, -77.5]
    },
    {
        "name": "Japan",
        "code": "JP",
        "coordinates": [36.0, 138.0]
    },
    {
        "name": "Jersey",
        "code": "JE",
        "coordinates": [49.25, -2.16666666]
    },
    {
        "name": "Jordan",
        "code": "JO",
        "coordinates": [31.0, 36.0]
    },
    {
        "name": "Kazakhstan",
        "code": "KZ",
        "coordinates": [48.0, 68.0]
    },
    {
        "name": "Kenya",
        "code": "KE",
        "coordinates": [1.0, 38.0]
    },
    {
        "name": "Kiribati",
        "code": "KI",
        "coordinates": [1.41666666, 173.0]
    },
    {
        "name": "Korea, Democratic People's Republic of",
        "code": "KP",
        "coordinates": [40.0, 127.0]
    },
    {
        "name": "Korea, Republic of",
        "code": "KR",
        "coordinates": [37.0, 127.5]
    },
    {
        "name": "Kuwait",
        "code": "KW",
        "coordinates": [29.5, 45.75]
    },
    {
        "name": "Kyrgyzstan",
        "code": "KG",
        "coordinates": [41.0, 75.0]
    },
    {
        "name": "Lao People's Democratic Republic",
        "code": "LA",
        "coordinates": [18.0, 105.0]
    },
    {
        "name": "Latvia",
        "code": "LV",
        "coordinates": [57.0, 25.0]
    },
    {
        "name": "Lebanon",
        "code": "LB",
        "coordinates": [33.83333333, 35.83333333]
    },
    {
        "name": "Lesotho",
        "code": "LS",
        "coordinates": [-29.5, 28.5]
    },
    {
        "name": "Liberia",
        "code": "LR",
        "coordinates": [6.5, -9.5]
    },
    {
        "name": "Libyan Arab Jamahiriya",
        "code": "LY",
        "coordinates": [25.0, 17.0]
    },
    {
        "name": "Liechtenstein",
        "code": "LI",
        "coordinates": [47.16666666, 9.53333333]
    },
    {
        "name": "Lithuania",
        "code": "LT",
        "coordinates": [56.0, 24.0]
    },
    {
        "name": "Luxembourg",
        "code": "LU",
        "coordinates": [49.75, 6.16666666]
    },
    {
        "name": "Macao",
        "code": "MO",
        "coordinates": [22.16666666, 113.55]
    },
    {
        "name": "Macedonia, The Former Yugoslav Republic of",
        "code": "MK",
        "coordinates": [41.83333333, 22.0]
    },
    {
        "name": "Madagascar",
        "code": "MG",
        "coordinates": [-20.0, 47.0]
    },
    {
        "name": "Malawi",
        "code": "MW",
        "coordinates": [-13.5, 34.0]
    },
    {
        "name": "Malaysia",
        "code": "MY",
        "coordinates": [2.5, 112.5]
    },
    {
        "name": "Maldives",
        "code": "MV",
        "coordinates": [3.25, 73.0]
    },
    {
        "name": "Mali",
        "code": "ML",
        "coordinates": [17.0, -4.0]
    },
    {
        "name": "Malta",
        "code": "MT",
        "coordinates": [35.83333333, 14.58333333]
    },
    {
        "name": "Marshall Islands",
        "code": "MH",
        "coordinates": [9.0, 168.0]
    },
    {
        "name": "Martinique",
        "code": "MQ",
        "coordinates": [14.66666666, -61.0]
    },
    {
        "name": "Mauritania",
        "code": "MR",
        "coordinates": [20.0, -12.0]
    },
    {
        "name": "Mauritius",
        "code": "MU",
        "coordinates": [-20.28333333, 57.55]
    },
    {
        "name": "Mayotte",
        "code": "YT",
        "coordinates": [-12.83333333, 45.16666666]
    },
    {
        "name": "Mexico",
        "code": "MX",
        "coordinates": [23.0, -102.0]
    },
    {
        "name": "Micronesia, Federated States of",
        "code": "FM",
        "coordinates": [6.91666666, 158.25]
    },
    {
        "name": "Moldova, Republic of",
        "code": "MD",
        "coordinates": [47.0, 29.0]
    },
    {
        "name": "Monaco",
        "code": "MC",
        "coordinates": [43.73333333, 7.4]
    },
    {
        "name": "Mongolia",
        "code": "MN",
        "coordinates": [46.0, 105.0]
    },
    {
        "name": "Montenegro",
        "code": "ME",
        "coordinates": [42.5, 19.3]
    },
    {
        "name": "Montserrat",
        "code": "MS",
        "coordinates": [16.75, -62.2]
    },
    {
        "name": "Morocco",
        "code": "MA",
        "coordinates": [32.0, -5.0]
    },
    {
        "name": "Mozambique",
        "code": "MZ",
        "coordinates": [-18.25, 35.0]
    },
    {
        "name": "Myanmar",
        "code": "MM",
        "coordinates": [22.0, 98.0]
    },
    {
        "name": "Namibia",
        "code": "NA",
        "coordinates": [-22.0, 17.0]
    },
    {
        "name": "Nauru",
        "code": "NR",
        "coordinates": [-0.53333333, 166.91666666]
    },
    {
        "name": "Nepal",
        "code": "NP",
        "coordinates": [28.0, 84.0]
    },
    {
        "name": "Netherlands",
        "code": "NL",
        "coordinates": [52.5, 5.75]
    },
    {
        "name": "Netherlands Antilles",
        "code": "AN",
        "coordinates": [12.25, -68.75]
    },
    {
        "name": "New Caledonia",
        "code": "NC",
        "coordinates": [-21.5, 165.5]
    },
    {
        "name": "New Zealand",
        "code": "NZ",
        "coordinates": [-41.0, 174.0]
    },
    {
        "name": "Nicaragua",
        "code": "NI",
        "coordinates": [13.0, -85.0]
    },
    {
        "name": "Niger",
        "code": "NE",
        "coordinates": [16.0, 8.0]
    },
    {
        "name": "Nigeria",
        "code": "NG",
        "coordinates": [10.0, 8.0]
    },
    {
        "name": "Niue",
        "code": "NU",
        "coordinates": [-19.03333333, -169.86666666]
    
      },
      {
        "name": "Norfolk Island",
        "code": "NF",
        "coordinates": [-29.03333333, 167.95]
      },
      {
        "name": "Northern Mariana Islands",
        "code": "MP",
        "coordinates": [15.2, 145.75]
      },
      {
        "name": "Norway",
        "code": "NO",
        "coordinates": [62.0, 10.0]
      },
      {
        "name": "Oman",
        "code": "OM",
        "coordinates": [21.0, 57.0]
      },
      {
        "name": "Pakistan",
        "code": "PK",
        "coordinates": [30.0, 70.0]
      },
      {
        "name": "Palau",
        "code": "PW",
        "coordinates": [7.5, 134.5]
      },
      {
        "name": "Palestinian Territory, Occupied",
        "code": "PS",
        "coordinates": [32.0, 35.25]
      },
      {
        "name": "Panama",
        "code": "PA",
        "coordinates": [9.0, -80.0]
      },
      {
        "name": "Papua New Guinea",
        "code": "PG",
        "coordinates": [-6.0, 147.0]
      },
      {
        "name": "Paraguay",
        "code": "PY",
        "coordinates": [-23.0, -58.0]
      },
      {
        "name": "Peru",
        "code": "PE",
        "coordinates": [-10.0, -76.0]
      },
      {
        "name": "Philippines",
        "code": "PH",
        "coordinates": [13.0, 122.0]
      },
      {
        "name": "Pitcairn",
        "code": "PN",
        "coordinates": [-24.7, -127.4]
      },
      {
        "name": "Poland",
        "code": "PL",
        "coordinates": [52.0, 20.0]
      },
      {
        "name": "Portugal",
        "code": "PT",
        "coordinates": [39.5, -8.0]
      },
      {
        "name": "Puerto Rico",
        "code": "PR",
        "coordinates": [18.25, -66.5]
      },
      {
        "name": "Qatar",
        "code": "QA",
        "coordinates": [25.5, 51.25]
      },
      {
        "name": "Réunion",
        "code": "RE",
        "coordinates": [-21.1, 55.6]
      },
      {
        "name": "Romania",
        "code": "RO",
        "coordinates": [46.0, 25.0]
      },
      {
        "name": "Russian Federation",
        "code": "RU",
        "coordinates": [60.0, 100.0]
      },
      {
        "name": "Rwanda",
        "code": "RW",
        "coordinates": [-2.0, 30.0]
      },
      {
        "name": "Saint Barthélemy",
        "code": "BL",
        "coordinates": [18.5, -63.41666666]
      },
      {
        "name": "Saint Helena, Ascension and Tristan da Cunha",
        "code": "SH",
        "coordinates": [-15.95, -5.7]
      },
      {
        "name": "Saint Kitts and Nevis",
        "code": "KN",
        "coordinates": [17.33333333, -62.75]
      },
      {
        "name": "Saint Lucia",
        "code": "LC",
        "coordinates": [13.88333333, -60.96666666]
      },
      {
        "name": "Saint Martin (French part)",
        "code": "MF",
        "coordinates": [18.08333333, -63.95]
      },
      {
        "name": "Saint Pierre and Miquelon",
        "code": "PM",
        "coordinates": [46.83333333, -56.33333333]
      },
      {
        "name": "Saint Vincent and the Grenadines",
        "code": "VC",
        "coordinates": [13.25, -61.2]
      },
      {
        "name": "Samoa",
        "code": "WS",
        "coordinates": [-13.58333333, -172.33333333]
      },
      {
        "name": "San Marino",
        "code": "SM",
        "coordinates": [43.76666666, 12.41666666]
      },
      {
        "name": "Sao Tome and Principe",
        "code": "ST",
        "coordinates": [1.0, 7.0]
      },
      {
        "name": "Saudi Arabia",
        "code": "SA",
        "coordinates": [25.0, 45.0]
      },
      {
        "name": "Senegal",
        "code": "SN",
        "coordinates": [14.0, -14.0]
      },
      {
        "name": "Serbia",
        "code": "RS",
        "coordinates": [44.0, 21.0]
      },
      {
        "name": "Seychelles",
        "code": "SC",
        "coordinates": [-4.58333333, 55.66666666]
      },
      {
        "name": "Sierra Leone",
        "code": "SL",
        "coordinates": [8.5, -11.5]
      },
      {
        "name": "Singapore",
        "code": "SG",
        "coordinates": [1.36666666, 103.8]
      },
      {
        "name": "Slovakia",
        "code": "SK",
        "coordinates": [48.66666666, 19.5]
      },
      {
        "name": "Slovenia",
        "code": "SI",
        "coordinates": [46.11666666, 14.81666666]
      },
      {
        "name": "Solomon Islands",
        "code": "SB",
        "coordinates": [-8.0, 159.0]
      },
      {
        "name": "Somalia",
        "code": "SO",
        "coordinates": [10.0, 49.0]
      },
      {
        "name": "South Africa",
        "code": "ZA",
        "coordinates": [-29.0, 24.0]
      },
      {
        "name": "South Georgia and the South Sandwich Islands",
        "code": "GS",
        "coordinates": [-54.5, -37.0]
      },
      {
        "name": "Spain",
        "code": "ES",
        "coordinates": [40.0, -4.0]
      },
      {
          "name": "Sri Lanka",
          "code": "LK",
          "coordinates": [7.0, 81.0]
      },
      {
          "name": "Sudan",
          "code": "SD",
          "coordinates": [15.0, 30.0]
      },
      {
          "name": "Suriname",
          "code": "SR",
          "coordinates": [4.0, -56.0]
      },
      {
          "name": "Svalbard and Jan Mayen",
          "code": "SJ",
          "coordinates": [78.0, 20.0]
      },
      {
          "name": "Swaziland",
          "code": "SZ",
          "coordinates": [-26.5, 31.5]
      },
      {
          "name": "Sweden",
          "code": "SE",
          "coordinates": [62.0, 15.0]
      },
      {
          "name": "Switzerland",
          "code": "CH",
          "coordinates": [47.0, 8.0]
      },
      {
          "name": "Syrian Arab Republic",
          "code": "SY",
          "coordinates": [35.0, 38.0]
      },
      {
          "name": "Taiwan, Province of China",
          "code": "TW",
          "coordinates": [23.5, 121.0]
      },
      {
          "name": "Tajikistan",
          "code": "TJ",
          "coordinates": [39.0, 71.0]
      },
      {
          "name": "Tanzania, United Republic of",
          "code": "TZ",
          "coordinates": [-6.0, 35.0]
      },
      {
          "name": "Thailand",
          "code": "TH",
          "coordinates": [15.0, 100.0]
      },
      {
          "name": "Timor-Leste",
          "code": "TL",
          "coordinates": [-8.83333333, 125.91666666]
      },
      {
          "name": "Togo",
          "code": "TG",
          "coordinates": [8.0, 1.16666666]
      },
      {
          "name": "Tokelau",
          "code": "TK",
          "coordinates": [-9.0, -172.0]
      },
      {
          "name": "Tonga",
          "code": "TO",
          "coordinates": [-20.0, -175.0]
      },
      {
          "name": "Trinidad and Tobago",
          "code": "TT",
          "coordinates": [11.0, -61.0]
      },
      {
          "name": "Tunisia",
          "code": "TN",
          "coordinates": [34.0, 9.0]
      },
      {
          "name": "Turkey",
          "code": "TR",
          "coordinates": [39.0, 35.0]
      },
      {
          "name": "Turkmenistan",
          "code": "TM",
          "coordinates": [40.0, 60.0]
      },
      {
          "name": "Turks and Caicos Islands",
          "code": "TC",
          "coordinates": [21.75, -71.58333333]
      },
      {
          "name": "Tuvalu",
          "code": "TV",
          "coordinates": [-8.0, 178.0]
      },
      {
          "name": "Uganda",
          "code": "UG",
          "coordinates": [1.0, 32.0]
      },
      {
          "name": "Ukraine",
          "code": "UA",
          "coordinates": [49.0, 32.0]
      },
      {
          "name": "United Arab Emirates",
          "code": "AE",
          "coordinates": [24.0, 54.0]
      },
      {
          "name": "United Kingdom",
          "code": "GB",
          "coordinates": [54.0, -2.0]
      },
      {
          "name": "United States",
          "code": "US",
          "coordinates": [38.0, -97.0]
      },
      {
          "name": "United States Minor Outlying Islands",
          "code": "UM",
          "coordinates": [19.28333333, 166.6]
      },
      {
          "name": "Uruguay",
          "code": "UY",
          "coordinates": [-33.0, -56.0]
      },
      {
          "name": "Uzbekistan",
          "code": "UZ",
          "coordinates": [41.0, 64.0]
      },
      {
          "name": "Vanuatu",
          "code": "VU",
          "coordinates": [-16.0, 167.0]
      },
      {
          "name": "Venezuela, Bolivarian Republic of",
          "code": "VE",
          "coordinates": [8.0, -66.0]
      },
      {
          "name": "Viet Nam",
          "code": "VN",
          "coordinates": [16.16666666, 107.83333333]
      },
      {
          "name": "Virgin Islands, British",
          "code": "VG",
          "coordinates": [18.5, -64.5]
      },
      {
          "name": "Virgin Islands, U.S.",
          "code": "VI",
          "coordinates": [18.33333333, -64.83333333]
      },
      {
          "name": "Wallis and Futuna",
          "code": "WF",
          "coordinates": [-13.3, -176.2]
      },
      {
          "name": "Western Sahara",
          "code": "EH",
          "coordinates": [24.5, -13.0]
      },
      {
          "name": "Yemen",
          "code": "YE",
          "coordinates": [15.0, 48.0]
      },
      {
          "name": "Zambia",
          "code": "ZM",
          "coordinates": [-15.0, 30.0]
      },
      {
          "name": "Zimbabwe",
          "code": "ZW",
          "coordinates": [-20.0, 30.0]
      }
    ];

    useEffect(() => {
        const filteringCountries = () => {
            if (!mapData || Object.keys(mapData).length === 0) {
                setFilteredCountries([]);
                return;
            }

            const filtered = Object.keys(mapData)
                .map(key => {
                    const country = popularCountries.find(country => country.code === key);
                    if (country) {
                        return {
                            ...country,
                            count: mapData[key] // Assuming mapData contains a count for each country
                        };
                    }
                    return null;
                })
                .filter(country => country !== null);
            
            setFilteredCountries(filtered);
        };

        filteringCountries();
    }, [mapData]); // Dependency array to ensure it runs only when mapData changes

    const mapRef = React.useRef(null);

    return (
        <MapContainer
            crs={L.CRS.EPSG3857}
            zoom={2}
            center={[25, 10]}
            style={{ height: "400px", width: "100%" }}
            ref={mapRef}
            scrollWheelZoom={false}
        >
            <TileLayer
                zoomControl={false}
                noWrap={true}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {filteredCountries.map((country, index) => (
                <Marker
                    key={index}
                    position={country.coordinates}
                    icon={greenIcon}
                >
                    <Popup>{country.name}</Popup>
                    <Tooltip>{country.name}: {country.count}</Tooltip> {/* Show the count in the tooltip */}
                </Marker>
            ))}
        </MapContainer>
    );
};

export default GenericMap;






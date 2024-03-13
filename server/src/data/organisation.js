const organisation = [
  "Walmart",
  "Amazon",
  "Exxon Mobil",
  "Apple",
  "CVS Health",
  "Berkshire Hathaway",
  "UnitedHealth Group",
  "McKesson",
  "AT&T",
  "AmerisourceBergen",
  "Alphabet",
  "Ford Motor",
  "Cigna",
  "Costco Wholesale",
  "Chevron",
  "Cardinal Health",
  "JPMorgan Chase",
  "General Motors",
  "Walgreens Boots Alliance",
  "Verizon Communications",
  "Microsoft",
  "Marathon Petroleum",
  "Kroger",
  "Fannie Mae",
  "Bank of America",
  "Home Depot",
  "Phillips 66",
  "Comcast",
  "Anthem",
  "Wells Fargo",
  "Citigroup",
  "Valero Energy",
  "General Electric",
  "Dell Technologies",
  "Johnson & Johnson",
  "State Farm Insurance",
  "Target",
  "IBM",
  "Raytheon Technologies",
  "Boeing",
  "Freddie Mac",
  "Centene",
  "UPS",
  "Lowe&#8217;s",
  "Intel",
  "Facebook",
  "FedEx",
  "MetLife",
  "Walt Disney",
  "Procter & Gamble",
  "PepsiCo",
  "Humana",
  "Prudential Financial (U.S.)",
  "Archer Daniels Midland",
  "Albertsons",
  "Sysco",
  "Lockheed Martin",
  "HP",
  "Energy Transfer",
  "Goldman Sachs Group",
  "Morgan Stanley",
  "Caterpillar",
  "Cisco Systems",
  "Pfizer",
  "HCA Healthcare",
  "American International Group",
  "American Express",
  "Delta Air Lines",
  "Merck",
  "American Airlines Group",
  "Charter Communications",
  "Allstate",
  "New York Life Insurance",
  "Nationwide",
  "Best Buy",
  "United Airlines Holdings",
  "Liberty Mutual Insurance Group",
  "Dow",
  "Tyson Foods",
  "TJX",
  "TIAA",
  "Oracle",
  "General Dynamics",
  "Deere",
  "Nike",
  "Progressive",
  "Publix Super Markets",
  "Coca-Cola",
  "Massachusetts Mutual Life",
  "Tech Data",
  "World Fuel Services",
  "Honeywell International",
  "ConocoPhillips",
  "USAA",
  "Exelon",
  "Northrop Grumman",
  "Capital One Financial",
  "Plains GP Holdings",
  "AbbVie",
  "StoneX Group",
  "Enterprise Products Partners",
  "Northwestern Mutual",
  "3M",
  "Abbott Laboratories",
  "CHS",
  "Travelers Cos.",
  "Philip Morris International",
  "Raytheon",
  "Hewlett Packard Enterprise",
  "Arrow Electronics",
  "ViacomCBS",
  "Dollar General",
  "U.S. Bancorp",
  "Starbucks",
  "Bristol-Myers Squibb",
  "US Foods Holding",
  "Mondelez International",
  "Paccar",
  "Thermo Fisher Scientific",
  "Macy&#8217;s",
  "Jabil",
  "Kraft Heinz",
  "Duke Energy",
  "Tesla",
  "PBF Energy",
  "Qualcomm",
  "NGL Energy Partners",
  "CBRE Group",
  "Baker Hughes",
  "Synnex",
  "Dollar Tree",
  "Cummins",
  "United Natural Foods",
  "Micron Technology",
  "Amgen",
  "Penske Automotive Group",
  "Visa",
  "Broadcom",
  "Nucor",
  "Gilead Sciences",
  "Southwest Airlines",
  "Halliburton",
  "Lumen Technologies",
  "International Paper",
  "Eli Lilly",
  "Aflac",
  "Lennar",
  "Occidental Petroleum",
  "Union Pacific",
  "Rite Aid",
  "PNC Financial Services Group",
  "DuPont",
  "Southern Company",
  "AutoNation",
  "DXC Technology",
  "McDonald&#8217;s",
  "Marriott International",
  "ManpowerGroup",
  "Bank of New York Mellon",
  "Hartford Financial Services Group",
  "Danaher",
  "Whirlpool",
  "AECOM",
  "Netflix",
  "Kohl&#8217;s",
  "Lear",
  "Altria Group",
  "Performance Food Group",
  "Avnet",
  "Synchrony Financial",
  "Genuine Parts",
  "NextEra Energy",
  "CarMax",
  "Tenet Healthcare",
  "Kimberly-Clark",
  "Emerson Electric",
  "WestRock",
  "CDW",
  "Jones Lang LaSalle (JLL)",
  "Sherwin-Williams",
  "Fluor",
  "PayPal Holdings",
  "D.R. Horton",
  "HollyFrontier",
  "Tenneco",
  "EOG Resources",
  "BD",
  "Lincoln National",
  "PG&E",
  "Salesforce",
  "Mastercard",
  "General Mills",
  "Molina Healthcare",
  "Cognizant Technology Solutions",
  "Marsh & McLennan",
  "XPO Logistics",
  "Dominion Energy",
  "Western Digital",
  "Gap",
  "Aramark",
  "Principal Financial",
  "Ross Stores",
  "Colgate-Palmolive",
  "American Electric Power",
  "Nordstrom",
  "Jacobs Engineering Group",
  "Waste Management",
  "C.H. Robinson Worldwide",
  "PPG Industries",
  "Booking Holdings",
  "Omnicom Group",
  "Loews",
  "Ecolab",
  "Stryker",
  "Estée Lauder",
  "Goodyear Tire & Rubber",
  "Truist Financial",
  "Applied Materials",
  "BlackRock",
  "Stanley Black & Decker",
  "Freeport-McMoRan",
  "Texas Instruments",
  "Biogen",
  "Parker-Hannifin",
  "Reinsurance Group of America",
  "Howmet Aerospace",
  "Automatic Data Processing",
  "Uber Technologies",
  "Illinois Tool Works",
  "DaVita",
  "Discover Financial Services",
  "Land O&#8217;Lakes",
  "VF",
  "Corteva",
  "Las Vegas Sands",
  "Textron",
  "Kellogg",
  "Guardian Life Ins. Co. of America",
  "Qurate Retail",
  "Core-Mark Holding",
  "Community Health Systems",
  "Kinder Morgan",
  "BJ's Wholesale Club",
  "State Street",
  "Ameriprise Financial",
  "Global Partners",
  "United States Steel",
  "L Brands",
  "MGM Resorts International",
  "L3Harris Technologies",
  "DISH Network",
  "Lithia Motors",
  "DTE Energy",
  "American Family Insurance Group",
  "Farmers Insurance Exchange",
  "Consolidated Edison",
  "LKQ",
  "Sempra Energy",
  "Edison International",
  "CenterPoint Energy",
  "Quanta Services",
  "Murphy USA",
  "Expedia Group",
  "Group 1 Automotive",
  "Bed Bath & Beyond",
  "Unum Group",
  "CSX",
  "AutoZone",
  "Pacific Life",
  "Vistra Energy",
  "Charles Schwab",
  "Crown Holdings",
  "Ally Financial",
  "Laboratory Corp. of America (Labcorp)",
  "Live Nation Entertainment",
  "Xcel Energy",
  "Corning",
  "W.W. Grainger",
  "Ball",
  "Fox",
  "Universal Health Services",
  "Baxter International",
  "Norfolk Southern",
  "Navistar International",
  "Adobe",
  "J.C. Penney",
  "Discovery",
  "Keurig Dr Pepper",
  "Leidos Holdings",
  "IQVIA Holdings",
  "Reliance Steel & Aluminum",
  "Nvidia",
  "Entergy",
  "FirstEnergy",
  "eBay",
  "Boston Scientific",
  "ODP",
  "Molson Coors Beverage",
  "Steel Dynamics",
  "Mutual of Omaha Insurance",
  "Sonic Automotive",
  "Alcoa",
  "Fidelity National Information Services",
  "Henry Schein",
  "Republic Services",
  "Liberty Media",
  "Peter Kiewit Sons&#8217;",
  "Interpublic Group",
  "PulteGroup",
  "AES",
  "Fiserv",
  "BorgWarner",
  "Oneok",
  "O&#8217;Reilly Automotive",
  "Assurant",
  "Newell Brands",
  "Public Service Enterprise Group",
  "News Corp.",
  "Calpine",
  "Auto-Owners Insurance",
  "Mohawk Industries",
  "PVH",
  "Campbell Soup",
  "NRG Energy",
  "Fifth Third Bancorp",
  "Hertz Global Holdings",
  "Altice USA",
  "Newmont",
  "Cheniere Energy",
  "Advance Auto Parts",
  "Lam Research",
  "Owens & Minor",
  "Equitable Holdings",
  "Conagra Brands",
  "Markel",
  "Jones Financial (Edward Jones)",
  "Hormel Foods",
  "Hilton Worldwide Holdings",
  "Univar Solutions",
  "United Rentals",
  "Pioneer Natural Resources",
  "Delek US Holdings",
  "Eastman Chemical",
  "EMCOR Group",
  "Avis Budget Group",
  "J.B. Hunt Transport Services",
  "Xerox Holdings",
  "Wayfair",
  "KKR",
  "AGCO",
  "Alleghany",
  "Icahn Enterprises",
  "Voya Financial",
  "Ryder System",
  "Air Products & Chemicals",
  "Mosaic",
  "Huntington Ingalls Industries",
  "Berry Global Group",
  "Anixter International",
  "Alaska Air Group",
  "Yum China Holdings",
  "Dick&#8217;s Sporting Goods",
  "Caesars Holdings",
  "Genworth Financial",
  "Targa Resources",
  "Coty",
  "Dana",
  "Thrivent Financial for Lutherans",
  "Autoliv",
  "SpartanNash",
  "Eversource Energy",
  "Darden Restaurants",
  "Chesapeake Energy",
  "NOV",
  "Fidelity National Financial",
  "Erie Insurance Group",
  "Oshkosh",
  "Casey&#8217;s General Stores",
  "WESCO International",
  "Tractor Supply",
  "CommScope Holding",
  "Huntsman",
  "American Financial Group",
  "Masco",
  "Sanmina",
  "Amphenol",
  "Williams",
  "Westinghouse Air Brake",
  "Expeditors Intl. of Washington",
  "Andersons",
  "Westlake Chemical",
  "Constellation Brands",
  "Frontier Communications",
  "JetBlue Airways",
  "Citizens Financial Group",
  "Raymond James Financial",
  "Foot Locker",
  "Hershey",
  "Zimmer Biomet Holdings",
  "Cincinnati Financial",
  "Western & Southern Financial Group",
  "W.R. Berkley",
  "Motorola Solutions",
  "Thor Industries",
  "Regeneron Pharmaceuticals",
  "Spirit AeroSystems Holdings",
  "J.M. Smucker",
  "PPL",
  "Insight Enterprises",
  "Quest Diagnostics",
  "KeyCorp",
  "Veritiv",
  "DCP Midstream",
  "American Tower",
  "Graybar Electric",
  "WEC Energy Group",
  "NVR",
  "Ulta Beauty",
  "Devon Energy",
  "Blackstone Group",
  "Dean Foods",
  "Fortive",
  "UGI",
  "Burlington Stores",
  "Builders FirstSource",
  "Toll Brothers",
  "Old Republic International",
  "Asbury Automotive Group",
  "Arthur J. Gallagher",
  "MasTec",
  "Owens Corning",
  "Magellan Health",
  "Dover",
  "Beacon Roofing Supply",
  "Avery Dennison",
  "Hanesbrands",
  "Packaging Corp. of America",
  "M&T Bank",
  "NCR",
  "Northern Trust",
  "Cintas",
  "Polaris",
  "CMS Energy",
  "Seaboard",
  "Intuit",
  "Regions Financial",
  "FM Global",
  "Advanced Micro Devices (AMD)",
  "Ovintiv",
  "Booz Allen Hamilton Holding",
  "S&P Global",
  "Rockwell Automation",
  "O-I Glass",
  "Wynn Resorts",
  "Securian Financial Group",
  "Alliance Data Systems",
  "Weyerhaeuser",
  "Brighthouse Financial",
  "Intercontinental Exchange",
  "American Axle & Manufacturing",
  "Hess",
  "ABM Industries",
  "Activision Blizzard",
  "GameStop",
  "APA",
  "Science Applications International",
  "AK Steel Holding",
  "Dillard&#8217;s",
  "Ralph Lauren",
  "Celanese",
  "R.R. Donnelley & Sons",
  "Zoetis",
  "Ascena Retail Group",
  "Clorox",
  "Ingredion",
  "First American Financial",
  "Graphic Packaging Holding",
  "NetApp",
  "HD Supply Holdings",
  "TravelCenters of America",
  "Olin",
  "Robert Half International",
  "EnLink Midstream",
  "Avantor",
  "Tapestry",
  "TD Ameritrade Holding",
  "Analog Devices",
  "Ameren",
  "Williams-Sonoma",
  "Realogy Holdings",
  "Commercial Metals",
  "Rush Enterprises",
  "Franklin Resources",
  "Fortune Brands Home & Security",
  "Levi Strauss",
  "Crown Castle International",
  "Simon Property Group",
  "Cerner",
  "Post Holdings",
  "Huntington Bancshares",
  "KBR",
  "Sprouts Farmers Market",
  "LPL Financial Holdings",
  "T. Rowe Price",
  "Yum Brands",
  "Chipotle Mexican Grill",
  "Patterson",
  "RPM International",
  "Equinix",
  "Navient",
  "Chemours",
  "ON Semiconductor",
  "TransDigm Group",
  "Host Hotels & Resorts",
  "Select Medical Holdings",
  "Par Pacific Holdings",
  "Sonoco Products",
  "Roper Technologies",
  "Harley-Davidson",
  "Jefferies Financial Group",
  "Kelly Services",
  "Microchip Technology",
  "McCormick",
  "MDU Resources Group",
  "Fastenal",
  "Big Lots",
  "Penn National Gaming",
  "Western Union",
  "Under Armour",
  "Xylem",
  "Skechers U.S.A.",
  "Domtar",
  "NiSource",
  "Marathon Oil",
  "National General Holdings",
  "Telephone & Data Systems",
  "Agilent Technologies",
  "Ametek",
  "Evergy",
  "International Flavors & Fragrances",
  "ADT",
  "Welltower",
  "Windstream Holdings",
  "Michaels",
  "Kemper",
  "Hyatt Hotels",
  "Alexion Pharmaceuticals",
  "Resideo Technologies",
  "CACI International",
  "Electronic Arts",
  "Vulcan Materials",
  "TreeHouse Foods",
  "Global Payments",
  "Hanover Insurance Group",
  "Camping World Holdings",
  "Cornerstone Building Brands",
  "Yellow",
  "CME Group",
  "Chewy",
  "Knight-Swift Transportation Holdings",
  "Moody&#8217;s",
  "Coca-Cola Consolidated",
  "Carlisle",
  "Sealed Air",
  "A-Mark Precious Metals",
  "Watsco",
  "Taylor Morrison Home",
  "IAC/InterActiveCorp",
  "Leggett & Platt",
  "OneMain Holdings",
  "Schneider National",
  "Martin Marietta Materials",
  "NortonLifeLock",
  "Hasbro",
  "Square",
  "Terex",
  "Syneos Health",
  "FMC",
  "Boise Cascade",
  "SS&C Technologies Holdings",
  "Continental Resources",
  "Peabody Energy",
  "Encompass Health",
  "Greif",
  "Concho Resources",
  "Hubbell",
  "CF Industries Holdings",
  "KLA",
  "Genesis Healthcare",
  "Brunswick",
  "KB Home",
  "Globe Life",
  "Mattel",
  "Ryerson Holding",
  "Silgan Holdings",
  "Zebra Technologies",
  "Intuitive Surgical",
  "Warner Music Group",
  "Conduent",
  "Tutor Perini",
  "Juniper Networks",
  "Noble Energy",
  "Vertiv Holdings",
  "Tiffany",
  "EQT",
  "UFP Industries",
  "Diebold Nixdorf",
  "Antero Resources",
  "Meritor",
  "Broadridge Financial Solutions",
  "Church & Dwight",
  "Marriott Vacations Worldwide",
  "Edwards Lifesciences",
  "Colfax",
  "Insperity",
  "American Eagle Outfitters",
  "Keysight Technologies",
  "JELD-WEN Holding",
  "Iron Mountain",
  "Nasdaq",
  "Gartner",
  "Sinclair Broadcast Group",
  "Ingles Markets",
  "Monster Beverage",
  "Murphy Oil",
  "Vertex Pharmaceuticals",
  "First Republic Bank",
  "Bloomin&#8217; Brands",
  "Spectrum Brands Holdings",
  "Quad/Graphics",
  "Flowers Foods",
  "CUNA Mutual Group",
  "Allegheny Technologies",
  "Old Dominion Freight Line",
  "Landstar System",
  "American National Group",
  "Snap-on",
  "Brookdale Senior Living",
  "Amkor Technology",
  "Wyndham Destinations",
  "PPD",
  "Dentsply Sirona",
  "CNO Financial Group",
  "Urban Outfitters",
  "Sabre",
  "Mercury General",
  "Diamondback Energy",
  "Parsons",
  "Aaron's",
  "Flowserve",
  "Carvana",
  "ASGN",
  "Sally Beauty Holdings",
  "ScanSource",
  "Ventas",
  "Country Financial",
  "TriNet Group",
  "Spirit Airlines",
  "Comerica",
  "Lennox International",
  "Timken",
  "Paychex",
  "Amerco",
  "Worthington Industries",
  "Lamb Weston Holdings",
  "Laureate Education",
  "Penn Mutual Life Insurance",
  "iHeartMedia",
  "Brink's",
  "Sentry Insurance Group",
  "Acuity Brands",
  "Hub Group",
  "Meritage Homes",
  "MRC Global",
  "Alliant Energy",
  "Workday",
  "BMC Stock Holdings",
  "Abercrombie & Fitch",
  "Domino's Pizza",
  "Lyft",
  "Meredith",
  "American Water Works",
  "Albemarle",
  "Ciena",
  "Barnes & Noble",
  "Weis Markets",
  "Illumina",
  "SVB Financial Group",
  "Carter's",
  "Stifel Financial",
  "Mednax",
  "Equifax",
  "Kar Auction Services",
  "Ashland Global Holdings",
  "Medical Mutual of Ohio",
  "Sprague Resources",
  "Super Micro Computer",
  "Designer Brands",
  "Pitney Bowes",
  "Applied Industrial Technologies",
  "Pinnacle West Capital",
  "American Equity Investment Life Holding",
  "ServiceNow",
  "Twitter",
  "Calumet Specialty Products Partners",
  "Steelcase",
  "Sanderson Farms",
  "WABCO Holdings",
  "Clean Harbors",
  "Puget Energy",
  "Scientific Games",
  "Granite Construction",
  "Carlyle Group",
  "Skyworks Solutions",
  "Aleris",
  "Triple-S Management",
  "Hexion",
  "Hologic",
  "Triumph Group",
  "Darling Ingredients",
  "MSC Industrial Direct",
  "Red Hat",
  "Synopsys",
  "PolyOne",
  "Dycom Industries",
  "Cabot",
  "Prologis",
  "Boyd Gaming",
  "LSC Communications",
  "Brown-Forman",
  "Stericycle",
  "CIT Group",
  "MDC Holdings",
  "Hyster-Yale Materials Handling",
  "Crane",
  "Cinemark Holdings",
  "Autodesk",
  "Trimble",
  "Garrett Motion",
  "Zions Bancorp.",
  "Regal Beloit",
  "Service Corp. International",
  "Varian Medical Systems",
  "PriceSmart",
  "Brinker International",
  "Digital Realty Trust",
  "Pool",
  "Crestwood Equity Partners",
  "Infor",
  "Plexus",
  "Teledyne Technologies",
  "G-III Apparel Group",
  "Scotts Miracle-Gro",
  "Apollo Global Management",
  "E*Trade Financial",
  "Toro",
  "Southwest Gas Holdings",
  "GMS",
  "Cooper-Standard Holdings",
  "Acadia Healthcare",
  "Tetra Tech",
  "Primoris Services",
  "Tempur Sealy International",
  "H&R Block",
  "Qorvo",
  "TRI Pointe Group",
  "Cracker Barrel Old Country Store",
  "Elanco Animal Health",
  "PRA Health Sciences",
  "First Solar",
  "AMC Networks",
  "Xilinx",
  "Green Plains",
  "Columbia Sportswear",
  "Nexstar Media Group",
  "Southwestern Energy",
  "Greenbrier",
  "Presidio",
  "Citrix Systems",
  "Mettler-Toledo International",
  "Trinity Industries",
  "Mutual of America Life Insurance",
  "Lincoln Electric Holdings",
  "Tailored Brands",
  "A.O. Smith",
  "ArcBest",
  "GoDaddy",
  "SkyWest",
  "Boston Properties",
  "Enable Midstream Partners",
  "Middleby",
  "NOW",
  "Unisys",
  "Visteon",
  "Graham Holdings",
  "Resolute Forest Products",
  "Caleres",
  "AGNC Investment",
  "Hill-Rom Holdings",
  "Moog",
  "Legg Mason",
  "Atmos Energy",
  "Woodward",
  "Palo Alto Networks",
  "H.B. Fuller",
  "Akamai Technologies",
  "Avaya Holdings",
  "Maximus",
  "PerkinElmer",
  "Hawaiian Electric Industries",
  "Kansas City Southern",
  "AptarGroup",
  "Public Storage",
  "Selective Insurance Group",
  "ITT",
  "Donaldson",
  "Park Hotels & Resorts",
  "Kirby",
  "Hawaiian Holdings",
  "Popular",
  "Range Resources",
  "PC Connection",
  "Amica Mutual Insurance",
  "EnerSys",
  "Helmerich & Payne",
  "NLV Financial",
  "Valmont Industries",
  "PAE",
  "Texas Roadhouse",
  "Cooper Tire & Rubber",
  "Euronet Worldwide",
  "Zillow Group",
  "Atlas Air Worldwide Holdings",
  "Magellan Midstream Partners",
  "Hain Celestial Group",
  "Univision Communications",
  "Equity Residential",
  "Allison Transmission Holdings",
  "Colony Capital",
  "TTM Technologies",
  "Clear Channel Outdoor Holdings",
  "Energizer Holdings",
  "Guess",
  "Rent-A-Center",
  "Take-Two Interactive Software",
  "Vishay Intertechnology",
  "TransUnion",
  "Cooper",
  "FleetCor Technologies",
  "RH",
  "Renewable Energy Group",
  "BlueLinx Holdings",
  "California Resources",
  "TopBuild",
  "Charles River Laboratories International",
  "Comfort Systems USA",
  "Verisk Analytics",
  "ResMed",
  "Teleflex",
  "New Jersey Resources",
  "New Residential Investment",
  "Interactive Brokers Group",
  "Zayo Group Holdings",
  "Herman Miller",
  "Grocery Outlet Holding",
  "J.Crew Group",
  "Century Communities",
  "Caesars Entertainment",
  "Catalent",
  "Itron",
  "M/I Homes",
  "Cboe Global Markets",
  "IDEX",
  "Belden",
  "Curtiss-Wright",
  "Cheesecake Factory",
  "Genesis Energy",
  "GEO Group",
  "Patterson-UTI Energy",
  "Werner Enterprises",
  "Ingersoll Rand",
  "Verso",
  "Mueller Industries",
  "Nu Skin Enterprises",
  "Revlon",
  "Arista Networks",
  "IDEXX Laboratories",
  "Align Technology",
  "Waters",
  "Synovus Financial",
  "BrightView Holdings",
  "REV Group",
  "Brown & Brown",
  "Valvoline",
  "Knights of Columbus",
  "Central Garden & Pet",
  "Carpenter Technology",
  "SLM",
  "Kennametal",
  "LCI Industries",
  "TrueBlue",
  "Cimarex Energy",
  "Splunk",
  "SiteOne Landscape Supply",
  "Hexcel",
  "FTI Consulting",
  "Party City Holdco",
  "Ohio National Mutual",
  "Patrick Industries",
  "Cadence Design Systems",
  "CDK Global",
  "AvalonBay Communities",
  "Wabash National",
  "Service Properties Trust",
  "Maxim Integrated Products",
  "People's United Financial",
  "Bio-Rad Laboratories",
  "Option Care Health",
  "Louisiana-Pacific",
  "TEGNA",
  "Teradyne",
  "Arch Resources",
  "EPAM Systems",
  "WPX Energy",
  "Alpha Metallurgical Resources",
  "Ensign Group",
  "First Horizon National",
  "Wolverine World Wide",
  "Vail Resorts",
  "Benchmark Electronics",
  "HNI",
  "F5 Networks",
  "Affiliated Managers Group",
  "OGE Energy",
  "Universal",
  "BOK Financial",
  "ManTech International",
  "Summit Materials",
  "AMN Healthcare Services",
  "Groupon",
  "Newmark Group",
  "Fossil Group",
  "Modine Manufacturing",
  "Griffon",
  "Cypress Semiconductor",
  "Generac Holdings",
  "Matson",
  "Genesco",
  "Nordson",
  "NewMarket",
  "Echo Global Logistics",
  "Rexnord",
  "Incyte",
  "Fortinet",
  "Foundation Building Materials",
  "AAR",
  "Centric Brands",
  "Edgewell Personal Care",
  "Federated Mutual Insurance",
  "Schnitzer Steel Industries",
  "Portland General Electric",
  "Gray Television",
  "BGC Partners",
  "EchoStar",
  "Beazer Homes USA",
  "LHC Group",
  "ServiceMaster Global Holdings",
  "Bruker",
  "Oasis Petroleum",
  "CrossAmerica Partners",
  "MYR Group",
  "Viasat",
  "GNC Holdings",
  "Cabot Oil & Gas",
  "Bright Horizons Family Solutions",
  "Vista Outdoor",
  "HEICO",
  "Wyndham Hotels & Resorts",
  "TCF Financial",
  "Primerica",
  "ProPetro Holding",
  "Oceaneering International",
  "Floor & Decor Holdings",
  "Copart",
  "Chico's FAS",
  "Barnes & Noble Education",
  "Maxar Technologies",
  "Evercore",
  "Deckers Outdoor",
  "Express",
  "Hovnanian Enterprises",
  "Air Lease",
  "Rollins",
  "SBA Communications",
  "Deluxe",
  "Mr. Cooper Group",
  "Herc Holdings",
  "Healthpeak Properties",
  "SPX FLOW",
  "Liberty Oilfield Services",
];

module.exports = organisation;

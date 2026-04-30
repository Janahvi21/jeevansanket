export const districts = [
  "Mumbai City", "Mumbai Suburban", "Thane", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg",
  "Pune", "Satara", "Sangli", "Kolhapur", "Solapur",
  "Nashik", "Ahmednagar", "Dhule", "Jalgaon", "Nandurbar",
  "Aurangabad (Chh. Sambhajinagar)", "Jalna", "Beed", "Osmanabad (Dharashiv)", "Latur", "Parbhani", "Hingoli", "Nanded",
  "Nagpur", "Wardha", "Bhandara", "Gondia", "Chandrapur", "Gadchiroli",
  "Amravati", "Akola", "Washim", "Buldhana", "Yavatmal"
];

export const mockHospitals = [
  // 1. MUMBAI CITY
  { id: 1, name: "JJ Hospital", district: "Mumbai City", type: "Government", beds: { icu: 20, oxygen: 50, general: 200 }, phone: "022-23735555", address: "Byculla, Mumbai" },
  { id: 2, name: "Nair Hospital", district: "Mumbai City", type: "Government", beds: { icu: 15, oxygen: 40, general: 150 }, phone: "022-23027000", address: "Mumbai Central" },
  { id: 3, name: "KEM Hospital", district: "Mumbai City", type: "Government", beds: { icu: 25, oxygen: 60, general: 250 }, phone: "022-24107000", address: "Parel, Mumbai" },
  { id: 4, name: "Wockhardt Hospitals", district: "Mumbai City", type: "Private", beds: { icu: 12, oxygen: 30, general: 80 }, phone: "022-61784444", address: "Mumbai Central" },
  { id: 5, name: "Jaslok Hospital", district: "Mumbai City", type: "Private", beds: { icu: 18, oxygen: 45, general: 100 }, phone: "022-66573333", address: "Pedder Road" },
  { id: 6, name: "Sir H. N. Reliance Foundation Hospital", district: "Mumbai City", type: "Private", beds: { icu: 22, oxygen: 55, general: 120 }, phone: "022-61306130", address: "Girgaon, Mumbai" },

  // 2. MUMBAI SUBURBAN
  { id: 7, name: "Rajawadi Hospital", district: "Mumbai Suburban", type: "Government", beds: { icu: 8, oxygen: 20, general: 100 }, phone: "022-25094145", address: "Ghatkopar East" },
  { id: 8, name: "V N Desai Hospital", district: "Mumbai Suburban", type: "Government", beds: { icu: 5, oxygen: 15, general: 80 }, phone: "022-26182081", address: "Santacruz East" },
  { id: 9, name: "Nanavati Max Hospital", district: "Mumbai Suburban", type: "Private", beds: { icu: 30, oxygen: 70, general: 150 }, phone: "022-26267500", address: "Vile Parle West" },
  { id: 10, name: "Gleneagles Hospital", district: "Mumbai Suburban", type: "Private", beds: { icu: 20, oxygen: 40, general: 100 }, phone: "022-67676767", address: "Parel" },

  // 3. THANE
  { id: 11, name: "Civil Hospital Thane", district: "Thane", type: "Government", beds: { icu: 10, oxygen: 30, general: 120 }, phone: "022-25472582", address: "Thane West" },
  { id: 12, name: "Chhatrapati Shivaji Maharaj Hospital", district: "Thane", type: "Government", beds: { icu: 12, oxygen: 35, general: 150 }, phone: "022-25345439", address: "Kalwa, Thane" },
  { id: 13, name: "Jupiter Hospital", district: "Thane", type: "Private", beds: { icu: 25, oxygen: 50, general: 100 }, phone: "022-21725555", address: "Eastern Express Highway" },
  { id: 14, name: "Bethany Hospital", district: "Thane", type: "Private", beds: { icu: 15, oxygen: 30, general: 80 }, phone: "022-21725111", address: "Pokhran Rd" },

  // 4. PALGHAR
  { id: 15, name: "District Civil Hospital Palghar", district: "Palghar", type: "Government", beds: { icu: 5, oxygen: 15, general: 60 }, phone: "02525-252102", address: "Palghar" },
  { id: 16, name: "Sub District Hospital Dahanu", district: "Palghar", type: "Government", beds: { icu: 2, oxygen: 10, general: 40 }, phone: "02528-222030", address: "Dahanu" },

  // 5. RAIGAD
  { id: 18, name: "District Hospital Alibaug", district: "Raigad", type: "Government", beds: { icu: 6, oxygen: 20, general: 80 }, phone: "02141-222003", address: "Alibaug" },
  { id: 19, name: "Sub District Hospital Panvel", district: "Raigad", type: "Government", beds: { icu: 4, oxygen: 15, general: 60 }, phone: "022-27452316", address: "Panvel" },
  { id: 20, name: "MGM Hospital Panvel", district: "Raigad", type: "Private", beds: { icu: 20, oxygen: 40, general: 100 }, phone: "022-27437900", address: "Kamothe" },

  // 8. PUNE
  { id: 26, name: "Sassoon General Hospital", district: "Pune", type: "Government", beds: { icu: 40, oxygen: 100, general: 500 }, phone: "020-26133300", address: "Station Road, Pune" },
  { id: 27, name: "Aundh Government Hospital", district: "Pune", type: "Government", beds: { icu: 15, oxygen: 40, general: 150 }, phone: "020-27280237", address: "Vidyapeeth Rd, Aundh" },
  { id: 28, name: "Civil Hospital Bhosari", district: "Pune", type: "Government", beds: { icu: 5, oxygen: 20, general: 80 }, phone: "09960527557", address: "Bhosari, Pune" },
  { id: 29, name: "Jehangir Hospital", district: "Pune", type: "Private", beds: { icu: 25, oxygen: 60, general: 120 }, phone: "020-66819966", address: "Sassoon Road" },
  { id: 30, name: "Sahyadri Hospital", district: "Pune", type: "Private", beds: { icu: 30, oxygen: 70, general: 150 }, phone: "020-67213000", address: "Kothrud, Pune" },

  // 13. AURANGABAD (Chh. Sambhajinagar)
  { id: 39, name: "GMC & Hospital (Ghati)", district: "Aurangabad (Chh. Sambhajinagar)", type: "Government", beds: { icu: 40, oxygen: 100, general: 500 }, phone: "0240-2402028", address: "Panchakki Road" },
  { id: 40, name: "Govt Emergency Hospital", district: "Aurangabad (Chh. Sambhajinagar)", type: "Government", beds: { icu: 10, oxygen: 30, general: 100 }, phone: "0240-2402012", address: "Naralibag" },
  { id: 41, name: "Apex Hospital", district: "Aurangabad (Chh. Sambhajinagar)", type: "Private", beds: { icu: 8, oxygen: 20, general: 50 }, phone: "0240-2345820", address: "Jalna Road" }
];

export const mockBloodBanks = [
  // Ahmednagar
  { id: 1, name: "Ahmednagar Municipal Council Blood Bank", district: "Ahmednagar", phone: "3972879393", address: "Ahmednagar", inventory: { "A+": 12, "O+": 25, "B+": 15, "AB+": 5, "O-": 2 } },
  { id: 2, name: "Anandrushiji Blood Bank", district: "Ahmednagar", phone: "9422220044", address: "Ahmednagar", inventory: { "A+": 10, "O+": 18, "B+": 12, "AB+": 4, "O-": 1 } },
  { id: 3, name: "General Hospital Blood Bank", district: "Ahmednagar", phone: "8421031944", address: "Ahmednagar", inventory: { "A+": 15, "O+": 30, "B+": 20, "AB+": 6, "O-": 3 } },
  { id: 4, name: "Jankalyan Blood Bank", district: "Ahmednagar", phone: "9028088589", address: "Ahmednagar", inventory: { "A+": 8, "O+": 14, "B+": 10, "AB+": 2, "O-": 1 } },
  { id: 5, name: "Jeevanraj Charitable Foundation", district: "Ahmednagar", phone: "9225570262", address: "Ahmednagar", inventory: { "A+": 11, "O+": 22, "B+": 16, "AB+": 4, "O-": 2 } },

  // Akola
  { id: 6, name: "Dr. B.P. Thakare Blood Bank", district: "Akola", phone: "9422162787", address: "Akola", inventory: { "A+": 9, "O+": 16, "B+": 11, "AB+": 3, "O-": 1 } },
  { id: 7, name: "Government Medical College Hospital", district: "Akola", phone: "9422162787", address: "Akola", inventory: { "A+": 20, "O+": 35, "B+": 25, "AB+": 8, "O-": 4 } },
  { id: 8, name: "Women Hospital Blood Bank", district: "Akola", phone: "9371013322", address: "Akola", inventory: { "A+": 10, "O+": 15, "B+": 12, "AB+": 3, "O-": 1 } },

  // Amravati
  { id: 9, name: "General Hospital Blood Bank", district: "Amravati", phone: "9960616471", address: "Amravati", inventory: { "A+": 14, "O+": 24, "B+": 18, "AB+": 5, "O-": 2 } },

  // Aurangabad
  { id: 10, name: "Dattaji Bhale Blood Bank", district: "Aurangabad (Chh. Sambhajinagar)", phone: "9822284766", address: "Aurangabad", inventory: { "A+": 16, "O+": 28, "B+": 20, "AB+": 6, "O-": 3 } },

  // Beed
  { id: 11, name: "General Hospital Blood Bank", district: "Beed", phone: "Not Available", address: "Beed", inventory: { "A+": 10, "O+": 18, "B+": 14, "AB+": 4, "O-": 2 } },
  { id: 12, name: "Swami Ramanand Rural Medical College", district: "Beed", phone: "9860654455", address: "Beed", inventory: { "A+": 12, "O+": 22, "B+": 15, "AB+": 5, "O-": 2 } },
  { id: 13, name: "Vaidyanath Blood Bank", district: "Beed", phone: "9422242419", address: "Beed", inventory: { "A+": 8, "O+": 15, "B+": 10, "AB+": 3, "O-": 1 } },

  // Bhandara
  { id: 14, name: "Civil Hospital Blood Bank", district: "Bhandara", phone: "8087199759", address: "Bhandara", inventory: { "A+": 11, "O+": 20, "B+": 13, "AB+": 4, "O-": 1 } },

  // Buldhana
  { id: 15, name: "General Hospital Blood Bank", district: "Buldhana", phone: "8693839922", address: "Buldhana", inventory: { "A+": 15, "O+": 25, "B+": 18, "AB+": 5, "O-": 2 } },
  { id: 16, name: "Government Hospital Khamgaon", district: "Buldhana", phone: "7588846831", address: "Khamgaon", inventory: { "A+": 9, "O+": 16, "B+": 11, "AB+": 3, "O-": 1 } },
  { id: 17, name: "Saibai Mote Hospital Blood Bank", district: "Buldhana", phone: "9637870002", address: "Buldhana", inventory: { "A+": 7, "O+": 14, "B+": 9, "AB+": 2, "O-": 1 } },

  // Chandrapur
  { id: 18, name: "General Hospital Blood Bank", district: "Chandrapur", phone: "9766915047", address: "Chandrapur", inventory: { "A+": 12, "O+": 22, "B+": 15, "AB+": 4, "O-": 2 } },

  // Dhule
  { id: 19, name: "Navjeevan Blood Bank", district: "Dhule", phone: "9834918387", address: "Dhule", inventory: { "A+": 10, "O+": 18, "B+": 12, "AB+": 3, "O-": 1 } },
  { id: 20, name: "Shri Bhausaheb Hire GMC Blood Bank", district: "Dhule", phone: "9730758856", address: "Dhule", inventory: { "A+": 18, "O+": 30, "B+": 22, "AB+": 6, "O-": 3 } },

  // Gadchiroli
  { id: 21, name: "General Hospital Blood Bank", district: "Gadchiroli", phone: "7972110876", address: "Gadchiroli", inventory: { "A+": 9, "O+": 15, "B+": 11, "AB+": 3, "O-": 1 } },
  { id: 22, name: "SDH Aheri Blood Bank", district: "Gadchiroli", phone: "9423121760", address: "Aheri", inventory: { "A+": 6, "O+": 10, "B+": 8, "AB+": 2, "O-": 0 } },

  // Gondia
  { id: 23, name: "Bai Gangabai Ladies Hospital", district: "Gondia", phone: "7399551199", address: "Gondia", inventory: { "A+": 11, "O+": 18, "B+": 13, "AB+": 4, "O-": 1 } },

  // Hingoli
  { id: 24, name: "Civil Hospital Blood Bank", district: "Hingoli", phone: "9370695980", address: "Hingoli", inventory: { "A+": 8, "O+": 15, "B+": 10, "AB+": 3, "O-": 1 } },

  // Jalgaon
  { id: 25, name: "General Hospital Blood Bank", district: "Jalgaon", phone: "8208412167", address: "Jalgaon", inventory: { "A+": 14, "O+": 25, "B+": 16, "AB+": 5, "O-": 2 } },
  { id: 26, name: "Indian Red Cross Society", district: "Jalgaon", phone: "9921459583", address: "Jalgaon", inventory: { "A+": 12, "O+": 20, "B+": 14, "AB+": 4, "O-": 2 } },

  // Jalna
  { id: 27, name: "General Hospital Blood Bank", district: "Jalna", phone: "9518784436", address: "Jalna", inventory: { "A+": 10, "O+": 18, "B+": 12, "AB+": 3, "O-": 1 } },

  // Kolhapur
  { id: 28, name: "Arpan Blood Bank", district: "Kolhapur", phone: "9822331729", address: "Kolhapur", inventory: { "A+": 12, "O+": 22, "B+": 15, "AB+": 4, "O-": 2 } },
  { id: 29, name: "CPR General Hospital Blood Bank", district: "Kolhapur", phone: "Not Available", address: "Kolhapur", inventory: { "A+": 20, "O+": 35, "B+": 25, "AB+": 8, "O-": 4 } },
  { id: 30, name: "Municipal Corporation Blood Bank", district: "Kolhapur", phone: "9420493125", address: "Kolhapur", inventory: { "A+": 15, "O+": 25, "B+": 18, "AB+": 5, "O-": 2 } },
  { id: 31, name: "Rajashri Shahu Blood Bank", district: "Kolhapur", phone: "9923138264", address: "Kolhapur", inventory: { "A+": 10, "O+": 18, "B+": 12, "AB+": 3, "O-": 1 } },

  // Latur
  { id: 32, name: "General Hospital Blood Bank", district: "Latur", phone: "7972586634", address: "Latur", inventory: { "A+": 14, "O+": 24, "B+": 16, "AB+": 5, "O-": 2 } },
  { id: 33, name: "IRCS Nagappa Ambarkhane Blood Bank", district: "Latur", phone: "9422185125", address: "Latur", inventory: { "A+": 12, "O+": 20, "B+": 14, "AB+": 4, "O-": 2 } },

  // Nagpur
  { id: 34, name: "Daga Memorial Women Govt Hospital", district: "Nagpur", phone: "9422762492", address: "Nagpur", inventory: { "A+": 16, "O+": 28, "B+": 20, "AB+": 6, "O-": 3 } },
  { id: 35, name: "Indira Gandhi Medical College", district: "Nagpur", phone: "9167655358", address: "Nagpur", inventory: { "A+": 22, "O+": 40, "B+": 30, "AB+": 8, "O-": 4 } },
  { id: 36, name: "Dr. Hedgewar Blood Bank", district: "Nagpur", phone: "9422807636", address: "Nagpur", inventory: { "A+": 15, "O+": 25, "B+": 18, "AB+": 5, "O-": 2 } },
  { id: 37, name: "Government Medical College Blood Bank", district: "Nagpur", phone: "9763421142", address: "Nagpur", inventory: { "A+": 25, "O+": 45, "B+": 35, "AB+": 10, "O-": 5 } },
  { id: 38, name: "Sainath Blood Bank", district: "Nagpur", phone: "07122752000", address: "Nagpur", inventory: { "A+": 12, "O+": 20, "B+": 14, "AB+": 4, "O-": 2 } },
  { id: 39, name: "Super Speciality Hospital Blood Bank", district: "Nagpur", phone: "9346919353", address: "Nagpur", inventory: { "A+": 18, "O+": 32, "B+": 24, "AB+": 6, "O-": 3 } },

  // Nanded
  { id: 40, name: "Government Medical College Blood Bank", district: "Nanded", phone: "9960641251", address: "Nanded", inventory: { "A+": 20, "O+": 35, "B+": 25, "AB+": 8, "O-": 4 } },
  { id: 41, name: "Gurugobind Singhji Blood Bank", district: "Nanded", phone: "9145432525", address: "Nanded", inventory: { "A+": 14, "O+": 24, "B+": 16, "AB+": 5, "O-": 2 } },
  { id: 42, name: "Indian Red Cross Society", district: "Nanded", phone: "8329212171", address: "Nanded", inventory: { "A+": 12, "O+": 20, "B+": 14, "AB+": 4, "O-": 2 } },
  { id: 43, name: "Jeevan Adhar Blood Bank", district: "Nanded", phone: "Not Available", address: "Nanded", inventory: { "A+": 10, "O+": 18, "B+": 12, "AB+": 3, "O-": 1 } },

  // Nandurbar
  { id: 44, name: "Civil Hospital Blood Bank", district: "Nandurbar", phone: "7756984384", address: "Nandurbar", inventory: { "A+": 12, "O+": 22, "B+": 15, "AB+": 4, "O-": 2 } },
  { id: 45, name: "Jankalyan Blood Bank", district: "Nandurbar", phone: "9423905337", address: "Nandurbar", inventory: { "A+": 10, "O+": 18, "B+": 12, "AB+": 3, "O-": 1 } },

  // Nashik
  { id: 46, name: "Arpan Blood Bank", district: "Nashik", phone: "9822324340", address: "Nashik", inventory: { "A+": 14, "O+": 25, "B+": 16, "AB+": 5, "O-": 2 } },
  { id: 47, name: "Civil Hospital Blood Bank", district: "Nashik", phone: "7821024199", address: "Nashik", inventory: { "A+": 18, "O+": 30, "B+": 22, "AB+": 6, "O-": 3 } },
  { id: 48, name: "Jankalyan Blood Bank", district: "Nashik", phone: "9881077957", address: "Nashik", inventory: { "A+": 12, "O+": 20, "B+": 14, "AB+": 4, "O-": 2 } },
  { id: 49, name: "Samta Blood Bank", district: "Nashik", phone: "9975997863", address: "Nashik", inventory: { "A+": 10, "O+": 18, "B+": 12, "AB+": 3, "O-": 1 } },

  // Osmanabad
  { id: 50, name: "General Hospital Blood Bank", district: "Osmanabad (Dharashiv)", phone: "9421352152", address: "Osmanabad", inventory: { "A+": 12, "O+": 22, "B+": 15, "AB+": 4, "O-": 2 } },
  { id: 51, name: "Shrikrishna Blood Bank", district: "Osmanabad (Dharashiv)", phone: "9766083604", address: "Osmanabad", inventory: { "A+": 10, "O+": 18, "B+": 12, "AB+": 3, "O-": 1 } },

  // Parbhani
  { id: 52, name: "General Hospital Blood Bank", district: "Parbhani", phone: "9923070380", address: "Parbhani", inventory: { "A+": 14, "O+": 24, "B+": 16, "AB+": 5, "O-": 2 } },

  // Pune
  { id: 53, name: "Akshay Blood Bank", district: "Pune", phone: "9890244339", address: "Pune", inventory: { "A+": 12, "O+": 20, "B+": 14, "AB+": 4, "O-": 2 } },
  { id: 54, name: "Jankalyan Blood Bank", district: "Pune", phone: "9527768755", address: "Pune", inventory: { "A+": 18, "O+": 30, "B+": 22, "AB+": 6, "O-": 3 } },
  { id: 55, name: "KEM Hospital Blood Bank", district: "Pune", phone: "9823955650", address: "Pune", inventory: { "A+": 22, "O+": 40, "B+": 30, "AB+": 8, "O-": 4 } },
  { id: 56, name: "Sassoon General Hospital", district: "Pune", phone: "9372787100", address: "Pune", inventory: { "A+": 25, "O+": 45, "B+": 35, "AB+": 10, "O-": 5 } }
];

export const mockAmbulances = [
  // MUMBAI / THANE REGION
  { id: 1, driver: "Ramesh Patil (Senior Paramedic)", phone: "9820700900", district: "Mumbai Suburban", status: "Available", location: "Andheri, Mumbai", provider: "MedCare Ambulance Service" },
  { id: 2, driver: "Amit Shah (Driver + EMT)", phone: "9768078078", district: "Thane", status: "Available", location: "Thane", provider: "MATS Ambulance" },
  { id: 3, driver: "Suresh Tavaria (Operator)", phone: "022-22621666", district: "Mumbai City", status: "Available", location: "Fort, Mumbai", provider: "Parsi Ambulance Service" },
  { id: 4, driver: "Rajesh Yadav (BLS)", phone: "9284867004", district: "Thane", status: "Available", location: "Navi Mumbai", provider: "Maharashtra Ambulance Services" },
  { id: 5, driver: "Vikas Singh (ICU Staff)", phone: "9326817693", district: "Thane", status: "Available", location: "Dombivli", provider: "Star Health Care Ambulance" },
  { id: 6, driver: "Imran Shaikh (Paramedic)", phone: "9969547001", district: "Mumbai City", status: "Available", location: "Mumbai", provider: "MATS Ambulance" },
  { id: 7, driver: "Deepak More (ALS Driver)", phone: "9969547002", district: "Thane", status: "Available", location: "Thane" },
  { id: 8, driver: "Kiran Pawar (BLS Driver)", phone: "9920200800", district: "Mumbai City", status: "Available", location: "Mumbai", provider: "MedCare" },

  // STATEWIDE / GOVERNMENT
  { id: 9, driver: "Emergency Response Unit (Govt)", phone: "108", district: "All", status: "Available", location: "Maharashtra (Auto Dispatch)", provider: "Govt Emergency Ambulance" },

  // ADDITIONAL
  { id: 10, driver: "Sunil Jadhav", phone: "9820700900", district: "Mumbai City", status: "Available", location: "Mumbai Central" },
  { id: 11, driver: "Prakash Patil (Paramedic)", phone: "9969547003", district: "Thane", status: "Available", location: "Navi Mumbai" },
  { id: 12, driver: "Nitin Shinde", phone: "9768079079", district: "Thane", status: "Available", location: "Thane" },
  { id: 13, driver: "Mahesh More (ICU Ambulance)", phone: "9969547004", district: "Mumbai City", status: "Available", location: "Dadar" },
  { id: 14, driver: "Rohit Kale (Emergency Driver)", phone: "9820700900", district: "Mumbai Suburban", status: "Available", location: "Kurla" },
  { id: 15, driver: "Ganesh Pawar", phone: "9284867004", district: "Raigad", status: "Available", location: "Panvel" },
  { id: 16, driver: "Santosh Kadam (Paramedic)", phone: "9326817693", district: "Thane", status: "Available", location: "Kalyan" },
  { id: 17, driver: "Ajay Deshmukh", phone: "9820700900", district: "Pune", status: "Available", location: "Pune (Intercity)" },
  { id: 18, driver: "Vijay Salunkhe", phone: "9969547001", district: "Nashik", status: "Available", location: "Nashik Route" },
  { id: 19, driver: "Anil Shinde (Emergency Staff)", phone: "9969547002", district: "Aurangabad (Chh. Sambhajinagar)", status: "Available", location: "Aurangabad Route" },
  { id: 20, driver: "Rakesh Gupta", phone: "9768078078", district: "Nagpur", status: "Available", location: "Nagpur Route" },
  { id: 21, driver: "Sameer Khan (Paramedic)", phone: "9820700900", district: "Solapur", status: "Available", location: "Solapur Route" },
  { id: 22, driver: "Pankaj Yadav", phone: "9969547003", district: "Kolhapur", status: "Available", location: "Kolhapur Route" },
  { id: 23, driver: "Arjun Patil", phone: "9969547004", district: "Sangli", status: "Available", location: "Sangli Route" },
  { id: 24, driver: "Sanjay More (Emergency Driver)", phone: "9326817693", district: "Satara", status: "Available", location: "Satara Route" },
  { id: 25, driver: "Rahul Pawar", phone: "9284867004", district: "Jalgaon", status: "Available", location: "Jalgaon Route" },
  { id: 26, driver: "Shubham Jagtap", phone: "9768079079", district: "Latur", status: "Available", location: "Latur Route" },
  { id: 27, driver: "Tejas Patil", phone: "9969547001", district: "Nanded", status: "Available", location: "Nanded Route" }
];

export const mockDonors = [
  // Original mock data
  { id: 1, name: "Rahul Deshmukh", bloodGroup: "O+", district: "Mumbai City", phone: "9998887776", available: true },
  { id: 2, name: "Priya Sharma", bloodGroup: "A+", district: "Pune", phone: "9998887775", available: true },
  { id: 3, name: "Vikram Singh", bloodGroup: "B+", district: "Nagpur", phone: "9998887774", available: false },

  // Nagpur Blood Donation Camp Donors
  { id: "L18-T03349", name: "Nishant Vasanta Mange", bloodGroup: "O+", district: "Nagpur", phone: "9881264983", available: true },
  { id: "L18-T03348", name: "Mayur Gavde", bloodGroup: "O+", district: "Nagpur", phone: "9405437894", available: true },
  { id: "L18-D16217", name: "Sahil Dilip Waghmare", bloodGroup: "A+", district: "Nagpur", phone: "9518764184", available: true },
  { id: "L18-D16216", name: "Aditya Dhote", bloodGroup: "A+", district: "Nagpur", phone: "8459786527", available: true },
  { id: "L18-D16225", name: "Rushikesh Kamble", bloodGroup: "B+", district: "Nagpur", phone: "7796101790", available: true },
  { id: "L18-T03501", name: "Yugendra Arvind Watekar", bloodGroup: "B+", district: "Nagpur", phone: "9860113259", available: true },
  { id: "L18-T03502", name: "Nilesh S. Sonekar", bloodGroup: "O+", district: "Nagpur", phone: "8625945006", available: true },
  { id: "L18-D16218", name: "Rushikesh Vishwakarma", bloodGroup: "O+", district: "Nagpur", phone: "7745862977", available: true },
  { id: "L18-D16706", name: "Mukesh Sharma", bloodGroup: "O+", district: "Nagpur", phone: "9049330287", available: true },
  { id: "L18-T03500", name: "Ankit Deshmukh", bloodGroup: "O+", district: "Nagpur", phone: "7058292083", available: true },
  { id: "L18-T03505", name: "Prashik Ajay Landge", bloodGroup: "O+", district: "Nagpur", phone: "7058252083", available: true },
  { id: "L18-D16709", name: "Akshay Gajanan Tarale", bloodGroup: "B+", district: "Nagpur", phone: "8665845078", available: true },
  { id: "L18-T03498", name: "Chetan Nagpurkar", bloodGroup: "O+", district: "Nagpur", phone: "7038133873", available: true },
  { id: "L18-T03504", name: "Prabhat Raman Jha", bloodGroup: "A-", district: "Nagpur", phone: "9604027459", email: "jhap3674@gmail.com", available: true },
  { id: "L18-D16224", name: "Laxmi Mandlekar", bloodGroup: "B+", district: "Nagpur", phone: "8554866845", available: true },
  { id: "L18-D16230", name: "Kshitij Pramod Gawande", bloodGroup: "O+", district: "Nagpur", phone: "8308063603", available: true },
  { id: "L18-103347", name: "Gajanan Jadhav", bloodGroup: "AB+", district: "Nagpur", phone: "9623724657", available: true },
  { id: "L18-D16708", name: "Jagdish Bhagwandas Rankawat", bloodGroup: "A+", district: "Nagpur", phone: "9923440175", available: true },
  { id: "L18-D16704", name: "Vikrant Wasnik", bloodGroup: "B+", district: "Nagpur", phone: "9766967848", available: true },
  { id: "L18-103503", name: "Sumit P. Mohod", bloodGroup: "AB+", district: "Nagpur", phone: "9595410016", available: true },
  { id: "L18-703499", name: "Yogesh Kisan Raut", bloodGroup: "A+", district: "Nagpur", phone: "8421353307", available: true },
  { id: "L18-T03496", name: "Akshay Manohar Bilwar", bloodGroup: "A+", district: "Nagpur", phone: "8329003536", available: true },
  { id: "L18-D16223", name: "Surendra Baghel", bloodGroup: "O+", district: "Nagpur", phone: "9604586848", available: true },
  { id: "L18-D16707", name: "Prashant Shravan Piparikar", bloodGroup: "A+", district: "Nagpur", phone: "8600433261", available: true },
  { id: "L18-016705", name: "Ishika Jaiswal", bloodGroup: "B+", district: "Nagpur", phone: "9730453180", available: true },
  { id: "L18-703497", name: "Omkar Prakash Umathe", bloodGroup: "B+", district: "Nagpur", phone: "8446761521", email: "omkar3214@gmail.com", available: true },
  { id: "L18-P00575", name: "Aniket Dashrath Naitamkar", bloodGroup: "B+", district: "Nagpur", phone: "9158384135", email: "anaitam786@gmail.com", available: true },
  { id: "L18-103494", name: "Rajendra Vitthalrao Zunzunkar", bloodGroup: "B+", district: "Nagpur", phone: "9923356861", available: true },
  { id: "L18-T03493", name: "Rahul Bansilalji Telang", bloodGroup: "B+", district: "Nagpur", phone: "7775951322", email: "rahultelang0087@gmail.com", available: true },
  { id: "L18-T03492", name: "Rajendra Gaikawad", bloodGroup: "A+", district: "Nagpur", phone: "8446994707", available: true }
];

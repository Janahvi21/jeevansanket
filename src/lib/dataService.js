import { db } from './firebase';
import { collection, getDocs, getCountFromServer } from 'firebase/firestore';

export const fetchHospitals = async () => {
  const querySnapshot = await getDocs(collection(db, 'hospitals'));
  
  return querySnapshot.docs.map(doc => {
    const h = doc.data();
    return {
      id: doc.id,
      name: h.name,
      type: h.type,
      district: h.district,
      address: h.address,
      phone: h.phone,
      beds: {
        icu: h.beds_icu || 0,
        oxygen: h.beds_oxygen || 0,
        general: h.beds_general || 0
      }
    };
  });
};

export const fetchBloodBanks = async () => {
  const querySnapshot = await getDocs(collection(db, 'blood_banks'));
  
  return querySnapshot.docs.map(doc => {
    const b = doc.data();
    return {
      id: doc.id,
      name: b.name,
      district: b.district,
      address: b.address,
      phone: b.phone,
      inventory: {
        "A+": b.inventory_a_pos || 0,
        "A-": b.inventory_a_neg || 0,
        "B+": b.inventory_b_pos || 0,
        "B-": b.inventory_b_neg || 0,
        "O+": b.inventory_o_pos || 0,
        "O-": b.inventory_o_neg || 0,
        "AB+": b.inventory_ab_pos || 0,
        "AB-": b.inventory_ab_neg || 0
      }
    };
  });
};

export const fetchAmbulances = async () => {
  const querySnapshot = await getDocs(collection(db, 'ambulances'));
  
  return querySnapshot.docs.map(doc => {
    const a = doc.data();
    return {
      id: doc.id,
      driver: a.driver,
      vehicleNumber: a.vehicle_number,
      phone: a.phone,
      district: a.district,
      location: a.location,
      status: a.status,
      provider: a.provider
    };
  });
};

export const fetchDonors = async () => {
  const querySnapshot = await getDocs(collection(db, 'donors'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const fetchCounts = async () => {
  const [h, b, a, d] = await Promise.all([
    getCountFromServer(collection(db, 'hospitals')),
    getCountFromServer(collection(db, 'blood_banks')),
    getCountFromServer(collection(db, 'ambulances')),
    getCountFromServer(collection(db, 'donors'))
  ]);
  
  return {
    hospitals: h.data().count || 0,
    bloodBanks: b.data().count || 0,
    ambulances: a.data().count || 0,
    donors: d.data().count || 0
  };
};

import {
  Appointment,
  ClinicScheduleSettings,
  DoctorCredentials,
  GalleryItem,
  ReviewItem,
  ServiceItem,
} from '../types';

export const INITIAL_DOCTOR_CREDENTIALS: DoctorCredentials = {
  username: 'drbhagyashree',
  passwordHash: 'SmileCare2026!',
  doctorName: 'Dr. Bhagyashree Y Jagtap',
  title: 'B.D.S. (Multispeciality Dental Surgeon & Implantologist)',
  email: 'dr.bhagyashree.jagtap@gmail.com',
  phone: '+91 93258 18057',
  googleCalendarSyncEmail: 'clinic.familydental@gmail.com',
  clinicAddress:
    '1st Floor, Above City Medical, Near Father Agnel Multipurpose School, Chinchpada Chowk, Ambernath West, Maharashtra 421501',
  lastUpdated: new Date().toISOString(),
};

export const INITIAL_SCHEDULE_SETTINGS: ClinicScheduleSettings = {
  morningStart: '10:00',
  morningEnd: '14:00',
  eveningStart: '17:00',
  eveningEnd: '21:30',
  slotDurationMinutes: 30,
  sundayOpen: true,
  sundayStart: '10:00',
  sundayEnd: '13:00',
  blockedDates: [],
  blockedSlots: [],
};

export const DENTAL_SERVICES: ServiceItem[] = [
  {
    id: 'rct',
    title: 'Root Canal Treatment (RCT)',
    iconName: 'Activity',
    shortDesc:
      'Painless, computer-assisted rotary endodontics. Single-sitting options available for rapid toothache relief.',
    duration: '45 - 60 mins',
    priceEstimate: '₹2,500 - ₹4,500',
    benefits: [
      'Digital apex locator precision',
      'Painless motorized rotary files',
      'Single-sitting completion in select cases',
      'Preserves natural tooth structure',
    ],
    recommendedFor: 'Severe tooth pain, sensitivity to hot/cold, deep decay, broken tooth.',
  },
  {
    id: 'implants',
    title: 'Dental Implants & Fixed Teeth',
    iconName: 'ShieldCheck',
    shortDesc:
      'Permanent titanium & ceramic tooth replacement that look, feel, and function just like natural teeth.',
    duration: '45 mins (Per stage)',
    priceEstimate: '₹20,000 - ₹35,000',
    benefits: [
      'Biocompatible grade-5 titanium fixtures',
      'Lifetime durability & osseointegration',
      'No trimming needed on adjacent teeth',
      'Restores full chewing power',
    ],
    recommendedFor: 'Missing teeth, loose dentures, gaps affecting smile or chewing.',
  },
  {
    id: 'aligners',
    title: 'Braces & Invisible Clear Aligners',
    iconName: 'Sparkles',
    shortDesc:
      'Straighten crooked or misaligned teeth discreetly with modern clear aligners or ceramic braces.',
    duration: '30 mins (Monthly checks)',
    priceEstimate: '₹35,000 - ₹85,000',
    benefits: [
      'Removable transparent trays',
      'Zero dietary restrictions',
      'Digital 3D simulation of results',
      'Metal-free, comfortable edges',
    ],
    recommendedFor: 'Crowded teeth, gaps, bite misalignment, overbite/underbite.',
  },
  {
    id: 'cosmetic',
    title: 'Smile Designing & Veneers',
    iconName: 'Smile',
    shortDesc:
      'Custom porcelain laminates, cosmetic composite bonding, and diode laser gum contouring.',
    duration: '45 mins',
    priceEstimate: '₹4,000 - ₹12,000 / tooth',
    benefits: [
      'Ultra-thin custom porcelain veneers',
      'Natural translucency & shade matching',
      'Instant transformation in 2 visits',
      'Stain-resistant aesthetic finish',
    ],
    recommendedFor: 'Discolored, chipped, unevenly sized teeth, or gummy smiles.',
  },
  {
    id: 'crowns',
    title: 'CAD/CAM Zirconia Crowns & Bridges',
    iconName: 'Crown',
    shortDesc:
      'Computer-milled monolithic zirconia and ceramic crowns with natural aesthetics and high fracture resistance.',
    duration: '30 mins',
    priceEstimate: '₹3,000 - ₹8,500',
    benefits: [
      'Metal-free biocompatible Zirconia',
      '5 to 15-year warranty options',
      'Digital precision margin fit',
      'Zero dark line near gum line',
    ],
    recommendedFor: 'Post-RCT teeth, heavily restored teeth, bridge tooth replacement.',
  },
  {
    id: 'scaling',
    title: 'Ultrasonic Scaling & Teeth Whitening',
    iconName: 'Zap',
    shortDesc:
      'Gentle piezoelectric plaque removal and in-office dental bleaching for a brighter, sparkling smile.',
    duration: '30 - 45 mins',
    priceEstimate: '₹1,000 - ₹5,000',
    benefits: [
      'Deep stain and tartar eradication',
      'Up to 6-8 shades whiter in 1 hour',
      'Safe on enamel & gum tissue',
      'Includes fluoride polish finish',
    ],
    recommendedFor: 'Bleeding gums, bad breath, tea/coffee/tobacco stains, yellow teeth.',
  },
  {
    id: 'pediatric',
    title: 'Kids & Family Preventive Dentistry',
    iconName: 'HeartHandshake',
    shortDesc:
      'Child-friendly, anxiety-free dentistry including painless cavity fillings, fluoride varnishes, and pit-and-fissure sealants.',
    duration: '30 mins',
    priceEstimate: '₹800 - ₹2,000',
    benefits: [
      'Gentle, reassuring approach for children',
      'Preventive pit & fissure sealing',
      'Habit-breaking orthodontic appliances',
      'Teeth-decay defense program',
    ],
    recommendedFor: 'Children aged 2+, early cavity prevention, routine family dental hygiene.',
  },
  {
    id: 'surgery',
    title: 'Wisdom Tooth Surgical Extraction',
    iconName: 'Stethoscope',
    shortDesc:
      'Minimally invasive removal of impacted third molars using gentle local anesthesia and atraumatic surgical techniques.',
    duration: '45 - 60 mins',
    priceEstimate: '₹3,000 - ₹6,000',
    benefits: [
      'Local painless anesthesia block',
      'Atraumatic bone preservation',
      'Fast recovery & follow-up care',
      'Relieves jaw swelling & headache',
    ],
    recommendedFor: 'Impacted wisdom teeth, jaw pain, recurrent cheek biting, pericoronitis.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'operatory-1',
    title: 'Ergonomic Dental Operatory Suite',
    category: 'operatory',
    categoryLabel: 'Operatory & Chairs',
    imageUrl:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    description:
      'Ultra-modern pneumatic dental operatory chair equipped with shadowless LED sensor illumination, integrated fiber-optic handpieces, and real-time patient monitors.',
    highlights: [
      'Ergonomic memory foam patient upholstery',
      'Integrated intraoral camera live feed display',
      'Quiet, vibration-dampened dental micro-motors',
      'Aseptic touch-free control panel',
    ],
  },
  {
    id: 'operatory-2',
    title: 'Secondary Treatment & Hygiene Operatory',
    category: 'operatory',
    categoryLabel: 'Operatory & Chairs',
    imageUrl:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    description:
      'Dedicated operatory designed for ultrasonic scaling, teeth whitening, and preventive hygiene visits with a spacious, tranquil clinical atmosphere.',
    highlights: [
      'Gentle piezoelectric ultrasonic scaler',
      'In-office cold blue-light LED bleaching system',
      'High-volume aerosol evacuation suction',
      'Calming ambient lighting to eliminate anxiety',
    ],
  },
  {
    id: 'technology-1',
    title: 'Digital RVG & Low-Radiation Radiography Unit',
    category: 'technology',
    categoryLabel: 'Technology & Diagnostics',
    imageUrl:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    description:
      'High-resolution Digital RVG sensor delivering instant diagnostic X-rays on screen within 3 seconds, utilizing up to 80% lower radiation than traditional film.',
    highlights: [
      'Instant digital imaging with sub-millimeter clarity',
      'Safe for patients of all age groups',
      'Direct software enhancement for root apex analysis',
      'Eco-friendly, chemical-free processing',
    ],
  },
  {
    id: 'sterilization-1',
    title: 'Hospital-Grade Class-B Autoclave & Sterilization Hub',
    category: 'sterilization',
    categoryLabel: 'Sterilization & Hygiene',
    imageUrl:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    description:
      'Strict 5-step infection control protocol: Ultrasonic cleaning, enzymatic wash, individual medical pouch sealing, Class-B vacuum autoclaving, and UV cabinet storage.',
    highlights: [
      '100% sterile, single-use sealed instrument pouches',
      'Chemical and biological spore indicator monitoring',
      'UV germicidal chamber storage',
      'Rigorous cross-contamination barriers',
    ],
  },
  {
    id: 'reception-1',
    title: 'Welcoming Reception & Patient Lounge',
    category: 'reception',
    categoryLabel: 'Reception & Waiting',
    imageUrl:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    description:
      'A warm, spotless, and relaxed greeting area designed to make every family member feel comfortable before their appointment.',
    highlights: [
      'Comfortable plush waiting seating',
      'Sanitized hydration station & magazines',
      'Dedicated appointment check-in desk',
      'Air-conditioned, pleasant scent-diffused ambiance',
    ],
  },
  {
    id: 'consultation-1',
    title: 'Smile Consultation & Digital Discussion Room',
    category: 'technology',
    categoryLabel: 'Technology & Diagnostics',
    imageUrl:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    description:
      'Doctor private discussion desk where patients review their 3D scans, tooth status, before-and-after smile designs, and step-by-step treatment plans.',
    highlights: [
      'Transparent treatment discussion with 3D tooth models',
      'Detailed cost and procedure breakdown',
      'Patient education videos and interactive charts',
      'Zero-rush, compassionate listening',
    ],
  },
];

export const PATIENT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Rohit Deshmukh',
    rating: 5,
    date: '2 weeks ago',
    treatment: 'Root Canal Treatment & Zirconia Crown',
    reviewText:
      'I was terrified of getting a root canal done after a bad past experience elsewhere, but Dr. Bhagyashree Jagtap made it 100% painless! She explained every single step beforehand. The clinic is exceptionally neat, clean, and follows top-notch sterilization.',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Pooja Tiwari',
    rating: 5,
    date: '1 month ago',
    treatment: 'Teeth Cleaning & Smile Designing',
    reviewText:
      'Highly professional multispeciality clinic in Ambernath! The appointment started right on time without any waiting. The doctor is very patient, gentle, and charges very reasonably. Highly recommended for families.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Suresh Patil',
    rating: 5,
    date: '1 month ago',
    treatment: 'Dental Implant & Fixed Bridge',
    reviewText:
      'Got two dental implants placed by Dr. Bhagyashree. The surgery was smooth with minimal swelling. Now I can chew comfortably again. Best dental surgeon in the Ambernath-Ulhasnagar belt.',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Neha Chawla',
    rating: 5,
    date: '2 months ago',
    treatment: 'Kids Dentistry (Cavity Filling for 6yr old)',
    reviewText:
      'Dr. Bhagyashree was so sweet and patient with my 6-year-old daughter. She didn’t cry even for a second! The clinic has such a warm and reassuring environment. Family Dental Care is truly true to its name.',
    verified: true,
  },
];

// Seed initial realistic appointments for today and upcoming days
const todayStr = new Date().toISOString().split('T')[0];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];

const dayAfter = new Date();
dayAfter.setDate(dayAfter.getDate() + 2);
const dayAfterStr = dayAfter.toISOString().split('T')[0];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'FDC-101',
    patientName: 'Anil Kulkarni',
    patientPhone: '+91 98201 44521',
    patientEmail: 'anil.kulkarni@gmail.com',
    patientAge: 48,
    treatment: 'Root Canal Treatment (RCT)',
    date: todayStr,
    timeSlot: '10:30 AM',
    durationMinutes: 45,
    status: 'arrived',
    chiefComplaint: 'Severe throbbing pain in lower left molar (#36) while chewing, sensitive to cold water.',
    isEmergency: false,
    isFirstVisit: false,
    createdAt: '2026-10-08T09:15:00Z',
    clinicalNotes: {
      id: 'cn-101',
      appointmentId: 'FDC-101',
      patientName: 'Anil Kulkarni',
      date: todayStr,
      toothNumber: '#36 (Lower Left First Molar)',
      diagnosis: 'Irreversible Pulpitis with apical tenderness.',
      treatmentRendered: 'Access cavity prepared under 2% Lignocaine. Working length determined (MB: 20mm, ML: 20mm, D: 21mm) via RVG and Apex Locator. Biomechanical preparation completed up to 25/04 rotary. Calcium hydroxide closed dressing placed.',
      prescriptions: [
        'Tab. Augmentin 625mg (1-0-1 x 5 days)',
        'Tab. Zerodol-SP (1-0-1 SOS after food)',
        'Cap. Pantocid 40mg (1-0-0 before breakfast x 5 days)',
      ],
      nextVisit: tomorrowStr,
      estimatedCost: 3500,
      paymentStatus: 'partial',
      doctorRemarks: 'Patient reported immediate relief after pulp extirpation. Schedule obturation on next appointment.',
    },
  },
  {
    id: 'FDC-102',
    patientName: 'Sunita Sharma',
    patientPhone: '+91 97692 38190',
    patientEmail: 'sunita.sharma@yahoo.co.in',
    patientAge: 34,
    treatment: 'CAD/CAM Zirconia Crowns & Bridges',
    date: todayStr,
    timeSlot: '11:45 AM',
    durationMinutes: 30,
    status: 'confirmed',
    chiefComplaint: 'Post-RCT crown trial and final cementation for upper right premolar (#15).',
    isEmergency: false,
    isFirstVisit: false,
    createdAt: '2026-10-09T14:20:00Z',
    clinicalNotes: {
      id: 'cn-102',
      appointmentId: 'FDC-102',
      patientName: 'Sunita Sharma',
      date: todayStr,
      toothNumber: '#15 (Upper Right Second Premolar)',
      diagnosis: 'Endodontically treated tooth requiring coronal coverage.',
      treatmentRendered: 'CAD/CAM monolithic multilayered Zirconia crown checked for margin seating, proximal contact, and occlusion. Cemented permanently with RelyX U200 resin cement.',
      prescriptions: ['Warm saline rinses 3 times a day starting tomorrow.'],
      nextVisit: '2026-10-25',
      estimatedCost: 6500,
      paymentStatus: 'paid',
      doctorRemarks: 'Aesthetic shade A2 matched accurately with adjacent teeth. Good marginal seal.',
    },
  },
  {
    id: 'FDC-103',
    patientName: 'Rahul Verma',
    patientPhone: '+91 93240 18872',
    patientEmail: 'rahul.v@rediffmail.com',
    patientAge: 26,
    treatment: 'Wisdom Tooth Surgical Extraction',
    date: todayStr,
    timeSlot: '05:30 PM',
    durationMinutes: 60,
    status: 'confirmed',
    chiefComplaint: 'Swelling and pain around partially erupted lower right wisdom tooth (#48).',
    isEmergency: true,
    isFirstVisit: true,
    createdAt: '2026-10-10T08:00:00Z',
  },
  {
    id: 'FDC-104',
    patientName: 'Meera Iyer',
    patientPhone: '+91 99304 55120',
    patientEmail: 'meera.iyer@outlook.com',
    patientAge: 41,
    treatment: 'Ultrasonic Scaling & Teeth Whitening',
    date: todayStr,
    timeSlot: '07:00 PM',
    durationMinutes: 45,
    status: 'confirmed',
    chiefComplaint: 'Bleeding gums while brushing in morning, generalized tartar deposits.',
    isEmergency: false,
    isFirstVisit: true,
    createdAt: '2026-10-09T17:45:00Z',
  },
  {
    id: 'FDC-105',
    patientName: 'Devendra Shinde',
    patientPhone: '+91 98920 11234',
    patientEmail: 'd.shinde@gmail.com',
    patientAge: 52,
    treatment: 'Dental Implants & Fixed Teeth',
    date: tomorrowStr,
    timeSlot: '11:00 AM',
    durationMinutes: 45,
    status: 'confirmed',
    chiefComplaint: 'Second stage healing abutment placement for lower right molar implant.',
    isEmergency: false,
    isFirstVisit: false,
    createdAt: '2026-10-07T12:00:00Z',
  },
  {
    id: 'FDC-106',
    patientName: 'Aarav Gupta',
    patientPhone: '+91 98190 77622',
    patientEmail: 'priya.gupta@gmail.com',
    patientAge: 8,
    treatment: 'Kids & Family Preventive Dentistry',
    date: tomorrowStr,
    timeSlot: '06:00 PM',
    durationMinutes: 30,
    status: 'confirmed',
    chiefComplaint: 'Black discoloration in milk molar teeth, food lodgement.',
    isEmergency: false,
    isFirstVisit: true,
    createdAt: '2026-10-09T18:10:00Z',
  },
  {
    id: 'FDC-107',
    patientName: 'Snehal More',
    patientPhone: '+91 90040 22319',
    patientEmail: 'snehal.more@gmail.com',
    patientAge: 24,
    treatment: 'Braces & Invisible Clear Aligners',
    date: dayAfterStr,
    timeSlot: '05:00 PM',
    durationMinutes: 45,
    status: 'confirmed',
    chiefComplaint: 'Consultation for clear aligners for upper anterior spacing.',
    isEmergency: false,
    isFirstVisit: true,
    createdAt: '2026-10-10T10:00:00Z',
  },
];

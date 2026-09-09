const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Apne models aur helpers ko yahan import karo (jo tumhare project mein hain)
const StreamDetails = require('./src/models/StreamDetails');
const DegreeCategory = require('./src/models/DegreeCategory');
const Degree = require('./src/models/Degree');
const Diploma = require('./src/models/Diploma');
const College = require('./src/models/College');
const Exam = require('./src/models/Exam');

const streamsData = require('./seed-data/streamDetails.json');
const examsData = require('./seed-data/exams.json');

// Diploma JSON files
const pcmDiplomas = require('./seed-data/diplomas-pcm.json');
const pcbDiplomas = require('./seed-data/diplomas-pcb.json');
const commerceDiplomas = require('./seed-data/diplomas-commerce.json');
const artsDiplomas = require('./seed-data/diplomas-arts.json');

const { wordStart } = require('./src/utils/queryHelpers'); 


dotenv.config();

const STREAM_TAGS = {
  'categories-pcm': ['PCM', 'PCMB'],
  'categories-pcb': ['PCB', 'PCMB'],
  'categories-pcmb': ['PCMB'],
  'categories-commerce': ['Commerce'],
  'categories-arts': ['Arts'],
};

// const DIPLOMA_STREAM_TAGS = {
//   'diplomas-pcm': ['PCM', 'PCMB'],
//   'diplomas-pcb': ['PCB', 'PCMB'],
//   'diplomas-commerce': ['Commerce'],
//   'diplomas-arts': ['Arts'],
// };

const loadSeedFiles = (prefix) => {
  const folder = path.join(__dirname, 'seed-data');
  const files = fs.readdirSync(folder).filter((f) => f.startsWith(prefix) && f.endsWith('.json'));
  let data = [];
  for (const file of files) data = data.concat(require(path.join(folder, file)));
  return data;
};

//diploma stream add karne ka helper function
const addStreamToDiplomas = (diplomas, streamName) => {
  return diplomas.map((diploma) => ({
    ...diploma,
    stream: streamName.toLowerCase(),
  }));
};

/* ---------- SMART COLLEGE RESOLVER (THE MAGIC) ---------- */
// Ye function naam ko clean karta hai (e.g., "IIT, Bombay" -> "iitbombay")
const normalize = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');

const guessType = (name) => {
  const gov = /(iit|nit|niser|iisc|iiser|university of|government|govt|national institute|nift|fddi|ihm|cusat|anna university|jadavpur|banaras|bhu|amu|jamia|punjab university|pune university|sppu|pondicherry|kurukshetra|aligarh|lucknow university|goa university|calcutta|school of planning|maritime|imu|meri|spa)/i;
  return gov.test(name) ? 'government' : 'private';
};

let collegeLookup = [];
let autoCreatedCount = 0;

const buildCollegeLookup = async () => {
  const all = await College.find({}, { name: 1 });
  collegeLookup = all.map((c) => ({ id: c._id, norm: normalize(c.name) }));
};

const resolveColleges = async (names = []) => {
  const ids = [];
  const seen = new Set();
  
  for (const raw of names) {
    const name = String(raw).trim();
    if (!name) continue;

    // 1. Exact Match
    let college = await College.findOne({ name });

    // 2. Normalized Match (Space, comma, brackets ignore karke match karega)
    if (!college) {
      const norm = normalize(name);
      const hit = collegeLookup.find((c) => c.norm === norm);
      if (hit) college = await College.findById(hit.id);
    }

    // 3. Auto-Create (Agar sach mein naya hai, toh bana do aur link kar do)
    if (!college) {
      const type = guessType(name);
      college = await College.create({ name, type });
      collegeLookup.push({ id: college._id, norm: normalize(name) });
      autoCreatedCount++;
    }

    const key = college._id.toString();
    if (!seen.has(key)) { 
      seen.add(key); 
      ids.push(college._id); 
    }
  }
  return ids;
};

/* ---------- MAIN SEED FUNCTION ---------- */
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected...');

    // Purana data clear
    await Degree.deleteMany();
    await DegreeCategory.deleteMany();
    await StreamDetails.deleteMany();
    await Diploma.deleteMany();
    await College.deleteMany();
    await Exam.deleteMany();
    console.log('🗑️ Purana data clear ho gaya\n');

    // 1. Streams
    const insertedStreams = await StreamDetails.insertMany(streamsData);
    console.log(`✅ ${insertedStreams.length} Streams seeded`);

    const seedFolder = path.join(__dirname, 'seed-data');

    // 2. Exams
    if (examsData && examsData.length > 0) {
      await Exam.insertMany(examsData);
      console.log(`✅ ${examsData.length} National Exams seeded`);
      
      // Optional: Stream-wise count dikhane ke liye console me
      const pcmCount = examsData.filter(e => e.stream === 'pcm').length;
      const pcbCount = examsData.filter(e => e.stream === 'pcb').length;
      const commCount = examsData.filter(e => e.stream === 'commerce').length;
      const artsCount = examsData.filter(e => e.stream === 'arts').length;
      console.log(`   (PCM: ${pcmCount}, PCB: ${pcbCount}, Commerce: ${commCount}, Arts: ${artsCount})`);
    }

    // 3. Categories
    const catFiles = fs.readdirSync(seedFolder).filter((f) => f.startsWith('categories-') && f.endsWith('.json'));
    let totalCategories = 0;
    for (const file of catFiles) {
      const prefix = file.replace('.json', '');
      const streamNames = STREAM_TAGS[prefix] || [];
      if (streamNames.length === 0) continue;

      const streamIds = [];
      for (const sn of streamNames) {
        const stream = await StreamDetails.findOne({ name: wordStart(sn) });
        if (stream) streamIds.push(stream._id);
      }

      const fileData = require(path.join(seedFolder, file));
      for (const cat of fileData) { cat.streams = streamIds; delete cat.stream; }
      if (fileData.length > 0) {
        await DegreeCategory.insertMany(fileData);
        totalCategories += fileData.length;
      }
    }
    console.log(`✅ ${totalCategories} Categories seeded`);

    // 4. Degrees
    const degreeGroups = loadSeedFiles('degrees-');
    let totalDegrees = 0;
    for (const group of degreeGroups) {
      const category = await DegreeCategory.findOne({ name: group.category });
      if (!category) continue;
      const degrees = group.degrees || [];
      for (const deg of degrees) { deg.category = category._id; deg.streams = category.streams; }
      if (degrees.length > 0) { await Degree.insertMany(degrees); totalDegrees += degrees.length; }
    }
    console.log(`✅ ${totalDegrees} Degrees seeded`);

    // 5. Diplomas

    const pcmWithStream = addStreamToDiplomas(pcmDiplomas, 'pcm');
    const pcbWithStream = addStreamToDiplomas(pcbDiplomas, 'pcb');
    const commerceWithStream = addStreamToDiplomas(commerceDiplomas, 'commerce');
    const artsWithStream = addStreamToDiplomas(artsDiplomas, 'arts');

    const allDiplomas = [
      ...pcmWithStream,
      ...pcbWithStream,
      ...commerceWithStream,
      ...artsWithStream,
    ];
    
    if (allDiplomas.length > 0) {
      await Diploma.insertMany(allDiplomas);
    }

    console.log(`✅ ${allDiplomas.length} Diplomas seeded`);
    console.log(`   - PCM: ${pcmWithStream.length}`);
    console.log(`   - PCB: ${pcbWithStream.length}`);
    console.log(`   - PCMB: ${pcmWithStream.length + pcbWithStream.length}`);
    console.log(`   - Commerce: ${commerceWithStream.length}`);
    console.log(`   - Arts/Humanities: ${artsWithStream.length}`);

    // 6. Master Colleges (Duplicates hata ke save karna)
    const collegeFiles = fs.readdirSync(seedFolder).filter((f) => f.startsWith('colleges-') && f.endsWith('.json'));
    const allColleges = [];
    for (const file of collegeFiles) allColleges.push(...require(path.join(seedFolder, file)));

    const uniqueColleges = [];
    const seenNames = new Set();
    for (const c of allColleges) {
      const norm = normalize(c.name);
      if (!seenNames.has(norm)) { seenNames.add(norm); uniqueColleges.push(c); }
    }
    if (uniqueColleges.length > 0) await College.insertMany(uniqueColleges);
    await buildCollegeLookup();
    console.log(`✅ ${uniqueColleges.length} Unique Master Colleges seeded`);

    // 7. Collegemap Linking (Smart Resolver yahan kaam karega)
    const mapFiles = fs.readdirSync(seedFolder).filter((f) => f.startsWith('collegemap-') && f.endsWith('.json'));
    let linkedDegrees = 0;
    
    autoCreatedCount = 0; // Counter reset
    
    for (const file of mapFiles) {
      const mappings = require(path.join(seedFolder, file));
      for (const map of mappings) {
        if (map.applyToAll && map.category) {
          const category = await DegreeCategory.findOne({ name: map.category });
          if (!category) {
            console.warn(`⚠️ Category not found: "${map.category}"`);
            continue;
          }

          const degreesInCat = await Degree.find({ category: category._id });
          const govIds = await resolveColleges(map.government || []);
          const pvtIds = await resolveColleges(map.private || []);

          for (const degree of degreesInCat) {
            degree.topGovernmentColleges = govIds;
            degree.topPrivateColleges = pvtIds;
            await degree.save();
            linkedDegrees++;
          }
          console.log(`✅ applyToAll: "${map.category}" ke ${degreesInCat.length} degrees linked`);
          continue;
        }

        const degree = await Degree.findOne({ name: map.degree });
        if (!degree) { 
          console.warn(`⚠️ Degree not found in degrees.json: "${map.degree}"`); 
          continue; 
        }
        
        if (map.government) degree.topGovernmentColleges = await resolveColleges(map.government);
        if (map.private) degree.topPrivateColleges = await resolveColleges(map.private);
        
        await degree.save();
        linkedDegrees++;
      }
    }
    
    console.log(`✅ ${linkedDegrees} Degrees successfully linked with colleges`);
    if (autoCreatedCount > 0) {
      console.log(`➕ ${autoCreatedCount} extra colleges auto-created & linked (No warnings!)`);
    }

    console.log('\n🎉 Seeding 100% Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
// require('dotenv').config();
// const mongoose = require('mongoose');
// const connectDB = require('./src/config/db');
// const Diploma = require('./src/models/Diploma');

// // Import your JSON files (bina stream field ke)
// const pcmDiplomas = require('./seed-data/diplomas-pcm.json');
// const pcbDiplomas = require('./seed-data/diplomas-pcb.json');
// const commerceDiplomas = require('./seed-data/diplomas-commerce.json');
// const artsDiplomas = require('./seed-data/diplomas-arts.json');

// // ✅ Helper function: Stream field add karna
// const addStreamToDiplomas = (diplomas, streamName) => {
//   return diplomas.map(diploma => ({
//     ...diploma,
//     stream: streamName
//   }));
// };

// const seedDiplomas = async () => {
//   try {
//     await connectDB();
//     console.log('✅ MongoDB Connected');

//     // Clear existing diplomas
//     await Diploma.deleteMany({});
//     console.log('🗑️ Old diplomas cleared');

//     // ✅ Har file me stream field add karo
//     const pcmWithStream = addStreamToDiplomas(pcmDiplomas, 'pcm');
//     const pcbWithStream = addStreamToDiplomas(pcbDiplomas, 'pcb');
//     const commerceWithStream = addStreamToDiplomas(commerceDiplomas, 'commerce');
//     const artsWithStream = addStreamToDiplomas(artsDiplomas, 'arts');

//     // Combine all diplomas
//     const allDiplomas = [
//       ...pcmWithStream,
//       ...pcbWithStream,
//       ...commerceWithStream,
//       ...artsWithStream
//     ];

//     // Insert into database
//     await Diploma.insertMany(allDiplomas);
//     console.log(`✅ Seeded ${allDiplomas.length} diplomas successfully!`);
//     console.log(`   - PCM: ${pcmWithStream.length}`);
//     console.log(`   - PCB: ${pcbWithStream.length}`);
//     console.log(`   - PCMB: ${pcmWithStream.length + pcbWithStream.length}`);
//     console.log(`   - Commerce: ${commerceWithStream.length}`);
//     console.log(`   - Arts/Humanities: ${artsWithStream.length}`);

//     process.exit(0);
//   } catch (error) {
//     console.error('❌ Seeding Error:', error);
//     process.exit(1);
//   }
// };

// seedDiplomas();
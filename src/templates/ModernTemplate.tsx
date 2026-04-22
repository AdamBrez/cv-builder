import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Persona } from '../types/schema';

const styles = StyleSheet.create({
  page: { flexDirection: 'column', padding: 40, fontFamily: 'Helvetica' },
  header: { marginBottom: 20, borderBottom: '1pt solid #000', paddingBottom: 10 },
  name: { fontSize: 24, fontWeight: 'bold' },
  contact: { fontSize: 10, color: 'gray', marginTop: 5 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  jobBlock: { marginBottom: 10 },
  jobHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
  company: { fontSize: 12, fontWeight: 'bold' },
  date: { fontSize: 10, fontStyle: 'italic' },
  role: { fontSize: 11, marginBottom: 4 },
  bullet: { fontSize: 10, marginBottom: 2, marginLeft: 10 }
});

export const ModernTemplate = ({ persona }: { persona: Persona }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.name}>{persona.personal.name}</Text>
        <Text style={styles.contact}>{persona.personal.email} | {persona.personal.linkedin}</Text>
      </View>

      {/* EXPERIENCE */}
      <Text style={styles.sectionTitle}>Work Experience</Text>
      {persona.work.map((job, index) => (
        <View key={index} style={styles.jobBlock}>
          <View style={styles.jobHeader}>
            <Text style={styles.company}>{job.companyName}</Text>
            <Text style={styles.date}>{job.date}</Text>
          </View>
          <Text style={styles.role}>{job.role}</Text>
          {job.description?.map((bullet, i) => (
            <Text key={i} style={styles.bullet}>• {bullet}</Text>
          ))}
        </View>
      ))}

      {/* SKILLS */}
      <Text style={styles.sectionTitle}>Skills</Text>
      <Text style={styles.bullet}>{persona.skills.join(' • ')}</Text>

    </Page>
  </Document>
);

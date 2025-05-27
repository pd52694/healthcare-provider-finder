import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator, Linking } from 'react-native';

export default function App() {
  const [zip, setZip] = useState('');
  const [condition, setCondition] = useState('');
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

const fetchProviders = async () => {
  setLoading(true);
  if (!condition || !zip) {
    alert('Please enter both a condition and ZIP code.');
    setLoading(false);
    return;
  }
  setProviders([]);
  try {
    const response = await fetch('https://9b75110a-6dc6-4c96-a9ce-93ba5597ac9a-00-2rekyty3ltw5e.spock.replit.dev/providers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ condition, zip })
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error); // ✅ Shows rate limit or other backend errors clearly
    } else {
      setProviders(data.providers || []);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    alert('Error fetching providers');
  }
  setLoading(false);
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find Local Pain Relief Providers</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Condition (e.g. back pain)"
        placeholderTextColor="#888"
        value={condition}
        onChangeText={setCondition}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter ZIP Code"
        placeholderTextColor="#888"
        value={zip}
        onChangeText={setZip}
        keyboardType="numeric"
      />

      <Button title="Search Providers" onPress={fetchProviders} />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={providers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>

              <Text
                style={{ color: 'blue', textDecorationLine: 'underline' }}
                onPress={() => Linking.openURL(item.address)}
              >
                {item.displayAddress || item.address}
              </Text>

              <Text>{item.specialty}</Text>
            </View>
          )}
          style={{ marginTop: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6, borderColor: '#ccc' },
  card: { padding: 10, marginVertical: 5, backgroundColor: '#f0f0f0', borderRadius: 8 },
  name: { fontWeight: 'bold' }
});

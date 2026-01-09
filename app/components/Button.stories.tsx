import React from 'react';
import { View } from 'react-native';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
};

export const Primary = () => (
  <View style={{ padding: 20 }}>
    <Button title="Primary Button" variant="primary" onPress={() => alert('Pressed!')} />
  </View>
);

export const Secondary = () => (
  <View style={{ padding: 20 }}>
    <Button title="Secondary Button" variant="secondary" onPress={() => alert('Pressed!')} />
  </View>
);

export const Outline = () => (
  <View style={{ padding: 20 }}>
    <Button title="Outline Button" variant="outline" onPress={() => alert('Pressed!')} />
  </View>
);

export const Ghost = () => (
  <View style={{ padding: 20 }}>
    <Button title="Ghost Button" variant="ghost" onPress={() => alert('Pressed!')} />
  </View>
);

export const Loading = () => (
  <View style={{ padding: 20 }}>
    <Button title="Loading" loading onPress={() => {}} />
  </View>
);

export const Disabled = () => (
  <View style={{ padding: 20 }}>
    <Button title="Disabled" disabled onPress={() => {}} />
  </View>
);

export const Sizes = () => (
  <View style={{ padding: 20, gap: 16 }}>
    <Button title="Small" size="sm" onPress={() => alert('Small')} />
    <Button title="Medium" size="md" onPress={() => alert('Medium')} />
    <Button title="Large" size="lg" onPress={() => alert('Large')} />
  </View>
);

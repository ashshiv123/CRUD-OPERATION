import { useEffect, useState } from 'react';
import { Href, useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppHeader } from '@/components/app/app-header';
import { Screen } from '@/components/app/screen';
import { theme } from '@/constants/theme';
import { useAuth } from '@/providers/auth-context';
import { useFlash } from '@/providers/flash-context';

type Mode = 'login' | 'signup';

export default function AuthScreen() {
  const router = useRouter();
  const { showFlash } = useFlash();
  const { user, login, signup } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    if (user) {
      router.replace('/profile' as Href);
    }
  }, [router, user]);

  const handleSubmit = async () => {
    if (!form.username.trim() || !form.password.trim() || (mode === 'signup' && !form.email.trim())) {
      showFlash({ type: 'error', message: 'Please complete the required fields.' });
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'login') {
        await login({ username: form.username.trim(), password: form.password });
      } else {
        await signup({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
        });
      }
      router.replace('/profile' as Href);
    } catch (error) {
      showFlash({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to authenticate.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Screen
      contentContainerStyle={styles.contentContainer}
      header={
        <AppHeader
          eyebrow="Account Access"
          subtitle="Use the same backend-powered account system from your web project."
          title={mode === 'login' ? 'Welcome back' : 'Create your account'}
        />
      }>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.modeSwitch}>
          {(['login', 'signup'] as Mode[]).map((value) => (
            <Pressable
              key={value}
              onPress={() => setMode(value)}
              style={[styles.modeButton, mode === value && styles.modeButtonActive]}>
              <Text style={[styles.modeText, mode === value && styles.modeTextActive]}>
                {value === 'login' ? 'Login' : 'Sign up'}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            autoCapitalize="none"
            onChangeText={(value) => setForm((prev) => ({ ...prev, username: value }))}
            placeholder="Enter username"
            placeholderTextColor="#91A0B7"
            style={styles.input}
            value={form.username}
          />

          {mode === 'signup' ? (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
                placeholder="Enter email"
                placeholderTextColor="#91A0B7"
                style={styles.input}
                value={form.email}
              />
            </>
          ) : null}

          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            onChangeText={(value) => setForm((prev) => ({ ...prev, password: value }))}
            placeholder="Enter password"
            placeholderTextColor="#91A0B7"
            secureTextEntry
            style={styles.input}
            value={form.password}
          />

          <Pressable
            disabled={submitting}
            onPress={handleSubmit}
            style={({ pressed }) => [styles.submitButton, (pressed || submitting) && styles.pressed]}>
            <Text style={styles.submitText}>{submitting ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 60,
  },
  modeSwitch: {
    backgroundColor: '#EAF0F8',
    borderRadius: 18,
    flexDirection: 'row',
    marginTop: 12,
    padding: 6,
  },
  modeButton: {
    alignItems: 'center',
    borderRadius: 14,
    flex: 1,
    paddingVertical: 12,
  },
  modeButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  modeText: {
    color: theme.colors.mutedText,
    fontWeight: '700',
  },
  modeTextActive: {
    color: theme.colors.text,
  },
  formCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.xl,
    marginTop: 18,
    padding: 20,
    ...theme.shadow,
  },
  label: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#F9FBFE',
    borderColor: theme.colors.border,
    borderRadius: 18,
    borderWidth: 1,
    color: theme.colors.text,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 18,
    marginTop: 20,
    paddingVertical: 15,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.84,
  },
});

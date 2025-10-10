import React, { Component, ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Log error to crash reporting service if available
    // You can add your crash reporting service here

    // Show user-friendly alert
    Alert.alert("เกิดข้อผิดพลาด", "แอพเกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง", [
      {
        text: "รีสตาร์ทแอพ",
        onPress: this.handleRestart,
      },
      {
        text: "กลับหน้าหลัก",
        onPress: this.handleGoHome,
      },
    ]);
  }

  handleRestart = () => {
    this.setState({ hasError: false, error: undefined });
    // Force reload the app
    router.replace("/(auth)/index");
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: undefined });
    router.replace("/(screen)/(tabs)/dashboard");
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <Text style={styles.title}>เกิดข้อผิดพลาด</Text>
          <Text style={styles.message}>
            แอพเกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleRestart}>
            <Text style={styles.buttonText}>ลองใหม่</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleGoHome}>
            <Text style={styles.buttonText}>กลับหน้าหลัก</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
    color: "#666",
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: 200,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ErrorBoundary;

import React, { Component, ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onRefresh?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class DebtorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("DebtorErrorBoundary caught an error:", error, errorInfo);

    // Log error to crash reporting service if available
    // You can add your crash reporting service here

    // Show user-friendly alert
    Alert.alert(
      "เกิดข้อผิดพลาดในฟีเจอร์ลูกหนี้",
      "เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง",
      [
        {
          text: "รีเฟรชข้อมูล",
          onPress: this.handleRefresh,
        },
        {
          text: "กลับหน้าหลัก",
          onPress: this.handleGoHome,
        },
      ]
    );
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: undefined });
    // Call the onRefresh callback if provided
    if (this.props.onRefresh) {
      this.props.onRefresh();
    }
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
          <Text style={styles.title}>เกิดข้อผิดพลาดในฟีเจอร์ลูกหนี้</Text>
          <Text style={styles.message}>
            เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
          </Text>
          <TouchableOpacity style={styles.button} onPress={this.handleRefresh}>
            <Text style={styles.buttonText}>รีเฟรชข้อมูล</Text>
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
    textAlign: "center",
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

export default DebtorErrorBoundary;

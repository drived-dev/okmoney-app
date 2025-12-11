import React, { Component, ReactNode } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, showDetails: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, showDetails: false };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Detailed error logging for debugging
    console.error("=== ErrorBoundary caught an error ===");
    console.error("Error Message:", error?.message);
    console.error("Error Stack:", error?.stack);
    console.error("Error Name:", error?.name);
    console.error("Component Stack:", errorInfo?.componentStack);
    console.error("Full Error Object:", error);
    console.error("Full Error Info:", errorInfo);
    console.error("================================");

    // Store error info for display
    this.setState({ errorInfo });

    // Log error to crash reporting service if available
    // You can add your crash reporting service here

    // Show detailed alert with error message
    const errorMessage = error?.message || "Unknown error";
    Alert.alert(
      "เกิดข้อผิดพลาด",
      `แอพเกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง\n\nError: ${errorMessage}\n\nดูรายละเอียดเพิ่มเติมใน UI`,
      [
        {
          text: "รีสตาร์ทแอพ",
          onPress: this.handleRestart,
        },
        {
          text: "กลับหน้าหลัก",
          onPress: this.handleGoHome,
        },
      ]
    );
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

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, showDetails } = this.state;
      const errorMessage = error?.message || "Unknown error";
      const errorStack = error?.stack || "No stack trace available";
      const componentStack =
        errorInfo?.componentStack || "No component stack available";

      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.title}>เกิดข้อผิดพลาด</Text>
          <Text style={styles.message}>
            แอพเกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
          </Text>

          {/* Error Details Section */}
          <View style={styles.errorDetailsContainer}>
            <Text style={styles.errorMessageTitle}>Error Message:</Text>
            <Text style={styles.errorText}>{errorMessage}</Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={this.toggleDetails}
            >
              <Text style={styles.detailsButtonText}>
                {showDetails ? "ซ่อนรายละเอียด" : "แสดงรายละเอียด"}
              </Text>
            </TouchableOpacity>

            {showDetails && (
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Error Stack:</Text>
                <ScrollView style={styles.stackScrollView}>
                  <Text style={styles.stackText}>{errorStack}</Text>
                </ScrollView>

                <Text style={styles.detailsTitle}>Component Stack:</Text>
                <ScrollView style={styles.stackScrollView}>
                  <Text style={styles.stackText}>{componentStack}</Text>
                </ScrollView>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleRestart}>
            <Text style={styles.buttonText}>ลองใหม่</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleGoHome}>
            <Text style={styles.buttonText}>กลับหน้าหลัก</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
    alignItems: "center",
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
    marginBottom: 24,
    color: "#666",
    lineHeight: 24,
  },
  errorDetailsContainer: {
    width: "100%",
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  errorMessageTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#d32f2f",
  },
  errorText: {
    fontSize: 14,
    color: "#d32f2f",
    marginBottom: 12,
    fontFamily: "monospace",
  },
  detailsButton: {
    backgroundColor: "#ff9800",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
    alignSelf: "flex-start",
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  detailsContainer: {
    width: "100%",
    marginTop: 12,
  },
  detailsTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
    color: "#666",
  },
  stackScrollView: {
    maxHeight: 150,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },
  stackText: {
    fontSize: 11,
    fontFamily: "monospace",
    color: "#333",
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

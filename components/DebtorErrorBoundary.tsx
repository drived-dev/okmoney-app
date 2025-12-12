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
  onRefresh?: () => void;
}

interface ParsedErrorLocation {
  file?: string;
  fileName?: string;
  directory?: string;
  line?: number;
  column?: number;
  functionName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
  showDetails: boolean;
  errorLocation?: ParsedErrorLocation;
}

class DebtorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, showDetails: false };
  }

  // Parse error stack to extract file and line information
  parseErrorStack = (error: Error): ParsedErrorLocation | undefined => {
    if (!error?.stack) return undefined;

    try {
      // Try to parse the stack trace
      // Stack trace format: "at functionName (file:///path/to/file.tsx:123:45)"
      const stackLines = error.stack.split("\n");

      // Look for the first line that contains a file path
      for (const line of stackLines) {
        // Match patterns like:
        // - "at ComponentName (file:///path/to/file.tsx:123:45)"
        // - "at file:///path/to/file.tsx:123:45"
        // - "at /path/to/file.tsx:123:45"
        const match = line.match(
          /at\s+(?:(.+?)\s+\()?(?:file:\/\/\/|)([^\s]+):(\d+):(\d+)/
        );

        if (match) {
          const functionName = match[1]?.trim();
          let filePath = match[2];
          const lineNumber = parseInt(match[3], 10);
          const columnNumber = parseInt(match[4], 10);

          // Extract just the filename from the path
          // Remove file:/// prefix if present
          filePath = filePath.replace(/^file:\/\/\//, "");

          // Get relative path from workspace
          const workspacePath =
            "/Users/firm/Desktop/Okmoney-final/okmoney-app/";
          if (filePath.startsWith(workspacePath)) {
            filePath = filePath.replace(workspacePath, "");
          }

          // Extract just the filename and directory
          const pathParts = filePath.split("/");
          const fileName = pathParts[pathParts.length - 1];
          const directory =
            pathParts.length > 1 ? pathParts.slice(0, -1).join("/") : "";

          return {
            file: filePath,
            fileName,
            directory,
            line: lineNumber,
            column: columnNumber,
            functionName,
          };
        }
      }
    } catch (parseError) {
      console.error("Error parsing stack trace:", parseError);
    }

    return undefined;
  };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, showDetails: false };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Parse error location from stack trace
    const errorLocation = this.parseErrorStack(error);

    // Detailed error logging for debugging
    console.error("=== DebtorErrorBoundary caught an error ===");
    console.error("Error Message:", error?.message);
    console.error("Error Name:", error?.name);

    if (errorLocation) {
      console.error("Error Location:");
      console.error(`  File: ${errorLocation.file}`);
      console.error(`  Line: ${errorLocation.line}`);
      console.error(`  Column: ${errorLocation.column}`);
      if (errorLocation.functionName) {
        console.error(`  Function: ${errorLocation.functionName}`);
      }
    }

    console.error("Error Stack:", error?.stack);
    console.error("Component Stack:", errorInfo?.componentStack);
    console.error("Full Error Object:", error);
    console.error("Full Error Info:", errorInfo);
    console.error("================================");

    // Store error info for display
    this.setState({ errorInfo, errorLocation });

    // Log error to crash reporting service if available
    // You can add your crash reporting service here

    // Show detailed alert with error message
    const errorMessage = error?.message || "Unknown error";
    Alert.alert(
      "เกิดข้อผิดพลาดในฟีเจอร์ลูกหนี้",
      `เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง\n\nError: ${errorMessage}\n\nดูรายละเอียดเพิ่มเติมใน UI`,
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

  toggleDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { error, errorInfo, showDetails, errorLocation } = this.state;
      const errorMessage = error?.message || "Unknown error";
      const errorStack = error?.stack || "No stack trace available";
      const componentStack =
        errorInfo?.componentStack || "No component stack available";

      return (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.title}>เกิดข้อผิดพลาดในฟีเจอร์ลูกหนี้</Text>
          <Text style={styles.message}>
            เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
          </Text>

          {/* Error Details Section */}
          <View style={styles.errorDetailsContainer}>
            <Text style={styles.errorMessageTitle}>Error Message:</Text>
            <Text style={styles.errorText}>{errorMessage}</Text>

            {/* Error Location Section */}
            {errorLocation && (
              <View style={styles.locationContainer}>
                <Text style={styles.locationTitle}>
                  📍 ตำแหน่งที่เกิด Error:
                </Text>
                <Text style={styles.locationText}>
                  <Text style={styles.locationLabel}>ไฟล์: </Text>
                  {errorLocation.file || "ไม่พบข้อมูล"}
                </Text>
                {errorLocation.line && (
                  <Text style={styles.locationText}>
                    <Text style={styles.locationLabel}>บรรทัด: </Text>
                    {errorLocation.line}
                    {errorLocation.column && `:${errorLocation.column}`}
                  </Text>
                )}
                {errorLocation.functionName && (
                  <Text style={styles.locationText}>
                    <Text style={styles.locationLabel}>ฟังก์ชัน: </Text>
                    {errorLocation.functionName}
                  </Text>
                )}
              </View>
            )}

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

          <TouchableOpacity style={styles.button} onPress={this.handleRefresh}>
            <Text style={styles.buttonText}>รีเฟรชข้อมูล</Text>
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
  locationContainer: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#fff3cd",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ffc107",
  },
  locationTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    color: "#856404",
  },
  locationText: {
    fontSize: 12,
    color: "#856404",
    marginBottom: 4,
    fontFamily: "monospace",
  },
  locationLabel: {
    fontWeight: "600",
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

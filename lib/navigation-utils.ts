import { router } from "expo-router";
import { Alert } from "react-native";

export class NavigationError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "NavigationError";
  }
}

export const safeNavigate = {
  /**
   * Safely navigate to a route with error handling
   */
  async push(route: string, options?: any) {
    try {
      await router.push(route as any);
    } catch (error) {
      console.error("Navigation push error:", error);
      throw new NavigationError(
        `Failed to navigate to ${route}`,
        error as Error
      );
    }
  },

  /**
   * Safely replace current route with error handling
   */
  async replace(route: string, options?: any) {
    try {
      await router.replace(route as any);
    } catch (error) {
      console.error("Navigation replace error:", error);
      throw new NavigationError(
        `Failed to replace with ${route}`,
        error as Error
      );
    }
  },

  /**
   * Safely navigate back with error handling
   */
  async back() {
    try {
      if (router.canGoBack()) {
        router.back();
      } else {
        // If can't go back, navigate to home
        await this.replace("/(screen)/(tabs)/dashboard");
      }
    } catch (error) {
      console.error("Navigation back error:", error);
      throw new NavigationError("Failed to navigate back", error as Error);
    }
  },

  /**
   * Safely dismiss all modals and navigate
   */
  async dismissAllAndNavigate(route: string) {
    try {
      router.dismissAll();
      await this.push(route);
    } catch (error) {
      console.error("Navigation dismiss and navigate error:", error);
      throw new NavigationError(
        `Failed to dismiss and navigate to ${route}`,
        error as Error
      );
    }
  },

  /**
   * Handle navigation errors with user feedback
   */
  handleNavigationError(
    error: NavigationError,
    fallbackRoute: string = "/(screen)/(tabs)/dashboard"
  ) {
    console.error("Navigation error handled:", error);

    Alert.alert(
      "เกิดข้อผิดพลาดในการนำทาง",
      "เกิดข้อผิดพลาดในการเปลี่ยนหน้า กรุณาลองใหม่อีกครั้ง",
      [
        {
          text: "ลองใหม่",
          onPress: () => {
            try {
              router.replace(fallbackRoute as any);
            } catch (retryError) {
              console.error("Retry navigation failed:", retryError);
              // Last resort: reload the app
              router.replace("/(auth)/index");
            }
          },
        },
      ]
    );
  },

  /**
   * Check if navigation is ready
   */
  isNavigationReady(): boolean {
    try {
      return router.canGoBack !== undefined;
    } catch {
      return false;
    }
  },
};

/**
 * Hook to safely navigate with error handling
 */
export const useSafeNavigation = () => {
  const navigate = async (
    route: string,
    method: "push" | "replace" = "push"
  ) => {
    try {
      if (method === "push") {
        await safeNavigate.push(route);
      } else {
        await safeNavigate.replace(route);
      }
    } catch (error) {
      if (error instanceof NavigationError) {
        safeNavigate.handleNavigationError(error);
      } else {
        console.error("Unexpected navigation error:", error);
      }
    }
  };

  const navigateBack = async () => {
    try {
      await safeNavigate.back();
    } catch (error) {
      if (error instanceof NavigationError) {
        safeNavigate.handleNavigationError(error);
      }
    }
  };

  return {
    navigate,
    navigateBack,
    isReady: safeNavigate.isNavigationReady,
  };
};

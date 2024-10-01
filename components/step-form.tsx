import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TITLE } from "~/constants/Typography";
import { cn } from "~/lib/utils";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { SafeAreaView } from "react-native";
import { Button } from "~/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { CONTAINER } from "~/constants/Styles";
import { BUTTON } from "~/constants/Typography";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

const Stack = createNativeStackNavigator();

interface StepFormProps {
  forms: Array<React.FC<{ navigation: any }>>;
  onSubmit: (values: any) => void;
  formSchemas: z.AnyZodObject[];
}

const StepForm = ({ forms, onSubmit, formSchemas }: StepFormProps) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const currentSchema = formSchemas[currentStep];

  const method = useForm<z.infer<typeof currentSchema>>({
    resolver: zodResolver(currentSchema),
  });

  return (
    <FormProvider {...method}>
      <StepContext.Provider
        value={{
          currentStep,
          setCurrentStep,
          onSubmit,
          lastStep: formSchemas.length - 1,
        }}
      >
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName="Page-0"
            screenOptions={{
              headerShown: false,
              animation: "none",
            }}
          >
            {forms.map((FormComponent, index) => (
              <Stack.Screen
                key={index}
                name={`Page-${index}`}
                component={FormComponent}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </StepContext.Provider>
    </FormProvider>
  );
};

type StepContextType = {
  currentStep: number;
  lastStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  onSubmit: any;
  // TODO: change submit type
};

const StepContext = React.createContext<StepContextType>({
  currentStep: 0,
  lastStep: 0,
  setCurrentStep: () => {
    console.error("oops, the default got used. Fix your bug!");
  },
  onSubmit: () => {},
});

const useStepContext = () => {
  const stepContext = React.useContext(StepContext);

  if (!stepContext) {
    throw new Error("useStepContext must be used within a StepProvider");
  }

  return stepContext;
};

export type StackNavigationProps = NativeStackNavigationProp<{
  [key: `Page-${number}`]: undefined;
}>;

export interface StepFormScreenProps {
  navigation: StackNavigationProps;
  children: React.ReactNode;
}

export interface NavigationProps {
  navigation: StackNavigationProps;
}

const StepFormScreen: React.FC<StepFormScreenProps> = ({
  navigation,
  children,
}) => {
  const {
    getValues,
    clearErrors,
    trigger,
    formState: { isValid },
  } = useFormContext();

  function validateInput(): boolean {
    const schemaKeys = Object.keys(getValues());
    trigger(schemaKeys);

    return isValid;
  }

  function clearValidation(): void {
    clearErrors();
  }

  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, "flex flex-col justify-between h-full")}>
        {children}
        <StepperButtonGroup
          navigation={navigation}
          validateInput={validateInput}
          clearValidation={clearValidation}
        />
      </View>
    </SafeAreaView>
  );
};

interface StepperButtonGroupType {
  navigation: StackNavigationProps;
  validateInput: () => boolean;
  clearValidation: () => void;
}

const StepperButtonGroup = ({
  navigation,
  validateInput,
  clearValidation,
}: StepperButtonGroupType): JSX.Element => {
  const { currentStep, setCurrentStep, onSubmit, lastStep } = useStepContext();
  const { getValues } = useFormContext();

  // don't show back button when on first step
  const isFirstStep = currentStep === 0;
  const BackButton = () => {
    if (isFirstStep) return null;

    return (
      <Button size="icon-lg" variant="ghost" onPress={navigateBack}>
        <ArrowLeft color={"black"} />
      </Button>
    );
  };

  const NextButton = () => {
    const isLastStep = currentStep === lastStep;

    function handleSubmit() {
      const isValid = validateInput();
      if (!isValid) return;

      onSubmit(getValues());
    }

    const TextSubmitOrNext = isLastStep ? (
      <Text className={cn(BUTTON.white)}>ส่งคำตอบ</Text>
    ) : (
      <>
        <Text className={cn(BUTTON.white)}>ถัดไป</Text>
        <ArrowRight color={"white"} />
      </>
    );

    return (
      <Button
        size="xl"
        className="flex flex-row justify-center items-center gap-2"
        onPress={isLastStep ? handleSubmit : navigateToNextStep}
      >
        {TextSubmitOrNext}
      </Button>
    );
  };

  function navigateBack() {
    const previousStep = currentStep - 1;
    clearValidation();

    setCurrentStep(previousStep);
    navigation.navigate(`Page-${previousStep}`);
  }

  function navigateToNextStep() {
    const nextStep = currentStep + 1;
    const isValid = validateInput();
    if (!isValid) return;

    setCurrentStep(nextStep);
    navigation.navigate(`Page-${nextStep}`);
  }

  return (
    <View
      className={cn(
        "flex flex-row justify-between",
        isFirstStep && "justify-end"
      )}
    >
      <BackButton />
      <NextButton />
    </View>
  );
};

export { StepFormScreen, StepForm };

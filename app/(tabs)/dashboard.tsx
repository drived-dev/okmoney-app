import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form";
import { Input } from "~/components/ui/input";
import { Schema, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "~/components/ui/label";
import {
  FormLabel,
  FormDescription,
  FormMessage,
  FormItem,
} from "~/components/form";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { BUTTON } from "~/constants/Typography";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { CONTAINER } from "~/constants/Styles";
const formSchema = [
  z.object({
    name: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }).max(50),
    lastname: z
      .string()
      .min(2, { message: "นามสกุลต้องมากกว่า 2 ตัวอักษร" })
      .max(50),
  }),
  z.object({
    email: z.string().min(2, { message: "ชื่อต้องมากกว่า 2 ตัวอักษร" }).max(50),
  }),
];

const Stack = createNativeStackNavigator();

const History = () => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const currentSchema = formSchema[currentStep];

  const method = useForm<z.infer<typeof currentSchema>>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      name: "",
      lastname: "",
    },
  });

  function onSubmit(values: z.infer<typeof currentSchema>) {
    alert(values);
  }

  return (
    <FormProvider {...method}>
      <StepContext.Provider
        value={{ currentStep, setCurrentStep, onSubmit, lastStep: 1 }}
      >
        <NavigationContainer independent={true}>
          <Stack.Navigator
            initialRouteName="Page-0"
            screenOptions={{
              headerShown: false,
              animation: "none",
            }}
          >
            <Stack.Screen name="Page-0" component={InfoForm} />
            <Stack.Screen name="Page-1" component={IForm} />
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

export const StepContext = React.createContext<StepContextType>({
  currentStep: 0,
  lastStep: 1,
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

const StepperButtonGroup = ({ navigation, validateInput, clearValidation }) => {
  const { currentStep, setCurrentStep, onSubmit, lastStep } = useStepContext();

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
    if (currentStep < lastStep)
      return (
        <Button
          size="xl"
          className="flex flex-row justify-center items-center gap-2"
          onPress={navigateToNextStep}
        >
          <Text className={cn(BUTTON.white)}>ถัดไป</Text>
          <ArrowRight color={"white"} />
        </Button>
      );

    return (
      <Button
        size="xl"
        className="flex flex-row justify-center items-center gap-2"
        onPress={onSubmit}
      >
        <Text className={cn(BUTTON.white)}>ส่งคำตอบ</Text>
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

const InfoForm = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useFormContext();

  function validateInput() {
    trigger(["name", "lastname"]);
    return isValid;
  }

  function clearValidation() {
    clearErrors();
  }

  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, "flex flex-col justify-between h-full")}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="email">อีเมล</FormLabel>
              <Input
                placeholder="โปรดใส่อีเมล"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>

              <FormMessage errorMessage={errors.name?.message}>hle</FormMessage>
            </FormItem>
          )}
        />
        <Controller
          control={control}
          name="lastname"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="email">อีเมล</FormLabel>
              <Input
                placeholder="โปรดใส่อีเมล"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>

              <FormMessage errorMessage={errors.lastname?.message}>
                d
              </FormMessage>
            </FormItem>
          )}
        />
        <Button onPress={clearValidation}></Button>
        <StepperButtonGroup
          navigation={navigation}
          validateInput={validateInput}
          clearValidation={clearValidation}
        />
      </View>
    </SafeAreaView>
  );
};

const IForm = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    getValues,
    clearErrors,
    trigger,
    formState: { errors, isValid },
  } = useFormContext();

  function validateInput() {
    trigger(["name", "lastname"]);
  }

  function clearValidation() {
    clearErrors(["name", "lastname"]);
  }

  return (
    <SafeAreaView>
      <View className={cn(CONTAINER, "flex flex-col justify-between h-full")}>
        <View>
          <Text>Hello2</Text>
        </View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormItem>
              <FormLabel nativeID="email">อีเมล</FormLabel>
              <Input
                placeholder="โปรดใส่อีเมล"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormDescription>hellow kdsfnjdsกหสกา่ด</FormDescription>

              <FormMessage errorMessage={errors.lastname?.message}>
                d
              </FormMessage>
            </FormItem>
          )}
        />
        <StepperButtonGroup
          navigation={navigation}
          validateInput={validateInput}
          clearValidation={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default History;

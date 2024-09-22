import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '~/lib/utils';
import { PARAGRAPH , BUTTON, LABEL, TITLE } from '~/constants/Typography';
import Icon from '../ui/Icon';
import { Button } from '../ui/button';

const statusColorsbg: Record<string, string> = {
  'ค้างชำระ': 'bg-red-500',    // Overdue
  'ครบชำระ': 'bg-gray-200',  // Paid
  'รอชำระ': 'bg-blue-500', // Pending
  'ใกล้กำหนด': 'bg-yellow-500',     // Canceled
  
};

const statusColorstxt: Record<string, string> = {
  'ค้างชำระ': 'text-destructive-foreground',    // Overdue
  'ครบชำระ': 'text-gray-600',  // Paid
  'รอชำระ': 'text-destructive-foreground', // Pending
  'ใกล้กำหนด': 'text-destructive-foreground',     // Canceled
  
};


const LoanItem = ({ loan }) => {
  // Calculate the progress based on outstanding vs total
  const progress = loan.outstanding / loan.total;
  const statusColorbg = statusColorsbg[loan.status] || 'bg-blue-500';
  const statusColortxt = statusColorstxt[loan.status] || 'text-textb';

  return (
    // background deptor
    <View className="bg-card p-3 my-1 rounded-3xl border border-border space-y-3"> 

      {/* Profile Image and Loan Info */}
      <View className="flex-row items-center space-x-4">
        {/* Profile Image */}
        <Image
          source={{ uri: loan.profileImage }}
          className="w-12 h-12 rounded-full m-2 mb-4"
        />

        {/* Loan Info */}
        <View className="flex-1">
          <Text className={cn(LABEL,"text-muted-foreground pl-2")}>เลขสัญญา {loan.id}</Text>
          {/* Name: Bold nickname, gray full name */}
          <Text className="text-foreground text-base font-bold font-ibm-medium pl-2 ">
            {loan.nickname + "  "} 
            <Text className="text-muted-foreground font-ibm text-sm">{loan.name}
            </Text>
          </Text>
        </View>

        {/* Loan Status */}
        <View className={`px-3 py-2 rounded-2xl  ${statusColorbg}`}>
          <Text className={cn(
            BUTTON,
            `font-ibm-semibold text-destructive-foreground ${statusColortxt}`
          )} >
          {loan.status}
          </Text>
        </View>

        <View className='mx-1.5'>
        </View>

        <Button className='font-ibm-semibold text-muted-foreground pt-4 rounded-2xl bg-gray-200'>
          <Icon name="Ellipsis" size={30} color='#71717a' />
      </Button>
      </View>

      

      {/* Outstanding Amount and Progress Bar with Total Amount on the Right */}
      <View className="flex-row items-center space-x-2">
        {/* Progress Bar */}
        <View className="flex-1 h-6 bg-background rounded-lg relative border border-border ">
          <View
            className="absolute h-full bg-orange-500 rounded-md"
            style={{ width: `${progress * 100}%` }}
          />
          <View className="absolute inset-0 flex-row justify-between items-center px-2">
            {/* Outstanding Amount (left side inside the bar) */}
            <Text className="text-orange-600 font-bold">{loan.outstanding} บาท</Text>
            {/* Total Amount (right side inside the bar) */}
            <Text className="text-gray-400 absolute right-2">{loan.total} บาท</Text>
          </View>
        </View>

        <View className='px-2'>
        </View>

        {/* Due Date */}
        <Text className={cn(TITLE,"text-muted-foreground text-sm mt-1")}>ชำระทุก {loan.dueDate}</Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between items-center mt-3 space-x-2 ml-3 mb-2">
        {/* Remind Button with Icon */}
        <Button className="bg-destructive-foreground flex-1 flex-row justify-center items-center border border-muted-foreground rounded-2xl py-2">
        <Icon name="Send" color='#71717a' size={22}/>
          <Text className={cn(BUTTON,"text-textb ml-2 font-ibm-semibold")}>ทวงหนี้</Text>
        </Button>

        <View className='px-1'>
        </View>

        {/* Save Button */}
        <Button className="flex-1 bg-destructive py-2 flex-row justify-center items-center mr-3 rounded-2xl">
          <Icon name="NotebookPen" color='white' size={22}/>
          <Text className={cn(BUTTON,"text-destructive-foreground font-ibm-semibold ml-2")}>บันทึกรายการ</Text>
        </Button>
      </View>
    </View>
  );
};

export default LoanItem;

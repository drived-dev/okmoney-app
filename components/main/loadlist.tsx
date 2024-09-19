import React from 'react';
import { FlatList } from 'react-native';
import LoanItem from './loaditem';

const LoanList = ({ data }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <LoanItem loan={item} />}
      className="mt-4"
    />
  );
};

export default LoanList;

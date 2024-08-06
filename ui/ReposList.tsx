import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18
  },
  separator: {
    height: 1,
    borderBottomWidth: 1,
    width: '100%',
    backgroundColor: 'black'
    }
});

const Separator = () => {
   return (<View style={styles.separator}/>);
};

const Item = (item) =>{
   return (
  <View>
  <Text style={styles.item}>{item.name}</Text>
  <Text style={styles.item}>{item.description}</Text>
  </View>
)
}

const ReposList = ({items}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => Item(item)}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
  
};

export default ReposList;
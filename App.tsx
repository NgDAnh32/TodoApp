
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from "./color"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { TouchableOpacity } from 'react-native';
import tempData from './tempData';
import TodoList from './src/components/TodoList';
import AddListModal from './src/components/AddListModal';
function App(): JSX.Element {

  const [addTodoVisible, setAddTodoVisible] = useState(false)
  const [lists, setLists] = useState(tempData);
  const renderList = (list: any) => {
    return <TodoList list={list} updateList = {updateList}  />
  }
  const addList = (list: any) => {
    setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
  }
  const updateList = (list:any) => {
    setLists(lists.map(item => {
      return item.id === list.id ? list : item;
    }))
  };
  // console.log('ddd',updateList)
  return (
    <View style={styles.container}>
      <Modal
        animationType='slide'
        visible={addTodoVisible}
        onRequestClose={() => {
          setAddTodoVisible(!addTodoVisible);
        }}>
        <AddListModal closeModal={() => setAddTodoVisible(!addTodoVisible)} addList={addList} />
      </Modal>


      <View style={{ flexDirection: "row" }}>
        <View style={styles.divider} />
        <Text style={styles.title}>
          Todo <Text style={{ fontWeight: "300", color: colors.grey }}>Lists</Text>
        </Text>
        <View style={styles.divider} />
      </View>


      <View style={{ marginVertical: 48 }}>
        <TouchableOpacity style={styles.addist} onPress={() => setAddTodoVisible(!addTodoVisible)}>
          <Icon name="plus" size={16} color={colors.grey} />
        </TouchableOpacity>
        <Text style={styles.add}>Add List</Text>
      </View>



      <View style={{ height: 275, paddingLeft: 32 }}>
        <FlatList
          data={lists}
          keyExtractor={item => item.name}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderList(item)}
          keyboardShouldPersistTaps='always'
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  divider: {
    backgroundColor: colors.lightGrey,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: colors.black,
    paddingHorizontal: 50,
  },
  addist: {
    borderWidth: 2,
    borderColor: colors.grey,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    color: colors.grey,
    marginTop: 8,
    fontWeight: "600",
    fontSize: 16,

  }
});

export default App;

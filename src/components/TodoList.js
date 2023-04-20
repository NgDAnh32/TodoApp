import {StyleSheet, Text, TouchableOpacity, View,Modal} from 'react-native';
import React ,{useState} from 'react';
import colors from '../../color';
import TodoModal from './TodoModal';
const TodoList = ({list,updateList}) => {
  // const list = this.props.list;
  const completedCount = list.todos.filter(todo => todo.completed).length;
  const remainingCount = list.todos.length - completedCount;
  const [addTodoVisible, setAddTodoVisible] = useState(false)

  return (
    <View>
      <Modal
        animationType='slide'
        visible={addTodoVisible}
        onRequestClose={() => {
          setAddTodoVisible(!addTodoVisible);
        }}>
          <TodoModal list={list} closeModal = {() => setAddTodoVisible(!addTodoVisible)} updateList = {updateList}/>
      </Modal>
      <TouchableOpacity
        style={[styles.listContainer, {backgroundColor: list.color}]} onPress={() => setAddTodoVisible(!addTodoVisible)}>
        <Text style={styles.listTitle} numberOfLines={1}>
          {list.name}
        </Text>
        <View style={styles.divider}>
          <Text style={{color: colors.white}}>
            -------------------------------------
          </Text>
        </View>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subTitle}>Remaining</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subTitle}>Completed</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    marginBottom: 18,
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: colors.white,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
  divider: {
    backgroundColor: 'black',
    height: 1,
  },
});

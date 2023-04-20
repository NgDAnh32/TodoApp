import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import colors from '../../color';
import color from '../../color';

const TodoModal = (props: any) => {
  // const [todoName, setTodoName] = useState(props.list.name);
  // const [todoColor, setTodoColor] = useState(props.list.color);
  // const [todos, setTodos] = useState(props.list.todos);
  const [newTodo, setNewTodo] = useState('');

  const list = props.list;
  const taskCount = list.todos.length;
  const completedCount = list.todos.filter(todo => todo.completed).length;
  const toggleTodoCompleted = index => {
    const updatedList = {
      ...props.list,
      todos: props.list.todos.map((todo, i) =>
        i === index ? {...todo, completed: !todo.completed} : todo,
      ),
    };
    props.updateList(updatedList);
  };
  const addTodo = () => {
    const updatedList = {
      ...props.list,
      todos: [...props.list.todos, {title: newTodo, completed: false}],
    };
    props.updateList(updatedList);
    setNewTodo('');
    Keyboard.dismiss();
  };
  const renderTodo = (todo, index) => {
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={() => toggleTodoCompleted(index)}>
          <IonIcon
            name={todo.completed ? 'ios-square' : 'ios-square-outline'}
            size={24}
            color={colors.grey}
            style={{width: 32}}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.todo,
            {
              textDecorationLine: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? colors.grey : colors.black,
            },
          ]}>
          {todo.title}
        </Text>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{position: 'absolute', top: 30, right: 32, zIndex: 10}}
          onPress={props.closeModal}>
          <Icon name="close" size={24} color={colors.black} />
        </TouchableOpacity>

        <View
          style={[
            styles.section,
            styles.header,
            {borderBottomColor: list.color},
          ]}>
          <View>
            <Text style={styles.title}>{list.name}</Text>
            <Text style={styles.taskCount}>
              {completedCount} of {taskCount} tasks
            </Text>
          </View>
        </View>
        <View style={[styles.section, {flex: 3}]}>
          <FlatList
            data={list.todos}
            renderItem={({item, index}) => renderTodo(item, index)}
            keyExtractor={item => item.title}
            contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={[styles.section, styles.footer]}>
          <TextInput
            style={[styles.input, {borderColor: list.color}]}
            value={newTodo}
            onChangeText={text => setNewTodo(text)}
            // value={props.newTodo}
          />
          <TouchableOpacity
            style={[styles.addTodo, {backgroundColor: list.color}]}
            onPress={() => addTodo()}>
            <Icon name="plus" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default TodoModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    flex: 1.5,
    alignSelf: 'stretch',
  },
  header: {
    justifyContent: 'flex-end',
    marginLeft: 64,
    borderBottomWidth: 2,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.black,
  },
  taskCount: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.grey,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  addTodo: {
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todoContainer: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  todo: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
});

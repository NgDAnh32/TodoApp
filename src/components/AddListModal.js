import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../color';
import tempData from '../../tempData';

const AddListModal = ({closeModal,addList}) => {
  backgroundColors = [
    '#24A6D9',
    '#C4E538',
    '#12CBC4',
    '#FDA7DF',
    '#ED4C67',
    '#0652DD',
    '#9980FA',
  ];
  const [color, setColor] = useState(backgroundColors[0]);
  const [name, setName] = useState('');
  const renderColors = () => {
    return backgroundColors.map(color => (
      <TouchableOpacity
        key={color}
        style={[styles.colorSelect, {backgroundColor: color}]}
        onPress={() => setColor(color)}
      />
    ));
  };
  const createTodo = () => {
    const list= ({
      name,
      color,
      todos: [],
    });
    addList(list)
    setName('');
    closeModal();

  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{position: 'absolute', top: 64, right: 32}}
        onPress={closeModal}>
        <Icon name="close" size={24} color={colors.black} />
      </TouchableOpacity>
      <View style={{alignSelf: 'stretch', marginHorizontal: 32}}>
        <Text style={styles.title}>Create Todo List</Text>

        <TextInput
          style={styles.input}
          placeholder="List name ..."
          onChangeText={setName}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          {renderColors()}
        </View>

        <TouchableOpacity style={[styles.create, {backgroundColor: color}]} onPress={createTodo}>
          <Text style={{color: colors.white, fontWeight: '600'}}>Create</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddListModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    alignSelf: 'center',
    marginBottom: 16,
    color: colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 5,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    height: 50,
    marginTop: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});
